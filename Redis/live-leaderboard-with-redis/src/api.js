import express, { json } from "express";
import Redis from 'ioredis';

const app = express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

app.post("/post/:id/view" , async(req , res)=>{
    const userId= req.params.id;
    await redis.incr(`user:${userId}:view`)
    await redis.zincrby("leaderboard" , 1 , userId)

    res.json({message: "User added to leaderboard"})
 

});




app.post("/leaderboard/score" ,async (req , res) =>{
    const {userId} = req.body;
    const {points} = req.body;
    await redis.zincrby("leaderboard" , points , userId);
    return res.json({message: "score updated" , userId , points })
   
})

app.get("/leaderboard/top10" , async (req ,res) =>{

    const top10 = await redis.zrevrange("leaderboard" , 0 , 9);
    
  

    res.json({
        success:true,
        top10
    })
})

app.get("/leaderboard/:userId/rank" , async(req , res)=>{
    const userId = req.params.userId
    const rank = await redis.zrevrank("leaderboard" , userId);

    return res.json({
        success:true,
        rank: rank 
    })
})


app.listen(3000 , () => {
    console.log("Server is running on port 3000");
});


