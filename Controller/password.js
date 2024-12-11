const SibApiV3Sdk = require('sib-api-v3-sdk');

const fogotpassword = async (req, res) => {
  try {
    const email = req.body.email;

    
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    console.log('Request body:', req.body);

    
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    
    const sender = { email: 'vikram.kumar.cs.2024@gmail.com', name: 'Vikram Kumar' };
    const receivers = [{ email: email }];

    
    const sendSmtpEmail = {
      sender,
      to: receivers,
      subject: 'Recover Your Password',
      htmlContent: `
        <p>Hello,</p>
        <p>We received a request to reset your password.</p>
        <p>If you did not request this, please ignore this email.</p>
      `,
    };

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log('Email sent successfully:', response);
    res.status(200).json({ success: true, message: 'Password reset email sent successfully.' });
  } catch (error) {
    console.error('Error in fogotpassword function:', error);
    res.status(500).json({ success: false, message: 'Failed to send password reset email.' });
  }
};

module.exports = { fogotpassword };
