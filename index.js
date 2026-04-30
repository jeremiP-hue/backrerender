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

app.use(express.json())

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
    .insert(
      req.body
    )
    .select()

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.status(201).json(data)
})

app.delete("/project/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("projekty")
    .delete()
    .eq("id", id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ message: "Deleted", data });
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
