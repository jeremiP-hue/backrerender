const express = require('express')
const cors = require('cors');
const projects = require("./projects.json")
const app = express()

const port = process.env.PORT || 3000

const allowedOrigins = [
  'http://localhost:5173',
  'https://rerender-two.vercel.app',
]

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
      return
    }

    callback(new Error('Not allowed by CORS'))
  }
}));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/projects", (req, res) => {
    res.send(projects)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
