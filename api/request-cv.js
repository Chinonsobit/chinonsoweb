const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { email, reason } = req.body;

    if (!email || !reason) {
        return res.status(400).json({ message: 'Email and reason are required.' });
    }

    const { EMAIL_USER, EMAIL_PASS, OWNER_EMAIL, SITE_URL } = process.env;

    // Basic validation for env vars (helpful for debugging)
    if (!EMAIL_USER || !EMAIL_PASS || !OWNER_EMAIL || !SITE_URL) {
        console.error('Missing environment variables');
        return res.status(500).json({ message: 'Server configuration error. Please contact the owner.' });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
        }
    });

    const approveLink = `${SITE_URL}/api/approve-cv?email=${encodeURIComponent(email)}&action=approve`;
    const declineLink = `${SITE_URL}/api/approve-cv?email=${encodeURIComponent(email)}&action=decline`;

    const mailOptions = {
        from: `CV Request System <${EMAIL_USER}>`,
        to: OWNER_EMAIL,
        subject: `New CV Access Request from ${email}`,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h3 style="color: #3b82f6;">New Access Request</h3>
                <p><strong>Requester:</strong> ${email}</p>
                <div style="background: #f8fafc; padding: 15px; border-left: 4px solid #3b82f6; margin: 15px 0;">
                    <strong>Reason:</strong><br>
                    ${reason}
                </div>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <p>Please select an action:</p>
                <div style="margin-top: 20px;">
                    <a href="${approveLink}" style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-right: 15px;">Approve Request</a>
                    <a href="${declineLink}" style="background-color: #ef4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Decline</a>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Request submitted successfully.' });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ message: 'Failed to send email notification.' });
    }
}
