const mongoose = require('mongoose')
const { Schema } = mongoose


const postSchema = new Schema({
    text: {
        type: String,
        required: true
    },

    imgUrl: {
        type: String,
       // required: true
    },
    name:{
        type:String
    },
    pic:{
        type:String,
    },
  
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    likes:[
        {
            user:{
                type: Schema.Types.ObjectId,
                ref:'user'
            }
        }
    ],
    comments:[
        {
            user:{
                type: Schema.Types.ObjectId,
                ref:'user' 
            },
            text:{
                type:String,
                required:true
            },
            name:{
                type:String
            },
            pic:{
                type:String,
            },
       
            date:{
                type:Date,
                default:Date.now
            }
        }
    ],
    date:{
        type:Date,
        default:Date.now
    }

})


module.exports = mongoose.model('post', postSchema)