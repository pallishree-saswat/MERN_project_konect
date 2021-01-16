const express = require('express');
const router = express.Router();
const { check, validationResult} = require('express-validator')
const auth = require('../middleware/auth')

const Post = require('../models/Post')

const User = require('../models/User')

const upload = require('../utils/multer')
//File Handler
const bufferConversion = require('../utils/bufferConversion')
const cloudinary = require('../utils/cloudinary')
//Email
const sendEmail = require('../utils/nodemailer')

//@route POST api/posts
//description create a post 
//@access private
router.post('/' ,auth, upload.single('imgUrl'), async (req,res) => {
    try {
        /* console.log(req.body)
        res.send("successs") */
        const { text} = req.body;
            const imgUrl = await bufferConversion(req.file.originalname, req.file.buffer)
            const imgResponse = await cloudinary.uploader.upload(imgUrl)
            const user = await User.findById(req.user.id).select('-password');
            const newPost = await new Post({
               text,
             imgUrl: imgResponse.secure_url,
             name: user.name,
             pic: user.pic,
             user:req.user.id
              
            })
            
            await newPost.save()
            user.posts.push(newPost._id)
            await user.save()
             console.log(newPost)
             res.json(newPost)


    } catch (err) {
        console.log(err.message)
    }
})



//@route GET api/posts
//description get all posts 
//@access private

router.get('/',auth,async (req,res)=>{
  try {
     const posts = await Post.find().sort({ date : -1}) 
     res.json(posts)
  } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error')
  }
})

//@route GET api/posts/:id
//description get a post by ID
//@access private

router.get('/:id',auth,async (req,res)=>{
    try {
       const post = await Post.findById(req.params.id)

       if(!post) {
           return res.status(404).json({ msg : 'Post not found'})
       }

       res.json(post)
    } catch (err) {
        console.log(err.message);

        if(err.kind === 'ObjectId') {
            return res.status(404).json({ msg : 'Post not found'})
        }
        res.status(500).send('Server error')
    }
  })

  //@route DELETE api/posts/:id
//description get a post 
//@access private

router.delete('/:id',auth,async (req,res)=>{
    try {
       const post = await Post.findById(req.params.id); 

       if(!post) {
        return res.status(404).json({ msg : 'Post not found'})
    }

       //check user 

       if(post.user.toString() !== req.user.id) {
           return res.status(401).json({ msg: 'User not authorized'})
       }

       await post.remove();
       res.json({ msg :' Post removed'})
    } catch (err) {
        console.log(err.message);
        if(err.kind === 'ObjectId') {
            return res.status(404).json({ msg : 'Post not found'})
        }
        res.status(500).send('Server error')
    }
  })

  //@route PUT api/posts/like/:id
//description like a post 
//@access private
router.put('/like/:id',auth, async (req,res) => {
    try {
      const post = await Post.findById(req.params.id);

      //check if the post has already been liked
      if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) 
      {
         return res.status(400).json({msg :" post already liked"})
      }

      post.likes.unshift({ user : req.user.id})

      await post.save();
      res.json(post.likes)


    } catch (err) {
        console.log(err.message)
    res.status(500).send('Server error')        
    }
})


//@route PUT api/posts/unlike/:id
//description like a post 
//@access private
router.put('/unlike/:id',auth, async (req,res) => {
    try {
      const post = await Post.findById(req.params.id);

      //check if the post has already been liked
      if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) 
      {
         return res.status(400).json({msg :" posthas not yet been liked"})
      }

     //get remove index 
     const removeIndex = post.likes
     .map(like => like.user.toString())
     .indexOf(req.user.id);

     post.likes.splice(removeIndex, 1)

      await post.save();
      
      res.json(post.likes)


    } catch (err) {
        console.log(err.message)
    res.status(500).send('Server error')        
    }
})


//@route POST api/posts/comment/:id
//description comment on a post 
//@access private
router.post('/comment/:id',[auth , [

    check('text','Text is required').not().isEmpty()


]], async (req,res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors : errors.array()})
    }

  try {
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.id);
    
    const newComment = {
        text : req.body.text,
        name: user.name,
        pic: user.pic,
        user:req.user.id
    }
     post.comments.unshift(newComment)
     
     await post.save();

    res.json(post.comments)


  } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error')
      
  }

})

//@route POST api/posts/comment/:id/:comment_id
//description delete comment
//@access private

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
     

        //Pull out comment
        const comment = post.comments.find(comment => comment.id === req.params.comment_id)

       //make sure comment exists
       if(!comment) {
           return res.status(404).json({msg :' Comments does not exist'})
       }
     //check user
     if(comment.user.toString() !== req.user.id) {
         return res.status(401).json({msg : 'User not found'})
     }

           //get remove index 
     const removeIndex = post.comments
     .map(comment => comment.user.toString())
     .indexOf(req.user.id);

     post.comments.splice(removeIndex, 1)
     
     await post.save();

     res.json(post.comments)

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error ')
        
    }
})


//@GET get all users post
//api/post/getusersposts/userId
//@access private
router.get('/getuserspost/:userId', auth ,async (req, res, next) => {
    try {
        const { userId } = req.params
        const allPosts = await Post.find({ user: userId })
        if (allPosts.length === 0) {
            return res.status(200).json({ message: allPosts })
        }
        return res.status(200).json({ message: allPosts })

    }
    catch (err) {
        console.log("Error in getAllPost", err.message)
        return res.status(400).json({ message: `Error in getAllPost ${err.message}` })
    }
})





module.exports = router;