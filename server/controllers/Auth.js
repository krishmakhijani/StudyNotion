const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator")

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
}
