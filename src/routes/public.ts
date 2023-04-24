import express ,{Request,Response} from 'express';
const publicRouter = express.Router();


const asyncHandler = (fn:any)=> (req:Request,res:Response,next:any)=>
{
    return Promise.resolve(fn(req,res,next)).catch(next);
}

import { signUp,login} from '../controllers/auth.controller';

publicRouter.post('/signup',asyncHandler(signUp))
publicRouter.post('/login',asyncHandler(login))


export{
    publicRouter
}