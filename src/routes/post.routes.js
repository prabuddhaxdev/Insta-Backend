const express = require('express');
const postRouter = express.Router();
const postController = require("../controllers/post.controllers")


// POST  /api/posts/
postRouter.post("/",postController.createPostController)

module.exports = postRouter