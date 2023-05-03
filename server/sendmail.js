var nodemailer = require('nodemailer');

const SendResetLink = async(emailAddress, token) => {

    let transporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'techinfo8511@gmail.com',
            pass: 'Infy@12345'
        }
    });

    let mailOptions = {
        from: 'techinfo8511@gmail.com',
        to: emailAddress,
        subject: 'Reset Password',
        text: `your reset link http://localhost:3000/resetpassword/${token}
                link will be expired in 10 minutes.`
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports = SendResetLink