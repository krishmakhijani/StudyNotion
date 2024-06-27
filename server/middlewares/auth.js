const jwt = require("jsonwebtoken")
require("dotenv").config()
const User = require("../models/User")

exports.auth = async(req,res,next) => {
    try{
        const token = req.cookies.token 
                    || req.body.token 
                    || req.header("Authorisation").replace("Bearer","")
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token is missing"
            })
        }
        try{
            const decode = jwt.verify(token,proces.env.JWT_SECRET)
            console.log(decode);
            req.User = decode
        }catch(err){
            return res.status(401).json({
                success:false,
                message:"Token is invalid"
            })
        }
        next()

    }catch(err){
        return res.status(401).json({
            success:false,
            message:"Something went wrong while validating the token"
        })
    }
}

exports.isStudent = async(req,res,next) => {
    try{
        if(req.user.accountType !==  "Student"){
            return res.status(403).json({
                success:false,
                message:"This route is only for Students"
            })
        }
        next()

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified"
        })
    }
}