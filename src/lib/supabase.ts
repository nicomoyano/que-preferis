import { Database } from '@/types/Database';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rgbmwmciaabqnlzutwtc.supabase.co';
const supabaseKey =
  // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnYm13bWNpYWFicW5senV0d3RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkxMTk0MDMsImV4cCI6MjAwNDY5NTQwM30.dvd1ZObwSCrzKOvBq8W9JmyePQDCZreR9CmuD0cDMT0';
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnYm13bWNpYWFicW5senV0d3RjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4OTExOTQwMywiZXhwIjoyMDA0Njk1NDAzfQ.RSvzGWH4xWMdbObzRX_I4Bw265znwRQzaVy6JrwvB4E';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
  },
});
