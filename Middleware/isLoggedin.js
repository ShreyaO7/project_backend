const jwt = require('jsonwebtoken');

const isLoggedin=(req,res,next)=>{
    const token=req.headers["token"];

    if (!token) {
        return res.status(401).json({ message: "You are unauthorized !" });
      }

    try {
        const decoded = jwt.verify(token, 'secret');
        console.log(decoded)
        if(!decoded){
            return res.status(401).json({ message: "Session expired" });
        }
        req.user = decoded.data; 
        next()
    //    console.log(decoded)
    } catch (error) {
        console.log(error)
    }

}

module.exports=isLoggedin;