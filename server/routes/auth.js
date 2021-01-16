const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const User = require('../models/User')
const Post= require('../models/Post')
const { check,validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcryptjs')




//@route GET api/auth
//description auth route
//@access public
router.get('/', auth, async(req,res) => {

    try {
        const user = await User.findById(req.user.id).select('-password')
        console.log(user)
        res.json(user)
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send('server error')
        
    }
    
});

//@route post api/users
//description Authenticate user  route
//@access public
router.post('/',[

    check('email', 'Please include a valid email').isEmail(),
    check('password','Password is required').exists()
],
async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
      
    const { email, password } = req.body;

    try {
         //see if user exist 
         let user = await User.findOne({email});
         if(!user){
             return res.status(400).json({errors: [{ msg :'invalid credentials'}]})
         }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({errors: [{ msg :'invalid credentials'}]})
        }
   
     //Return jsonwebtoken
     const payload = {
         user :{
             id:user.id,
             name:user.name,
             email:user.email,
             phone:user.phone,
             posts:user.posts
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


router.get('/getUserPost', auth,  async (req, res) => {
    try {
        
        const allPosts = await Post.find({user : req.params.user_id})
    console.log(allPosts)
        if (allPosts.length === 0) {
            return res.status(200).json({ msg:'There is no posts for this user' })
           
        }
        res.json(allPosts)

    } catch (err) {
        console.log(err.message);
        if(err.kind == 'ObjectId') {
            return res.status(400).json({msg:"Posts Not found"})
        }
        res.status(500).send('server error')
        
    }
})

module.exports = router;