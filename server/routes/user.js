const express = require('express');
const router = express.Router();
const { check,validationResult} = require('express-validator')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middleware/auth')
const upload = require('../utils/multer')
//File Handler
const bufferConversion = require('../utils/bufferConversion')
const cloudinary = require('../utils/cloudinary')
//Email
const sendEmail = require('../utils/nodemailer')

//validation
const validateOTP = require('../validation/otpValidation')
const validateForgotPassword = require('../validation/forgotPassword')
const validateUserUpdatePassword = require('../validation/updatePassword')

 //@route post api/users
//description signup route
//@access public

router.post('/',[
    check('name','Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password','Please enter a password with 6 or more characters').isLength({min : 6}),
    check('phone','Please enter a phone number with 10 digits').isLength(10)
],
async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
      
    const { name, email, password, phone } = req.body;

    try {
         //see if user exist 
         let user = await User.findOne({email});
         if(user){
             return res.status(400).json({errors: [{ msg :'User already exists'}]})
         }
       
    
     user = new User({
        name,email,phone,password
     })

     //Encrypt password

     const salt = await bcrypt.genSalt(10);
     user.password = await bcrypt.hash(password,salt)
       
     await user.save(); 


     //Return jsonwebtoken
     const payload = {
         user :{
             id:user.id,
             name:user.name,
             email:user.email,
             phone:user.phone,
             
         
         }
     }

     jwt.sign(
     payload, 
    config.get('jwtSecret'),
     {expiresIn:360000},
     (err, token) => {
         if(err) throw err;
         res.json({token})
     });

    } catch (err) {
        console.log(err.message);
        res.status(500).send('server error')
        
    }


    
})

router.post('/forgotPassword', async (req, res, next) => {
    try {
        const { errors, isValid } = validateForgotPassword(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }
        const { email } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            errors.email = "Email Not found, Provide registered email"
            return res.status(400).json(errors)
        }
        function generateOTP() {
            var digits = '0123456789';
            let OTP = '';
            for (let i = 0; i < 6; i++) {
                OTP += digits[Math.floor(Math.random() * 10)];
            }
            return OTP;
        }
        const OTP = await generateOTP()
        user.otp = OTP
        await user.save()
        await sendEmail(user.email, OTP, "OTP")
        res.status(200).json({ message: "check your registered email for OTP" })
        const helper = async () => {
            user.otp = ""
            await user.save()
        }
        setTimeout(function () {
            helper()
        }, 300000);
    }
    catch (err) {
        console.log("Error in sending email", err.message)
        return res.status(400).json({ message: `Error in generateOTP${err.message}` })
    }
})

router.post('/changePassword', async (req, res, next) => {
    try {
        const { errors, isValid } = validateOTP(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }
        const { email, otp, newPassword, confirmNewPassword } = req.body
        if (newPassword !== confirmNewPassword) {
            errors.confirmNewPassword = 'Password Mismatch'
            return res.status(400).json(errors);
        }
        const user = await User.findOne({ email });

        if (user.otp === "") {
            errors.otp = "OTP has expired"
            return res.status(400).json(errors)
        }
        if (user.otp !== otp) {

            errors.otp = "Invalid OTP, check your email again"
            return res.status(400).json(errors)
        }
        let hashedPassword;
        hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword;
        await user.save()
        return res.status(200).json({ message: "Password Changed" })
    }
    catch (err) {
        console.log("Error in submitting otp", err.message)
        return res.status(400).json({ message: `Error in postOTP${err.message}` })
    }
})

router.post('/updatePassword', auth , async (req, res, next) => {
    try {
       
        const { email, oldPassword, newPassword, confirmNewPassword } = req.body
        if (newPassword !== confirmNewPassword) {
            errors.confirmNewPassword = 'Password Mismatch'
            return res.status(404).json(errors);
        }
        const user = await User.findOne({ email })
        const isCorrect = await bcrypt.compare(oldPassword, user.password)
        if (!isCorrect) {
            errors.oldPassword = 'Invalid old Password';
            return res.status(404).json(errors);
        }
        let hashedPassword;
        hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword;
        await user.save()
        res.status(200).json({ message: "Password Updated" })
    }
    catch (err) {
        console.log("Error in updating password", err.message)
        return res.status(400).json({ message: `Error in updatePassword${err.message}` })
    }
})


//update profile pic
router.put("/uploadpic",auth, upload.single('pic'), async(req,res) => {
 
    try {
        const pic = await bufferConversion(req.file.originalname, req.file.buffer)
        const imgResponse = await cloudinary.uploader.upload(pic)
        let user = User.findOne({ user : req.user.id})

        if(user) {
            user = await User.findByIdAndUpdate({
                pic : imgResponse.secure_url
              } );
            return res.json(user);
        }
        
              await  user.save()
              res.json(user)
              console.log("uploadpic", user)
        
    } catch (err) {
        console.log(err.message)
        
    }
})

module.exports = router;