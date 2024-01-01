const jwt = require('jsonwebtoken');


module.exports=function(req,res,next){       
    try{
        const token = req.header('x-token');
        if(!token){
            return res.status(400).send('Token Not Found');
        }
        let decoded = jwt.verify(token,'jwtpassword');
        req.user = decoded.user;
        next();
  
    }
    catch(err){
        console.log(err);
        res.status(500).json({ msg: 'Server Error' });
    }
}
