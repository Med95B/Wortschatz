import nodemailer from 'nodemailer';

//config gmail

  const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      service: process.env.SMTP_SERVICE,
      auth:{
          user: process.env.SMTP_MAIL,
          pass: process.env.SMTP_PASSWORD,
      },
  });



export default transporter