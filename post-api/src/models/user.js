const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

userSchema.pre('save', async function(next){
  if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 8)
  }

  next()
})

userSchema.methods.generateAuthToken = async function(){
  const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET)
  return token
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  if(!user){
    throw new Error('Email does not exist')
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if(!isMatch){
    throw new Error('Email and password does not match')
  }
  return user
}

const User = mongoose.model('User', userSchema)

module.exports = User