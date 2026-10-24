//consumers 

import { Job, Worker } from "bullmq";
import { connection} from "./queue.js"

const worker = new Worker('emails',async (Job) => {

   console.log(`processing email job...` , Job.id , Job.name , Job.data);

   (await new Promise(resolve => setTimeout(resolve , 1500)),

   console.log('Email processed' , Job.id , Job.name , Job.data));
 
    
},
{connection}
);

worker.on("completed" , (Job) => {
    console.log('email job completed' , Job.id , Job.name , Job.data)
});

worker.on("failed" , (Job) => {
    console.log('email job failed' , Job.id , Job.name , Job.data)
});


