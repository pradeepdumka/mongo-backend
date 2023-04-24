import { Request,Response } from "express";

const getHomePage = (req:Request,res:Response)=>{
    res.json({
        message:'Home Controller'
    })
}

export {
    getHomePage
}