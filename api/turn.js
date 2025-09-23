// Vercel Serverless Function
export default function handler(req, res) {
    res.status(200).json({
      iceServers: [
        {
          urls: "turn:relay1.expressturn.com:3480",
          username: process.env.TURN_USERNAME,
          credential: process.env.TURN_PASSWORD
        },
        { urls: "stun:stun.l.google.com:19302" }
      ]
    });
  }
  