import express from "express";
import {emailQueue} from "./queue.js"
const app = express();
app.use(express.json());


app.post("/welcone-email" , async (req,res) => {
    const job = emailQueue.add("send-welcome-email" , {
       to: req.body.to,
       name: req.body.name || Lerner,

    },
    {
        attempts: 3,
        backoff:{
            delay:2000,
            type:'exponential'
        },


    }
);
    res.json({message: "Welcome email job added to the queue!" , jobId: job.id})
})

app.listen(3000 , () => {
    console.log("Server started on port 3000");
});

   