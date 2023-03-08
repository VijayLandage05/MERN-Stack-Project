const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

//bcryptjs for password protection
const bcrypt = require("bcryptjs")

//jsonwebtoken for session
const jwt = require("jsonwebtoken")

//jwtSecret for signature 
const jwtSecret = "MyNmaeisVijayLandage"

// to create new user and hit api
router.post("/createuser", [
    body('email', 'Please enter valid email').isEmail(),
    body('name').isLength({ min: 5 }),
    // password must be at least 5 chars long
    body('password', 'Incorrect Password').isLength({ min: 5 })],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //to secure password
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt)

        try {
            await User.create({
                name: req.body.name,
                // password: req.body.password,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true });

        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })

// to check credentials of user with backend databse
router.post("/loginuser", [
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password', 'Incorrect Password').isLength({ min: 5 })]
    , async (req, res) => {

        //For validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //to return document with matching email from database  
        let email = req.body.email;
        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Try logging in with correct credentials" });
            }

            //compare bcrypt password with user password
            const pwdComapre = await bcrypt.compare(req.body.password, userData.password)

            //to return document with matching password with enterd passwrord from database
            if (!pwdComapre) {
                return res.status(400).json({ errors: "Try logging in with correct credentials" });
            }

            const data = {
                user:{
                    id:userData.id
                }
            }

            //for generating authorization token
            const authToken = jwt.sign(data, jwtSecret)

            //if email and password matched return success:true
            return res.json({ success: true, authToken:authToken});

        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })

module.exports = router;