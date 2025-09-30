// Vercel Serverless Function
export default function handler(req, res) {
    const stun = { urls: "stun:stun.l.google.com:19302" };
  
    if (!process.env.TURN_URL || !process.env.TURN_USERNAME || !process.env.TURN_PASSWORD) {
      console.warn("TURN config missing, using STUN-only");
      return res.status(200).json({ iceServers: [stun] });
    }
  
    res.status(200).json({
      iceServers: [
        stun,
        {
          urls: [
            `${process.env.TURN_URL}?transport=udp`,
            `${process.env.TURN_URL}?transport=tcp`,
            "turns:relay1.expressturn.com:5349"
          ],
          username: process.env.TURN_USERNAME,
          credential: process.env.TURN_PASSWORD
        }
      ]
    });
  }
  