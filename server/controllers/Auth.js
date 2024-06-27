const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator")
const bcrypton = require("bcrypt")
const Profile = require("../models/Profile")
const jwt = require("jsonwebtoken")
require("dotenv").config()

//sendOTP
exports.sendOTP = async (req, res) => {

    try{
        const {email} = req.body

        const checkUserPresent = User.findOne({email});

        if(checkUserPresent){
            return res.status(401).json({
                success : false,
                message : "User already present"
            })
        }

        var otpgeneric = otpGenerator.generate(6,{
            upperCaseAlphabets :false,
            lowerCaseAlphabets : false,
            specialChars : false
        })
        console.log("OTP Generated : ",otp)
        
        const result = await OTP.findOne({otp:otp})

        while(result){
            otpgeneric = otpGenerator.generate(6,{
                upperCaseAlphabets :false,
                lowerCaseAlphabets : false,
                specialChars : false
            })
            const result = await OTP.findOne({otp:otpgeneric}) 
        }

        const otpPayload = {email,otpgeneric}

        const otpBody = await OTP.create(otpPayload)
        console.log(otpBody)

        res.status(200).json({
            success : true,
            message : 'OTP Sent Successfully'
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message: err.message
        })

    }
};

//SignUp

exports.signUp = async (req,res) => {
    try{
        const{
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;

        if(!firstName || !lastName || email || !password || !confirmPassword || otp) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            })
        }

        if(password != confirmPassword){
            return res.status(500).json({
                success:false,
                message : "Password doesnot match "
            })
        }

        const exsistingUser = User.findOne({email})
        if(exsistingUser){
            return res.status(500).json({
                success : false,
                message : "User already exsists"
            })
        }

        const recentOTP = await OTP.find({email}).sort({createdAt:-1}.limit(1)) //understand
        console.log(recentOTP)

        if(recentOTP.length == 0){
            return res.status(400).json({
                success:false,
                message : "OTP not found"
            })
        }else if(otp != recentOTP.otp){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP"
            })
        }

        const  hashedPassword = bcrypton.hash(password,10);

        const profileDetails = Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        })

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            accountType,
            additionalDetails:profileDetails,
            image : `https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastname}`
        })

        return res.status(200).json({
            success:true,
            message:"User created successfully",
            user,
        })
    }catch(err){
        console.log(err)
        return res.status(400).json({
            success:false,
            message:"User cannot be registered. Please try again",
        })
    }
}

//Login

exports.login = async(req,res) => {
    try{

        const {email,password} = req.body

        if(!email||!password){
            return res.status(500).json({
                success:false,
                message:"All fields are required, please try again"
            })
        }

        const user = await User.findOne({email}).populate("additionalDetails")
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Please signup.User not found"
            })
        }
        if(await bcrypton.compare(password,user.password)){
            const payload = {
                email : user.email,
                id : user._id,
                accountType : user.accountType
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h"
            })
            user.token = token
            user.password = undefined

            const options = {
                expires : new Date(Date.now() + 3*24*60*60*1000),
                httpsOnly :  true,
            }

            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged In successfully"
            })
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Password incorrect"
            })
        }

    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Login unsuccessfull.Try again later"
        })
    }
}

//changepassword

exports.changePassword = async(req,res) => {
    try{
        

    }
    catch(err){

    }
}