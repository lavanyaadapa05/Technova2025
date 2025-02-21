const express = require("express");
const router = express.Router();
const Team = require("../models/teamModel");
const User = require("../models/userModel");
const Events = require("../models/eventModel");
const nodemailer =require("nodemailer");
const OTP = require("../models/OTP");
const sendEmail = require("../config/email");
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "22b01a0501@svecw.edu.in",
        pass: "evtfwrzycaekjbig"
    }
});
const crypto = require("crypto");

// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Store OTP with expiry
router.post("/send-otp", async (req, res) => {
    let { leaderEmail } = req.body;
    leaderEmail=leaderEmail.toLowerCase().trim();
    console.log("Received request:", req.body);
    try {
        if (!leaderEmail) return res.status(400).json({ success: false, message: "Leader email is required." });

        console.log("Generating OTP...");
        const otp = generateOTP();
        

        console.log(`OTP generated: ${otp}`);

        // Set OTP expiry time (e.g., 10 minutes from now)
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 10); // Expires in 10 minutes

        // Store OTP in DB

        await OTP.create({ email: leaderEmail, otp: otp, createdAt: new Date(), expiresAt });
        console.log("OTP stored in database.",otp);

        // Send email
        console.log(`Sending OTP to ${leaderEmail}...`);
        await sendEmail(leaderEmail, "Your OTP Code", `Your OTP for modifying your team: ${otp}`);
        console.log("Email sent successfully.");

        res.json({ success: true, message: "OTP sent successfully." });
    } catch (error) {
        console.error("Error in send-otp API:", error);
        res.status(500).json({ success: false, message: "Failed to send OTP.", error: error.message });
    }
});


// Verify OTP
router.post("/verify-otp", async (req, res) => {
    let { leaderEmail, otp } = req.body;
    leaderEmail=leaderEmail.toLowerCase().trim();
    console.log(leaderEmail,otp);
    try {
        const storedOTP = await OTP.findOne({ email: leaderEmail });
        if (!storedOTP) return res.status(400).json({ success: false, message: "OTP expired or invalid." });

        console.log(`Stored OTP: ${storedOTP.otp} , ${otp}`);
        if (storedOTP.otp !== otp) return res.status(400).json({ success: false, message: "Incorrect OTP." });
        // OTP is correct → Now delete it
        await OTP.deleteOne({ email: leaderEmail });
        console.log(`OTP for ${leaderEmail} deleted successfully.`);
        res.json({ success: true, message: "OTP verified." });
    } catch (error) {
        console.error("Error during OTP verification:", error);
        res.status(500).json({ success: false, message: "OTP verification failed." });
    }
});
//fetch team details
router.get("/:eventId/:leaderEmail", async (req, res) => {
    let { eventId, leaderEmail } = req.params;
    leaderEmail=leaderEmail.toLowercase().trim();

    try {
        console.log(`Fetching team for event ID: ${eventId}, Leader Email: ${leaderEmail}`);

        const team = await Team.findOne({ Event_id: Number(eventId), leadEmail: leaderEmail });
        console.log(team);
        if (!team) return res.status(404).json({ success: false, message: "Team not found." });

        res.json({ success: true, team });
    } catch (error) {
        console.error("Error fetching team details:", error);
        res.status(500).json({ success: false, message: "Error fetching team details." });
    }
});
router.post("/remove-member", async (req, res) => {
    let { eventId, leaderEmail, memberEmail } = req.body;
    leaderEmail=leaderEmail.toLowercase().trim();
    memberEmail=memberEmail.toLowerCase().trim();
    try {
        console.log(`Removing member: ${memberEmail} from team (Event ID: ${eventId}, Leader: ${leaderEmail})`);

        // Convert eventId to a valid number
        const eventIdNumber = Number(eventId);
        if (isNaN(eventIdNumber)) {
            return res.status(400).json({ success: false, message: "Invalid eventId." });
        }

        // Find the team based on eventId and leaderEmail
        const team = await Team.findOne({ Event_id: eventIdNumber, leadEmail: leaderEmail });

        if (!team) {
            return res.status(404).json({ success: false, message: "Team not found." });
        }

        // Check if the member exists in the team
        const memberIndex = team.teamMates.findIndex(member => member.email === memberEmail);
        if (memberIndex === -1) {
            return res.status(400).json({ success: false, message: "Member not in team." });
        }

        // Get the user details
        const user = await User.findOne({ email: memberEmail });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Remove the member from the team
        team.teamMates.splice(memberIndex, 1);
        await team.save();

        // Remove the event and team from user's record
        await User.updateOne(
            { email: memberEmail },
            {
                $pull: {
                    eventsRegistered: eventIdNumber, // Remove event ID
                    teams: team._id, // Remove team ID
                },
            }
        );

        res.json({ success: true, message: "Member removed successfully.", team });
    } catch (error) {
        console.error("Error removing team member:", error);
        res.status(500).json({ success: false, message: "Error removing team member.", error: error.message });
    }
});

