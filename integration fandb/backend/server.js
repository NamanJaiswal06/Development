import express from 'express'
import cors from 'cors'



const app = express()




//get a list of 5 jokes

app.get('/api/jokes' , (req , res)=>{
    const jokes = [
        {
            id: 1,
            title: "joke1",
            content: "joke1"
        },
        {
            id: 2,
            title: "joke2",
            content: "joke2"
        },
        {
            id: 3,
            title: "joke3",
            content: "joke3"
        },
        {
            id: 4,
            title: "joke4",
            content: "joke4"
        },
        {
            id: 5,
            title: "joke5",
            content: "joke5"
        }
    ]
    res.send(jokes);
    

})
const port = process.env.port || 3000;

app.listen(port, ()=>{
    console.log('server is started')
})


