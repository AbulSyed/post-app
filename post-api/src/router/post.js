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
      desc: req.body.desc
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

module.exports = router