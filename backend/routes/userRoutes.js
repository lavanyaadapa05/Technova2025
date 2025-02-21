const express = require("express");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");
const OTP = require("../models/OTP"); // Create an OTP model

const router = express.Router();

  // Generate a unique team ID based on the number of teams already registered
const generateUserId = async () => {
  console.log("generating user id");
    const userCount = await User.countDocuments();
    return `2025${userCount + 1}`;
};

// 🟢 Create a new user
router.post("/add-user", async (req, res) => {
    try {
      let { name, email, college, regdNo, phone, accommodation } = req.body;
      email=email.toLowerCase().trim();
      console.log(name,email,college);
      // Check if email or registration number already exists
      const existingUser = await User.findOne({ $or: [{ email }, { regdNo }] });
  
      if (existingUser) {
        return res.status(400).json({
          message: existingUser.email === email
            ? "Email is already registered."
            : "Registration number is already registered."
        });
      }
      const userId = await generateUserId();
      console.log(userId);
  
      // Create and save new user
      const newUser = new User({ name,userId, email, college, regdNo, phone, accommodation });
      await newUser.save();
      await transporter.sendMail({
        from: "22b01a0501@svecw.edu.in",
        to: email,
        subject: "🚀 Welcome to TechNova! Your Journey Begins Now!",
        text: `Dear ${name},

🎉You are now officially registered for TechNova—where innovation meets excitement!

🔹 What’s Next?
It's time to enroll in events and make your mark. Choose from a lineup of thrilling competitions and challenges designed to test your skills and creativity.
Get ready for an unforgettable experience! 

See you at TechNova! 🚀

Best wishes,
SVECW`,
      });
  
      res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Error registering user", error });
    }
  });

// 🟢 Get all users
router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "22b01a0501@svecw.edu.in",
        pass: "evtfwrzycaekjbig"
    }
});

// Generate OTP function
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Route to verify email and send OTP
router.post("/verify-email", async (req, res) => {
  try {
    let { email } = req.body;
    email =email.toLowerCase().trim();
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "Email not registered" });

    // Generate OTP
    const otp = generateOTP();

    // Save OTP in the database (You can also use Redis for temporary storage)
    await OTP.create({ email, otp, expiresAt: Date.now() + 5 * 60 * 1000 }); // OTP expires in 5 minutes
    // console.log(otp);
    // Send OTP via email
    await transporter.sendMail({
      from: "22b01a0501@svecw.edu.in",
      to: email,
      subject: "Your OTP for Verification",
      text: `Your OTP for verification is: ${otp}. It is valid for 5 minutes.`,
    });

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to verify OTP
router.post("/verify-otp", async (req, res) => {
  try {
    let { email, otp } = req.body;
    email=email.toLowerCase().trim();

    // Find OTP record
    const storedOTP = await OTP.findOne({ email, otp });

    if (!storedOTP) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check if OTP is expired
    if (Date.now() > storedOTP.expiresAt) {
      await OTP.deleteOne({ email });
      return res.status(400).json({ message: "OTP expired" });
    }

    // Delete OTP after verification
    await OTP.deleteOne({ email });

    // Fetch user details
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "OTP verified successfully",
      user, // Send user details
    });

  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



// API to update user details
router.put("/update-user", async (req, res) => {
    try {
        let { email, name, college, regdNo, phone, accommodation } = req.body;
        email=email.toLowerCase().trim();
        // Find and update user
        const updatedUser = await User.findOneAndUpdate(
            { email }, // Find user by email
            { name, college, regdNo, phone, accommodation }, // Fields to update
            { new: true } // Return updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", user: updatedUser });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
