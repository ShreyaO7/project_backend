const express=require("express");
const User=require("../Models/User.js")
const bcrypt =require("bcryptjs");
const jwt = require('jsonwebtoken');
const Authrouter=express.Router();

Authrouter.post("/signup",async(req,res)=>{
//    ===== destructering
    const {name,age,password,email,role}=req.body
 
try {
       const hashpassword=await bcrypt.hash(password, 10);
    const newUser=new User({name,age,password:hashpassword,email,role})
    await newUser.save()
    
     res.status(200).json({
        success:true,
        message:"user created successfully",
        data:newUser
      })
    
} catch (error) {
    res.status(500).json({
        success:false,
        message:error||error.errorResponse.errmsg,
     
      })
}
})

Authrouter.post("/login",async(req,res)=>{
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
        age:user.age,
        role:user.role
      }
      //token creation

   const token= jwt.sign({ //header part
        data: obj 
      }, 'secret', { expiresIn: '1h' });
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

module.exports=Authrouter