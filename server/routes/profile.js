const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const User = require('../models/User')
const Profile = require('../models/Profile')
const Post= require('../models/Post')
const {check,validationResult, body} = require('express-validator')
const request = require('request');
const config = require('config');

const upload = require('../utils/multer')
//File Handler
const bufferConversion = require('../utils/bufferConversion')
const cloudinary = require('../utils/cloudinary')

//@route GET api/profile/me
//description get current users profile
//@access public
router.get('/me',auth, async (req,res) => {
  
 try {
    const user = await User.findOne({name : req.user.name}).populate('posts')
    console.log(user)
     const profile = await  Profile.findOne({user : req.user.id}).populate(
         'user',
         ['name','pic']
     ).populate('posts' , ['imgUrl' ,'text'])
 //  console.log(profile)
     if(!profile){
         return res.status(400).json({ msg : 'There is no profile for this user'})
     }

     let obj = { profile , post: user.posts}

     res.json(obj)
     
 } catch (err) {
     console.log(err.message)
     res.status(500).send('server error')
 }

})

//@route GET api/profile/me
//description create or update user profile
//@access private

router.post('/',[auth, [
check('status','Status is required').not().isEmpty(),
check('bio','Bio  is required').not().isEmpty()
]
],
 async (req,res)=> {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array()})
  }

const {
    location,bio,status
     
} = req.body;

//build profile object
const profileFields = {};
profileFields.user = req.user.id;
if(location) profileFields.location = location;
if(bio) profileFields.bio = bio;
if(status) profileFields.status = status;


try {
    let profile = await Profile.findOne({ user : req.user.id})
    if(profile) {
        //update
        profile = await Profile.findOneAndUpdate(
            {user : req.user.id},
            {$set: profileFields},
            {new: true,upsert: true}
        );
        return res.json(profile);
    }


        //create if not found profile
         profile = new Profile(profileFields);

         await profile.save();
         res.json(profile)
} catch (err) {
    console.log(err.message)
    res.status(500).send('server Error')
}

})

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get('/', async (req, res) => {
    try {
      const profiles = await Profile.find().populate('user', ['name', 'pic','posts']);
      res.json(profiles);
    } catch(err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

//@route GET api/profile/user/:user_id
//description get profile by user id
//@access public
router.get('/user/:user_id', auth, async (req,res) => {
    try {
      
     const posts = await Post.find({user : req.params.user_id})
    //console.log(posts)

        const profile = await Profile.findOne({user : req.params.user_id})
        .populate('user', ['name', 'pic','posts'])

         if(!profile)
          return res.status(400).json({msg:'There is no profile for this user'})
          let obj = { profile ,posts}

        res.json(obj)
        
    } catch (err) {
        console.log(err.message);
        if(err.kind == 'ObjectId') {
            return res.status(400).json({msg:"Profile Not found"})
        }
        res.status(500).send('server error')
        
    }
})

//@route GET api/profile/
//description delete profile, user and posts 
//@access public
router.delete('/', auth, async (req, res) => {
    try {
      // Remove user posts
      await Post.deleteMany({ user: req.user.id });
      // Remove profile
      await Profile.findOneAndRemove({ user: req.user.id });
      // Remove user
      await User.findOneAndRemove({ _id: req.user.id });
  
      res.json({ msg: 'User deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


//search users
router.post('/searchusers',(req,res) => {
    let userPattern = new RegExp("^"+req.body.query)
    User.find({email:{$regex:userPattern}})
    .select("_id email name")
    .then(user => {
        res.json({user})
    }).catch(err => {
        console.log(err)
    })
})



module.exports = router;