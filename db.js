const { createClient } = require('@supabase/supabase-js');

const { SUPABASE_URL, SUPABASE_ANON_KEY } = process.env;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    'Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variable(s) — check your .env file.'
  );
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

module.exports = supabase;
