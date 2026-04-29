const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    caption:{
        type: String,
        default:""
    },
    imageUrl:{
        type: String,
        required:[true, "Image url is required for creating an post"]
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required:[true,"User Id is required for creating a post"]
    }
})

const postModel = mongoose.model("posts", postSchema)

module.exports = postModel;