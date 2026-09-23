const express = require('express')
const supabase = require('../lib/supabase')

const router = express.Router()

async function getProjects() {
  const { data, error } = await supabase
    .from('projekty')
    .select('*')

  if (error) {
    console.error(error)
    return
  }

  return data
}

router.get('/', async (req, res) => {
  const projects = await getProjects()
  res.send(projects)
})

router.get('/projects', async (req, res) => {
  const projects = await getProjects()
  res.send(projects)
})

router.post('/project', async (req, res) => {
  const { data, error } = await supabase
    .from('projekty')
    .insert(req.body)
    .select()

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.status(201).json(data)
})

router.put('/project/:id', async (req, res) => {
  const { id } = req.params

  const { data, error } = await supabase
    .from('projekty')
    .update(req.body)
    .eq('id', id)
    .select()

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.status(201).json(data)
})

router.delete('/project/:id', async (req, res) => {
  const { id } = req.params

  const { data, error } = await supabase
    .from('projekty')
    .delete()
    .eq('id', id)

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.status(200).json({ message: 'Deleted', data })
})

router.post('/contact', async (req, res) => {
  const { data, error } = await supabase
    .from('kontakty')
    .insert(req.body)
    .select()

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.status(201).json(data)
})

module.exports = router
