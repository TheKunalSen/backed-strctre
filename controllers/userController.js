const asyncHandler = require('express-async-handler');
const constants = require('../constants');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// register a user
// route = post /api/users/register
// @access public 

const registerUser = asyncHandler(async(req, res) => {
    const {username,  email, password} = req.body;
    if(!username || !email || !password) {
        res.status(constants.VALIDATION_ERROR);
        throw new Error("all field are required");
    }
    const userAvilable = await User.findOne({email});
    if(userAvilable) {
        res.status(constants.VALIDATION_ERROR);
        throw new Error("the user is already registered");
    }


    //hash passowrd
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    console.log("user created successfully");
    if(user) {
        res.status(201).json({_id:user._id, email: user.email});
    }else {
        res.status(404);
        throw new Error("User data is not valid");
    }
    res.json({message:'register the user'})
});



// login a user
// route = post /api/users/login
// @access public 

const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        res.status(constants.VALIDATION_ERROR);
        throw new Error("all fields are required");
    }
    const user  = await User.findOne({email});
    //comparing password
    if(user && (await bcrypt.compare( password,user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },

        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"}
        )
        res.status(200).json({accessToken});
    }else {
        res.status(401);
        throw new Error("email or password is not valid");
    }


   
});





// current user
// route = post /api/users/current
// @access private

const currentUser = asyncHandler(async(req, res) => {
    res.json(req.user);
});


module.exports = {registerUser, loginUser, currentUser};