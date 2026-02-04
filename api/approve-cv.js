const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    const { email, action } = req.query;

    if (!email || !action) {
        return res.status(400).send('Invalid request: Missing parameters.');
    }

    const { EMAIL_USER, EMAIL_PASS, SITE_URL } = process.env;

    // SECURE FILE PATH
    // IMPORTANT: This file name must match the one in assets/docs/ exactly.
    const SECURE_CV_PATH = 'assets/docs/Chinonso_CV_SECURE_7A9B2C.pdf';
    const downloadLink = `${SITE_URL}/${SECURE_CV_PATH}`;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
        }
    });

    let subject, htmlBody;

    if (action === 'approve') {
        subject = 'CV Access Granted: Nwanosike Chinonso Amos';
        htmlBody = `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                <h3 style="color: #10b981;">Access Granted</h3>
                <p>Hello,</p>
                <p>Your request to view the CV of <strong>Nwanosike Chinonso Amos</strong> has been <span style="color: #10b981; font-weight: bold;">APPROVED</span>.</p>
                <p>You can download the document using the secure link below:</p>
                <br>
                <a href="${downloadLink}" style="background-color: #3b82f6; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Download CV (PDF)</a>
                <br><br>
                <p style="font-size: 0.9em; color: #666;">Please do not share this link directly.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                <p>Best regards,<br>Chinonso Amos</p>
            </div>
        `;
    } else {
        subject = 'CV Access Request Update';
        htmlBody = `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                <h3>Access Request Update</h3>
                <p>Hello,</p>
                <p>Thank you for your interest. Unfortunately, your request to view the full CV could not be approved at this time.</p>
                <p>You are welcome to view the public profile and project portfolio on the website.</p>
                <br>
                <a href="${SITE_URL}" style="color: #3b82f6; text-decoration: none;">Return to Website</a>
                <br><br>
                <p>Best regards,<br>Chinonso Amos</p>
            </div>
        `;
    }

    try {
        await transporter.sendMail({
            from: `Chinonso Amos <${EMAIL_USER}>`,
            to: email,
            subject: subject,
            html: htmlBody
        });

        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Action Confirmed</title>
                <style>
                    body { font-family: 'Segoe UI', sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; background: #f0f2f5; margin: 0; }
                    .card { background: white; padding: 40px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); text-align: center; max-width: 400px; }
                    h1 { color: #333; margin-bottom: 20px; font-size: 24px; }
                    p { color: #666; margin-bottom: 30px; }
                    .btn { background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-size: 16px; }
                    .btn:hover { background: #2563eb; }
                </style>
            </head>
            <body>
                <div class="card">
                    <h1>Action Processed: ${action.toUpperCase()}</h1>
                    <p>Notification email has been sent to <strong>${email}</strong>.</p>
                    <button class="btn" onclick="window.close()">Close Window</button>
                </div>
            </body>
            </html>
        `);
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).send('Error processing request.');
    }
}
