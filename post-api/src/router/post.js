const express = require('express')
const router = new express.Router()
const Post = require('../models/post')
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

router.post('/post', async (req, res) => {
  try {
    const post = new Post({
      owner: req.user._id,
      name: req.user.name,
      img: req.body.img,
      desc: req.body.desc,
      filePath: req.body.filePath
    })
    await post.save()
    res.status(200).send(post)
  }catch(err){
    res.status(422).send(err.message)
  }
})

router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find({})
    res.status(200).send(posts)
  }catch(e){
    res.status(400).send()
  }
})

router.get('/profileposts', async (req, res) => {
  try {
    const posts = await Post.find({ owner: req.user._id })
    res.status(200).send(posts)
  }catch(e){
    res.status(400).send()
  }
})

router.delete('/posts/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const post = await Post.findOneAndDelete({ _id, owner: req.user._id })
    if(!post){
      return res.status(404).send()
    }
    res.status(200).send(post)
  }catch(e){
    res.status(400).send()
  }
})

module.exports = router