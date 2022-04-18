const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  useremail: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  userpassword: {
    type: String,
    required: true
  },
  CheckValue: {
    type: Boolean,
    required: true,
  },
  authentication:{
    type: Boolean,
    required: true,
    default: false
  }

}, {
  collection: 'users'
})

const model = mongoose.model('UserSchema', UserSchema)

module.exports = model