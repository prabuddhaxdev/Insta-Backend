const express = require('express');
const userModel = require('../models/user.models');

const authRouter = express.Router();

authRouter.post('/register', async(req,res) => {
    const { email, username, password, bio, profileImage} = req.body

    const isUserExistsByEmail = await userModel.findOne({ email })

    if(isUserExistsByEmail){
        return res.status(409).json({
            message:"User already exists with same email"
        }
        )
    }

    const isUserExistsByUsername = await userModel.findOne({ username });

    if (isUserExistsByUsername) {
      return res.status(409).json({
        message: "User already exists with same username",
      });
    }

})