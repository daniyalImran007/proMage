import nodemailer from "nodemailer";

// Define your email service configuration
const emailConfig = {
  host: "smtp.example.com",
  port: 587,
  secure: false,
  auth: {
    user: "your_email@example.com",
    pass: "your_password_here",
  },
} as nodemailer.TransportOptions;

const transporter = nodemailer.createTransport(emailConfig);

// Function to send email
export async function sendEmail(
  to: string,
  subject: string,
  text: string
): Promise<void> {
  try {
    // Send mail with defined transport object
    await transporter.sendMail({
      from: "sampleEmail@example.com",
      to,
      subject,
      text,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
}
