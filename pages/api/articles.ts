import type { NextApiRequest, NextApiResponse } from 'next'
import supabase from '../../lib/supabase/SupabaseClient'

// On a GET request, download the article with the given id and return it as JSON
export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' })
  } else if (!req.query.id) {
    res.status(400).json({ error: 'Bad Request' })
  } else { 
    
  }
}