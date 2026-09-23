const { createClient } = require('@supabase/supabase-js')

const NEXT_PUBLIC_SUPABASE_URL = 'https://onriwqfpnzldrvjehhgj.supabase.co'
const NEXT_PUBLIC_SUPABASE_ANON_KEY = 'sb_publishable_vaZTIaMhECO-8qXk-M8SdA_05rdUgJ_'

const supabase = createClient(
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY
)

module.exports = supabase
