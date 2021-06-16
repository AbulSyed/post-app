const express = require('express')
require('./db/db.js')
const cors = require('cors')
const userRouter = require('./router/user')
const postRouter = require('./router/post')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(cors())

app.use(userRouter)
app.use(postRouter)

app.listen(port, () => {
  console.log('Server running on port', port)
})