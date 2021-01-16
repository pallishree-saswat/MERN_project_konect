const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },

  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
 
  bio: {
    type: String
  },
 
  date: {
    type: Date,
    default: Date.now
  },
  handle: {
    type: String,
    required: false,
    max: 40
},
posts:{
  type: Schema.Types.ObjectId,
  ref: 'post'
}

});

module.exports = Profile = mongoose.model('profile', ProfileSchema);