//add-member api
router.post("/add-member", async (req, res) => {
    let { eventId, leaderEmail, newMemberName, newMemberEmail } = req.body;
    leaderEmail=leaderEmail.toLowercase().trim();
    newMemberEmail=newMemberEmail.toLowercase().trim();
    try {
      console.log(`Adding member: ${newMemberEmail} to team (Event ID: ${eventId}, Leader: ${leaderEmail})`);
        
      // Convert eventId to a valid number
      const eventIdNumber = Number(eventId);
      if (isNaN(eventIdNumber)) {
        return res.status(400).json({ success: false, message: "Invalid eventId." });
      }
  
      // Check if the event exists
      const event = await Events.findOne({ Event_id: eventIdNumber });
      if (!event) {
        return res.status(404).json({ success: false, message: "Event not found." });
      }
  
      // Find the team based on eventId and leaderEmail
      const team = await Team.findOne({ Event_id: eventIdNumber, leadEmail: leaderEmail });
      if (!team) {
        return res.status(404).json({ success: false, message: "Team not found." });
      }
  
      // Calculate how many additional members are allowed (leader is already counted)
      const allowedTeamMembers = event.Max_participants - 1;
  
      // Check if team size exceeds event's allowed members (excluding leader)
      if (team.teamMates.length >= allowedTeamMembers) {
        return res.status(400).json({ success: false, message: "Max team size reached." });
      }
  
      // Check if the new member is already in the team
      const isMemberExists = team.teamMates.some(member => member.email === newMemberEmail);
      if (isMemberExists) {
        return res.status(400).json({ success: false, message: "Member already in team." });
      }

  
      // Fetch the new member from User collection
      const newMember = await User.findOne({ email: newMemberEmail });
      if (!newMember) {
        return res.status(404).json({ success: false, message: `User with email ${newMemberEmail} not found.` });
      }
  
      // Check if the new member has already registered for this event
      if (newMember.eventsRegistered.includes(eventIdNumber)) {
        return res.status(400).json({ success: false, message: `${newMemberEmail} has already registered for this event.` });
      }
  
      // Add the new member to the team object
      team.teamMates.push({
        userId: newMember._id,
        name: newMemberName,
        email: newMemberEmail,
      });
  
      // Save the updated team
      await team.save();
  
      // Update new member's document: add team and event registration
      await User.findByIdAndUpdate(newMember._id, {
        $push: { teams: team._id, eventsRegistered: eventIdNumber }
      });
  
      // (Optional) Send email notification to the new member
      const mailOptions = {
        from: "amughdham@gmail.com",
        to: newMember.email,
        subject: `Technova - ${event.Name} Registration`,
        text: `Hello ${newMember.name},\n\nYou have been added by ${leaderEmail} to the team "${team.teamName}" for the event "${event.Name}".\n\n${event.Desc}`
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error("Error sending email to new member:", err);
        } else {
          console.log("Email sent: ", info.response);
        }
      });
  
      res.json({ success: true, message: "Member added successfully.", team });
    } catch (error) {
      console.error("Error adding team member:", error);
      res.status(500).json({ success: false, message: "Error adding team member.", error: error.message });
    }
  });
  // Generate a unique team ID based on the number of teams already registered
