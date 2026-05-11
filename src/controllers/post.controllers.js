const postModel = require('../models/post.model')
const Imagekit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken')

const imagekit = new Imagekit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req,res){
    console.log(req.body, req.file)

    const token = req.cookies("token")

    if(!token){
        return res.status(401).json({
            message: "Token not provided. Unauthorized access."
        })
    }

    let decoded = null

    try {
     decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        res.status(401).json({
            message: "User not authorized."
        })
    }


    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file') ,
        fileName: "Test",
        folder: "Cohort-2-Insta-Clone-post"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imageUrl: file.url,
        user: decoded.id
    })

    res.status(201).json({
        message:"Post created successfully",
        post
    })

    res.send(file)
}

module.exports = {createPostController}