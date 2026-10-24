import express from "express";
import Redis from 'ioredis';

const app = express();

app.use(express.json());

const publisher = new Redis(process.env.REDIS_URL || 'redis://localhost:6379')

app.post("/notifications" , async (req , res)=>{
    const payload = {
        title: req.body.title || "Defau;lt Title",
        createdAt : new Date().toISOString()

    }
    const recievers = await publisher.publish('notifications',JSON.stringify(payload));
    res.json({message: "Notification sent to " + recievers + " recievers"})
})

app.listen(3000, () => {
    console.log("Server started on port 3000")
})