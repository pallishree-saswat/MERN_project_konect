const mongoose = require('mongoose')
const { Schema } = mongoose


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone :{
        type:Number,
        required:true
       
    },
    password: {
        type: String,
        required: true
    },
    
    pic:{
            type:String
         /*    default:"https://res.cloudinary.com/pallishree-saswat/image/upload/v1598449001/default_jp1mhw.png" */
       }
,
posts: [
    {
       type: Schema.Types.ObjectId,
       ref: 'post'
   }
],
text:{
    type:String
}
    
})


module.exports = mongoose.model('user', userSchema)