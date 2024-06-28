const Tag = require('../models/tags')

exports.createTag = async(req,res) => {
    try{
        const {name,description} = req.body
        if(!name || !description){
            return res.status(401).json({
                success:false,
                message:"All fields are required"
            })
        }
        const tagDetails = await Tag.create({
            name:name,
            description:description,
        })
        console.log(tagDetails)
        return res.status(200).json({
            success:true,
            message:"Tag Created successfully"
        })
    }
    catch(err){
        return res.status(401).json({
            success:false,
            message:err.message
        })
    }
}

exports.showAllTags = async(req,res) => {
    try{
        const allTags = await Tag.find({},{name:true,description:true})
        console.log(allTags)
        return res.status(200).json({
            success:true,
            message:"All tags returned successfully",
            allTags,
        })
        
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:err.message
        })
    }
}