import { createClient } from '@supabase/supabase-js';

/**
 * A RESTful endpoint for querying and managing your database.
 */
const supabaseUrl = 'https://blkkbjftbalvlszarrqw.supabase.co';

/**
 * This key is safe to use in a browser if you have enabled Row Level Security for your tables and
 * configured policies.
 */
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMDM2NTI5MywiZXhwIjoxOTQ1OTQxMjkzfQ.y6iZ9WEnwuLMywbaY1O3xvFLlwohuX3cvkkfzoiI37A';

/**
 * Creates a new supabase client.
 *
 * @see https://supabase.io/docs/guides/with-nextjs
 */
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
