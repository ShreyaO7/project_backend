const jwt = require('jsonwebtoken');

const isLoggedin=(req,res,next)=>{

    const token=req.headers["token"];

    if (!token) {
        return res.status(401).json({ message: "You are unauthorized !" });
      }

    try {
        const decoded = jwt.verify(token, 'secret');

        req.user = decoded.data; 
        // console.log("res is=>",req)
        next()
    //    console.log(decoded)
    } catch (error) {
        return res.status(401).json({ message: "session expired!" });
    }

}

module.exports=isLoggedin;