export default function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { password } = req.body;

    if (!process.env.ADMIN_PASSWORD) {
        // Fallback for safety or notify if password isn't set yet.
        return res.status(500).json({ success: false, message: 'ADMIN_PASSWORD is not set in Vercel environment variables.' });
    }

    if (password === process.env.ADMIN_PASSWORD) {
        return res.status(200).json({ success: true });
    }

    return res.status(401).json({ success: false, message: 'Invalid password.' });
}
