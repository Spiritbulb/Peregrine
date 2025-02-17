
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://zcjnpyivnuvjbgtjoaam.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpjam5weWl2bnV2amJndGpvYWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1MDY2NjYsImV4cCI6MjA1NTA4MjY2Nn0.hOIqZiDuqyaFK42sdLYKVy1lUvTGIFr8odg_pB9B4ho";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-web'
    }
  }
});
