const express = require('express')
const supabase = require('../lib/supabase')

const router = express.Router()


async function getNames() {
  const { data, error } = await supabase
    .from('wyniki')
    .select('name, czas_wygranej')

  if (error) {
    console.error(error)
    return
  }

  return data
}

router.post('/wynik', async (req, res) => {
  const { name, czas_wygranej } = req.body

  const { data, error } = await supabase
    .from('wyniki')
    .insert({
      name,
      czas_wygranej,
    })
    .select()

  if (error) {


    return res.status(500).json({ error: error.message })
  }

  res.status(201).json(data)
})
router.get('/wyniki', async (req, res) => {

  const wyniki = await getNames()
  res.send(wyniki)
})


module.exports = router
