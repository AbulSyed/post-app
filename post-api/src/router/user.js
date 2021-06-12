const express = require('express')
const router = new express.Router()
const User = require('../models/user')

router.post('/users', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  }catch(err){
    if(err.code === 11000){
      res.status(400).send('Email already exists')
    }else{
      res.status(500).send('Internal network error')
    }
  }
})

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.status(200).send({ user, token })
  }catch(err){
    res.status(400).send(err.message)
  }
})

router.get('/users/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const user = await User.findOne({ _id })
    if(!user){
      return res.status(404).send()
    }
    res.status(200).send(user)
  }catch(e){
    res.status(400).send()
  }
})

module.exports = router