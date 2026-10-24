
//server instantiate

const express = require('express');
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.json())




//activate server on 3000 port
app.listen(3000, ()=>{
    console.log("server started at port no 3000")
})

//Routes
app.get('/', (req,res)=>{
    res.send("hello Jee , kaise ho")
})

//route define
app.post('/api/cars' , (request , response)=>{
    const {name , brand} = request.body;
    console.log(name)
    console.log(brand)
    response.send("car submitted")
})