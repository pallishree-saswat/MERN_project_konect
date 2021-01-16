const mongoose = require('mongoose')
const { Schema } = mongoose

const commentSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'post'
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    pic:{
        type:String,
    },
    commentedBy:  {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})


module.exports = mongoose.model('comment', commentSchema)