const nodemailer = require('nodemailer');

module.exports = async () => {
  // Use ethereal for testing purposes
  const testAccount = await nodemailer.createTestAccount();

  return nodemailer.createTransport({
    // TODO: Base options off env variables
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
};
