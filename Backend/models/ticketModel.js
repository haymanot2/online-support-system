const mongoose =require("mongoose")
const ticketSchema=new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        
    },
    
    email: {
        type: String,
    required: true,
    unique: true,
       
    } ,
    phoneNumber: {
        type: String,
        required: true,
        
    },
    problemDescription: {
        type: String,
        required: true,
       
    },
    status: {
        type: String,
       default:"open"
       
    },
    respond:{
        type:String
    }
})
module.exports=mongoose.model("Ticket",ticketSchema)