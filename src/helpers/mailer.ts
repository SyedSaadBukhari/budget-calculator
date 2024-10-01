import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

interface SendEmailParams {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: SendEmailParams) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: new Date(Date.now() + 3600000),
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: new Date(Date.now() + 3600000),
        },
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "c97b87b71bec7a",
        pass: "72fb1cc167b849",
      },
    });

    const link =
      emailType === "VERIFY"
        ? `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`
        : `${process.env.DOMAIN}/newPassword?token=${hashedToken}`;

    const mailOptions = {
      from: "admin@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${link}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste the link below into your browser: <br> ${link}</p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
