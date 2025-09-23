// Vercel Serverless Function
export default function handler(req, res) {
    res.status(200).json({
      iceServers: [
        {
          urls: process.env.TURN_URL,
          username: process.env.TURN_USERNAME,
          credential: process.env.TURN_PASSWORD
        },
        { urls: "stun:stun.l.google.com:19302" }
      ]
    });
  }
  