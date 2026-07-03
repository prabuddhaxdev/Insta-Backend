const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controllers");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const identifyUser = require("../middlewares/auth.middleware");

// POST  /api/posts/
postRouter.post(
  "/",
  upload.single("image"),
  identifyUser,
  postController.createPostController,
);


// GET /api/posts/
postRouter.get("/", identifyUser, postController.getPostController);


//GET /api/posts/details/:postid
postRouter.get(
  "/details/:postid",
  identifyUser,
  postController.getPostDetailsController,
);


// POST /api/posts/like/:postid
postRouter.post(
  "/like/:postId",
  identifyUser,
  postController.likePostController,
);


// GET / api / posts / feed
postRouter.get("/feed", identifyUser, postController.getFeedController);

module.exports = postRouter;
