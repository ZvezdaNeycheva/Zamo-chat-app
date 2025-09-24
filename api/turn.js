// Vercel Serverless Function
export default function handler(req, res) {
    console.log("TURN request received");
    if (!process.env.TURN_URL || !process.env.TURN_USERNAME || !process.env.TURN_PASSWORD) {
        console.error("TURN server environment variables are not set");
        console.log("TURN API hit", process.env.TURN_URL);

        return res.status(500).json({ error: "TURN server not configured" });
    }

    res.status(200).json({
        iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
            {
                urls: process.env.TURN_URL,
                username: process.env.TURN_USERNAME,
                credential: process.env.TURN_PASSWORD
            }
        ]
    });
}