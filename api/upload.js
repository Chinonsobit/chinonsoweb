import { put } from '@vercel/blob';

// Required to stream the raw body to Vercel Blob
export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const filename = req.query.filename || 'uploaded-file';

    try {
        const blob = await put(filename, req, {
            access: 'public',
        });
        return res.status(200).json(blob);
    } catch (error) {
        console.error('Vercel Blob Upload Error:', error);
        return res.status(500).json({ error: error.message || 'Error uploading file' });
    }
}
