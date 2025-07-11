const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE, // e.g., 'gmail'
      host: process.env.EMAIL_HOST,       // e.g., 'smtp.gmail.com'
      port: process.env.EMAIL_PORT,       // usually 587
      secure: false,                      // true for 465, false for 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: `"NovaHRMS" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });

    console.log('📧 Email sent: %s', info.messageId);
  } catch (error) {
    console.error('❌ Email failed to send:', error);
    throw error;
  }
};

module.exports = sendEmail;
