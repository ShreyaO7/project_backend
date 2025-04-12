const express = require('express')
const mongoose = require('mongoose');
const User=require("./Models/User.js")
const bcrypt =require("bcryptjs");
const jwt = require('jsonwebtoken');
const app = express()
require('dotenv').config()
const port = process.env.PORT||3000


mongoose.connect('mongodb://127.0.0.1:27017/project')
  .then(() => console.log('Connected!'));

app.use(express.json())

app.post("/signup",async(req,res)=>{
//    ===== destructering
    const {name,age,password,email}=req.body
 
try {
       const hashpassword=await bcrypt.hash(password, 10);
    const newUser=new User({name,age,password:hashpassword,email})
    await newUser.save()
    
     res.status(200).json({
        success:true,
        message:"user created successfully",
        data:newUser
      })
    
} catch (error) {
    res.status(200).json({
        success:false,
        message:error||error.errorResponse.errmsg,
     
      })
}




  
})

app.post("/login",async(req,res)=>{
    const {password,email}=req.body
    
 
try {
         if(!password&&!email){
          res.status(200).json({
            success:false,
            message:"email or password is missing",
          })
         }
       const user=await  User.findOne({email})
      if(!user){
        res.status(200).json({
          success:false,
          message:"user not found",
        
        })
      }
      const pwdMatch=await bcrypt.compare(password, user.password);
      if(!pwdMatch){
        res.status(200).json({
          success:false,
          message:"Password does not match",
        
        })
      }
      console.log(user)
      const obj={
        _id:user._id,
        name:user.name,
        email:user.email,
        age:user.age
      }
      //token creation
   const token= jwt.sign({ //header part
        data: obj //payload 
      }, 'secret', { expiresIn: '1h' }); //signature
      res.status(200).json({
        success:true,
        message:"user login successfully",
        token:token
      })
   
} catch (error) {
    res.status(200).json({
        success:false,
        message:error||error.errorResponse.errmsg,
     
      })
}




  
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})