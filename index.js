const express = require('express')
const cors = require('cors')
const rerenderRoutes = require('./routes/rerender')
const klikerRoutes = require('./routes/kliker')

const app = express()

const port = process.env.PORT || 3000

const allowedOrigins = [
  'http://localhost:5173',
  'https://rerender-two.vercel.app',
  'https://kliker-eight.vercel.app'
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

app.use(express.json())
app.use(rerenderRoutes)
app.use(klikerRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
