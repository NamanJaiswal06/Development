import express from 'express'
import Redis from 'ioredis'

const app = express();
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379")

app.use(express.json());

const QUEUE_KEY = 'queue:emails';

app.post('/emails' , async (req,res) => {
   const job = {
    to: req.body.to,
    subject : req.body.subject,
    text : req.body.text || "NO content",
    createdAt : new Date().toISOString()
   }

   await redis.lpush(QUEUE_KEY , JSON.stringify(job));
   res.json({
    queued : true , job
   })

})

app.get('/emails/process-one' , async (req , res) =>{
        
    const rawJob = await redis.rpop(QUEUE_KEY);
    if (!rawJob) {
        return res.json({ message: "No jobs"})
    }

    const job = JSON.parse(rawJob);
    res.json({processed:job});
}
)
app.listen(3000 , () => {
    console.log("server is running on port 3000")
})