var jwt = require("jsonwebtoken");

const { TokenExpiredError } = jwt;

const catchError = (err:any, res:any) => {
    if (err instanceof TokenExpiredError) {
      return res.status(401).send({ 
        status:401,
        message: "Unauthorized! Access Token was expired!" });
    }
  
    return res.sendStatus(401).send({
      status:401,
       message: "Unauthorized!"
     });
  }

const verifyToken = async(req:any,res:any,next:any)=>{


    let key = req.headers["authorization"];
    let token = key.split(' ')[1]

    if(!token){
        return res.status(403).send({
            status:403,
            message: "No token provided!"
          });
    }
  
    jwt.verify(token, process.env.JWTSECRATE,async(err:any,decoded:any)=>{
      console.log(err)

         if (err) {
         
             return catchError(err, res);
         }

        req.userId = decoded.id;
      
        next();
    })
}

export{
    verifyToken
}
