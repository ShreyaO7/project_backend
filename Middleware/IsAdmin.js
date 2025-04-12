
const isAdmin=(req,res,next)=>{
    try {
        const userDetails=req.user;
        if(userDetails.role!="admin"){
            res.status(401).json({
                success:false,
                message:"You have not permissions"
            })
        }
        next()
        
    } catch (error) {
        res.status(401).json({
            success:false,
            message:error.message
        })
    }
}

module.exports=isAdmin