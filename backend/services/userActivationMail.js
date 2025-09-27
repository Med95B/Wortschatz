import transporter from "./Mailer.js";

const activationMail=async (options) => {

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions);
}

export default activationMail
