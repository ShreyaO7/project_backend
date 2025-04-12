const express=require("express");
const Productrouter=express.Router();
const Product=require("../Models/Product.js")


Productrouter.post("/add",async(req,res)=>{
    try {
        const adminId=req.user._id;
      const {prodName,price,count,description}=req.body
      const newProduct=new Product({adminId:adminId,prodName,price,count,description})
      await newProduct.save();
      res.status(200).json({
        success:true,
        message:"product is successfully created"
      })
    
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error||error.errorResponse.errmsg,
         
          })
        
    }
})

module.exports=Productrouter