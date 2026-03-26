import { Redis } from '@upstash/redis';

// Automatically connects using UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
const redis = Redis.fromEnv();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Authenticate
        const authHeader = req.headers.authorization;
        if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { section, data } = req.body;
        if (!section || !data) {
            return res.status(400).json({ message: 'Missing section or data' });
        }

        try {
            await redis.set(`site_${section}`, data);
            return res.status(200).json({ success: true });
        } catch (error) {
            return res.status(500).json({ message: 'Database error: ' + error.message });
        }

    } else if (req.method === 'GET') {
        try {
            // Fetch all sections
            const experiences = (await redis.get('site_experiences')) || [];
            const publications = (await redis.get('site_publications')) || [];
            const skills = (await redis.get('site_skills')) || [];
            const awards = (await redis.get('site_awards')) || [];

            return res.status(200).json({
                experiences,
                publications,
                skills,
                awards
            });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to fetch content.' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
