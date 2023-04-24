import express ,{Request,Response} from 'express';
const router = express.Router();
var cron = require('node-cron');
import {CronHelper} from '../helpers/cron.helpers'
const asyncHandler = (fn:any)=> (req:Request,res:Response,next:any)=>
{
    return Promise.resolve(fn(req,res,next)).catch(next);
}

import { getHomePage } from '../controllers/home.controller';
import {createNewsFunction,fetchNewsFunction}  from '../controllers/news.controller';
import  {verifyToken} from '../middleware/authJwt';

router.get('/home',getHomePage)
router.post('/createnews',verifyToken,asyncHandler(createNewsFunction))
router.post('/news',verifyToken,asyncHandler(fetchNewsFunction))

// cron.schedule('* * * * *', () => {
//     console.log('running a task every minute');
//     CronHelper.generatePlantFinderJSON();
// });

export{
    router
}