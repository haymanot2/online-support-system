const express = require('express');
const mongoose =require("mongoose");
const cors =require("cors")

const bodyParser=require("body-parser")

require("dotenv").config()
const routes=require("./routes/ticketFormRoute")
const app = express();
const PORT=process.env.PORT||5000

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  console.log("mongodb is connected")
}).catch((err)=>{
  console.log(err)
}) 


app.use("/api",routes)
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
