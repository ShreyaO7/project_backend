
const mongoose = require('mongoose');
const productSchema=new mongoose.Schema({
    prodName:{
        type:String,
        require:true
    },
    adminId:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User"
    },
    price:{
        type:Number,
        require:true,
    },
    count:{
        type:Number,
        require:true
    },
    description:{
        type:String,

    },
    isDeleted:{
        type:Boolean,
        default:false
    }
    
},{ timestamps: true });
const Product=mongoose.model("Product",productSchema);
module.exports=Product;