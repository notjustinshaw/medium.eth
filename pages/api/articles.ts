import type { NextApiRequest, NextApiResponse } from 'next'
import supabase from '../../lib/supabase/SupabaseClient'

// On a GET request, download the article with the given id and return it as JSON
export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await supabase
      .storage
      .from('articles')
      .list('public')
      .then(async ({data, error}) => {
        if (error) {
          return res.status(500).json({ error: 'Internal Server Error' })
        }
        res.status(200).json(data)
      })
  } else if (req.method === 'POST') {
    if (!req.body) {
      return res.status(400).json({ error: 'Invalid Request.' })
    }
    const {title, article} = JSON.parse(req.body)
    if (!title || !article) {
      return res.status(400).json({ error: 'Title and article are required!' })
    }
    const articleID = title.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()
    const date = new Date().toISOString().split('T')[0]
    const frontMatter = `---\ntitle: "${title}"\ndate: "${date}"\n---\n\n`
    const articleWithFrontMatter = frontMatter.concat(article)
    await supabase
      .storage
      .from('articles')
      .upload(`public/${articleID}.md`, articleWithFrontMatter)
      .then(async ({data, error}) => {
        if (error) {
          return res.status(500).json({ error: 'Internal Server Error' })
        }
        res.status(201).json({ data: {articleId: articleID} })
      })
  } else {
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}