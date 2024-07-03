const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config()
const User = require('../../models/user/User');



const registerUser = async(req,res) =>{
    const {name , email , password , isAdmin} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({
                error : 'User Already Exist!'
            })
        }

        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = await User.create({
            name , email, password : hashedPassword, isAdmin :isAdmin || false
        })

        await newUser.save()

        const token = await jwt.sign({userId : newUser._id},process.env.jwt_secret,{expiresIn :'5hr'})

        res.status(201).json({
            message : "User created successfully",
            token
        })
        
    } catch (error) {
        console.log('[USER_REGISTERATION_ERROR]',error)
        console.log(error.message)
        
        
    } 


}

module.exports = {registerUser}