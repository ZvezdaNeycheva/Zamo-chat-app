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
                urls: [
                    `turn:${process.env.TURN_URL}?transport=udp`,
                    `turn:${process.env.TURN_URL}?transport=tcp`,
                    "turns:relay1.expressturn.com:5349" // optional TLS
                ],
                username: process.env.TURN_USERNAME,
                credential: process.env.TURN_PASSWORD
            }
        ]
    });
}