const express=require("express");
const Productrouter=express.Router();
const isAdmin=require("../Middleware/IsAdmin.js")
const Product=require("../Models/Product.js")


Productrouter.post("/add",isAdmin,async(req,res)=>{
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


Productrouter.get("/all-products",async(req,res)=>{
  const {id}=req.query;

  try {
    let products;
     if(id){
       products = await Product.findOne({ _id: id, isDeleted: false });
     }else{
        products=await Product.find({ isDeleted: false }).populate("adminId");
     }
    if(products.length<=0){
      res.status(200).json({message:"product not found" ,status:true})
    }
    res.status(200).json({
      success:true,
      message:"Products fetched successfully",
      products:products
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error||error.errorResponse.errmsg,
   
    })
  }
})

Productrouter.get("/delete",isAdmin,async(req,res)=>{
  const {id}=req.query;
  try {
    let products;
     if(id){
       products=await Product.findByIdAndUpdate({_id:id},{isDeleted:true});
     }else{
      await Product.updateMany(
        { isDeleted: false },       // filter
        { $set: { isDeleted: true } } // update
      );
     }
    res.status(200).json({
      success:true,
      message:"Products fetched successfully",
      products:products
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error||error.errorResponse.errmsg,
   
    })
  }
})

Productrouter.post("/update",isAdmin,async(req,res)=>{
  const {id,prodName,price,count,description}=req.body;
  try {
    let products;
     if(!id){
      res.status(200).json({
        success:false,
        message:"Please send product id",
      })
    }
    products=await Product.findByIdAndUpdate({_id:id},{prodName,price,count,description});
    res.status(200).json({
      success:true,
      message:"Products updated successfully",
      products:products
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error||error.errorResponse.errmsg,
   
    })
  }
})

module.exports=Productrouter;