

const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'anne.okeefe43@ethereal.email',
        pass: 'DN6sge6uRZ1ZxmptnD'
    }
});

// async..await is not allowed in global scope, must use a wrapper
async function sendmail(email,otp) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
    to: "bar@example.com, baz@example.com", 
    subject: "OTP for verification", // Subject line
    text: `Dear Shreya,

Your One Time Password (OTP) for verification is: 🔐 ${otp}

Please do not share this OTP with anyone. It is valid for the next 10 minutes.

If you did not request this, please ignore this message.

Thank you for shopping with us!  
[Your Brand Name] – Safe. Simple. Secure.  
📍 www.yourwebsite.com`, // plain text body
    // html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}



module.exports=sendmail