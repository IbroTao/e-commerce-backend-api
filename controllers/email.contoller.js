const nodemailer = require("nodemailer");

const sendEmail = async (data, req, res) => {
  let transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: process.env.SENDER_NAME,
      pass: process.env.EMAIL_PASS,
    },
    secure: true,
  });

  let info = await transporter.sendMail({
    from: "ibrahimtaofeek005@gmail.com",
    to: data.to,
    subject: data.subject,
    text: data.text,
    html: data.html,
  });
  console.log("Message sent: %s", info.messageId);
};

module.exports = { sendEmail };
