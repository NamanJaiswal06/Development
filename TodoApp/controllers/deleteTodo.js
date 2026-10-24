//import 
const Todo = require("../models/todo");

 //define route handler

 exports.deleteTodo = async(req , res)=>{
    try{
        const {id} = req.params
        
        await Todo.findByIdAndDelete(id);

        res.json({
            success:true,
            message:"todo deleted"
        })
      

    }
    catch(error){
        console.error(error)
        console.log(error)
        res.status(500)
        .json({
            success:false,
            data:"internal server error",
            message:error.message ,


        })

    }
 }