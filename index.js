const { createClient } = require('@supabase/supabase-js')
const express = require('express')
const cors = require('cors');
const projects = require("./projects.json")
const app = express()

const port = process.env.PORT || 3000

const allowedOrigins = [
  'http://localhost:5173',
  'https://rerender-two.vercel.app',
]
const NEXT_PUBLIC_SUPABASE_URL = "https://onriwqfpnzldrvjehhgj.supabase.co"
const NEXT_PUBLIC_SUPABASE_ANON_KEY = "sb_publishable_vaZTIaMhECO-8qXk-M8SdA_05rdUgJ_"

const supabase = createClient(
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function getUsers() {
  const { data, error } = await supabase
    .from('projekty')
    .select('*')

  if (error) {
    console.error(error)
    return
  }

  return (data)
}

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
      return
    }

    callback(new Error('Not allowed by CORS'))
  }
}));

app.get('/', async (req, res) => {
  const projekts = await getUsers()
  res.send(projekts)
  console.log("test")
})

app.get("/projects", async (req, res) => {
  const projekts = await getUsers()
  res.send(projekts)
})

app.post("/project", async (req, res) => {
  const { data, error } = await supabase
    .from('projekty')
    .insert([
      projects[1]
    ])
    .select()


  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.status(201).json(data)
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