const generateTeamId = async () => {
    const teamCount = await Team.countDocuments();
    return `TEAM-${teamCount + 1}`;
};

// Create a team or register a single participant
router.post("/create-team", async (req, res) => {
    console.log("Received request:", req.body);
    try {
        let { EventId, teamName, leadName, leadEmail, teamMates } = req.body;
        leadEmail=leadEmail.toLowerCase().trim();
        const eventid = parseInt(EventId);

        // Check if the event exists
        const event = await Events.findOne({ Event_id: eventid });
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Find the leader by email
        const leader = await User.findOne({ email: leadEmail });
        if (!leader) {
            return res.status(404).json({ message: `${leadEmail} not found` });
        }

        // Check if the leader has already registered for this event
        if (leader.eventsRegistered.includes(eventid)) {
            return res.status(400).json({ message:` ${leadEmail} has already registered for this event` });
        }

        let membersArray = [];
        let members = [];

        if (teamMates !== undefined) {
            // Fetch team members by email
            const memberEmails = teamMates.map(member => member.email);
            members = await User.find({ email: { $in: memberEmails } });

            // Check if all members exist
            if (members.length !== memberEmails.length) {
                const foundEmails = members.map(member => member.email);
                const notFoundEmails = memberEmails.filter(email => !foundEmails.includes(email));
                return res.status(400).json({ message:` Users not found: ${notFoundEmails.join(", ")}` });
            }

            // Check if any member has already registered for this event
            const alreadyRegistered = members.find(member => member.eventsRegistered.includes(eventid));
            if (alreadyRegistered) {
                return res.status(400).json({ message: `${alreadyRegistered.email} has already registered for this event `});
            }

            // Construct members array with userId, name, email
            membersArray = members.map(member => ({
                userId: member._id,
                name: member.name,
                email: member.email,
            }));
        }

        // Generate a unique team ID
        const teamId = await generateTeamId();
        if(teamName !== undefined){
            const existingTeam = await Team.findOne({ teamName, Event_id: eventid });
            if (existingTeam) {
                return res.status(400).json({ message: `Team name ${teamName} is already taken for this event. Please choose a different name.` });
            }
        }

        // Create the new team
        const teamname = teamName !== undefined ? teamName : "Single";

        const newTeam = new Team({
            teamId,
            teamName: teamname,
            Event_id: eventid,
            leadName,
            leadEmail,
            leader_id: leader._id,
            teamMates: membersArray
        });

        // Add the new team ID to the "Teams" array of the event
        event.Teams.push(teamId);
        await event.save();

        // Update leader's document using $addToSet to ensure uniqueness
        await User.findByIdAndUpdate(leader._id, {
            $push: { teams: newTeam._id, eventsRegistered: newTeam.Event_id }
        });

        if (teamMates !== undefined) {
            // Update each member's document using $addToSet to ensure uniqueness
            await User.updateMany(
                { _id: { $in: members.map(member => member._id) } },
                { $push: { teams: newTeam._id, eventsRegistered: newTeam.Event_id } }
            );
        }


        
        const mailOptions = {
            from: "amughdham@gmail.com",
            to: leader.email,
            subject: `Technova - ${event.Name} Registartion `,
            text: `Hello ${leader.name},\n\nYou have been Registered by  to  the team "${teamName}" for the "${event.Name}".\n ${event.Desc} `
        };
        transporter.sendMail(mailOptions);
        for (const member of members) {
            
            const mailOptions = {
                from: "amughdham@gmail.com",
                to: member.email,
                subject: `Technova - ${event.Name} Registartion `,
                text: `Hello ${member.name},\n\nYou have been Registered by ${leadName} to  the team "${teamName}" for the "${event.Name}".\n ${event.Desc} `
            };
            transporter.sendMail(mailOptions);
        }
        await newTeam.save();
        res.status(201).json({ message: "Team created successfully", team: newTeam });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


module.exports = router;