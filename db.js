const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Safely attempt to parse local .env if present
const envVars = {};
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  try {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split('\n').forEach(line => {
      const [key, ...values] = line.split('=');
      if (key && values.length > 0) {
        envVars[key.trim()] = values.join('=').trim().replace(/^["']|["']$/g, '');
      }
    });
  } catch (err) {
    console.warn('Could not read .env file:', err.message);
  }
}

const SUPABASE_URL = process.env.SUPABASE_URL || envVars['SUPABASE_URL'];
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || envVars['SUPABASE_ANON_KEY'];

let supabase = null;
if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (err) {
    console.warn('⚠️ Error initializing Supabase client:', err.message);
  }
} else {
  console.warn('⚠️ [Qala Labs] SUPABASE_URL or SUPABASE_ANON_KEY not set. Database features disabled until environment variables are configured.');
}

module.exports = supabase;

