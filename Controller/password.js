// const SibApiV3Sdk = require('sib-api-v3-sdk');
// const User = require('../Model/signup');
// const ForgetPassword = require('../Model/forgetpassword');
// const uuid = require('uuid');
// const bcrypt = require('bcrypt');


// const fogotpassword = async (req, res) => {
//     try {
//         const email = req.body.email;
//         if (!email) {
//             return res.status(400).json({ success: false, message: 'Email is required' });
//         }

//         const user = await User.findOne({ where: { email: email } });
//         if (!user) {
//             return res.status(400).json({ success: false, message: 'User not found' });
//         }
//         const id = uuid.v4();
//         await ForgetPassword.create({
//             userId: user.id,  
//             id: id,
//             isactive: true
//         });

//         const defaultClient = SibApiV3Sdk.ApiClient.instance;
//         const apiKey = defaultClient.authentications['api-key'];
//         apiKey.apiKey = process.env.BREVO_API_KEY;


//         const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();


//         const sender = { email: 'vikram.kumar.cs.2024@gmail.com', name: 'Vikram Kumar' };
//         const receivers = [{ email: email }];


//         const sendSmtpEmail = {
//             sender,
//             to: receivers,
//             subject: 'Recover Your Password',
//             htmlContent: `
//         <p>Hello,</p>
//         <p>We received a request to reset your password.</p>
//         <a href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>
//         <p>If you did not request this, please ignore this email.</p>
//       `,
//         };

//         const response = await apiInstance.sendTransacEmail(sendSmtpEmail);

//         console.log('Email sent successfully:', response);
//         res.status(200).json({ success: true, message: 'Password reset email sent successfully.' });
//     } catch (error) {
//         console.error('Error in fogotpassword function:', error);
//         res.status(500).json({ success: false, message: 'Failed to send password reset email.' });
//     }
// };

// const resetpassword = async (req, res) => {

//     try {
//         const { id } = req.params;
//         const reset = await ForgetPassword.findOne({ where: { id, isactive: true } });
//         if (!reset)
//             return res.status(400).json({ message: 'Invalid or expired reset link' });
//         // await reset.update({ isactive: false });
//         res.status(200).send(`
//         <!DOCTYPE html>
//     <html>
//     <head>
//         <title>Reset Password</title>
//     </head>
//     <body>
//         <form action="/password/updatepassword/${id}" method="get" onsubmit="forsubmitted" >
//             <label for="newpassword">Enter New Password:</label>
//             <input type="password" id="newpassword" name="newpassword" required />
//             <button type="submit">Reset Password</button>
//         </form>
//         <script>
//             function formsubmitted(e) {
//                 e.preventDefault();
//                 console.log('Form submitted');
//             }
//         </script>
//     </body>
//     </html>
// `)
//     } catch (err) {
//         console.log('Error in reseting password', err);
//         res.status(500).json({ success: false, message: err.message });
//     }
// }
// const updatepassword = async (req, res) => {
//     const { id } = req.params;
//     const { newpassword } = req.query;
//     console.log("In updatepassword routehandler", id,newpassword);
//     try {
//         const resetpassword = await ForgetPassword.findOne({where:{ id }})
//         if (!resetpassword||!resetpassword.isactive)
//             return res.status(400).json({ success: false, message: ' Cannot update password Reset link is Invalid' })
//         const saltround = 10;
//         const hash= await bcrypt.hash(newpassword, saltround)
//         await User.update({ password: hash }, { where: { id: resetpassword.userId } });
//         await ForgetPassword.update({ isactive: false }, { where: { id } });
//         console.log('password changed successfully')
//         res.status(201).json({ success: true, message: 'Password changed successfully' })

//     } catch (err) {
//         res.status(500).json({ success: false, message: err.message })
//     }
// }

// module.exports = { fogotpassword, resetpassword, updatepassword };

// passwordController.js

const passwordService = require('../services/passwordServices');

const fogotpassword = async (req, res) => {
    try {
        const { email } = req.body;
        await passwordService.fogotpassword(email);
        res.status(200).json({ success: true, message: 'Password reset email sent successfully.' });
    } catch (error) {
        console.error('Error in fogotpassword function:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const resetpassword = async (req, res) => {
    try {
        const { id } = req.params;
        await passwordService.resetpassword(id);
        res.status(200).send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Reset Password</title>
            </head>
            <body>
                <form action="/password/updatepassword/${id}" method="get">
                    <label for="newpassword">Enter New Password:</label>
                    <input type="password" id="newpassword" name="newpassword" required />
                    <button type="submit">Reset Password</button>
                </form>
            </body>
            </html>
        `);
    } catch (err) {
        console.log('Error in resetting password', err);
        res.status(500).json({ success: false, message: err.message });
    }
};

const updatepassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { newpassword } = req.query;

        const message = await passwordService.updatepassword(id, newpassword);
        res.status(201).json({ success: true, message });
    } catch (err) {
        console.log('Error in updating password', err);
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = { fogotpassword, resetpassword, updatepassword };
