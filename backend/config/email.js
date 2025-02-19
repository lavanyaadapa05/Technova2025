const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables

const sendEmail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail", // Use "gmail" or a custom SMTP service
            auth: {
                user: "amughdham@gmail.com",
        pass: "uaweajcromkupfnr"// App password (for Gmail, enable App Passwords)
            },
        });

        const mailOptions = {
            from: `"Technova Team"`, 
            to,
            subject,
            text,
        };

        await transporter.sendMail(mailOptions);
        console.log(`📩 Email sent to ${to}`);
    } catch (error) {
        console.error("❌ Error sending email:", error);
        throw new Error("Email could not be sent.");
    }
};

module.exports = sendEmail;
