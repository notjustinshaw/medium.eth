import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import supabase from '../supabase/SupabaseClient'

export async function getFrontPageArticles() {
  const articleIds = await supabase
    .storage
    .from('articles')
    .list('public', {
      limit: 5,
      offset: 0,
      sortBy: { column: 'last_accessed_at', order: 'desc' },
    })
    .then(({data, error}) => {
      if (error) return []
      return data.map((article: any) => article.name.replace(/\.md$/, '') as string)
    })
  const getArticle = async (id: string) => {
    return await supabase
    .storage
    .from('articles')
    .download(`public/${id}.md`)
    .then(async ({data, error}) => {
      if (error) return ''
      const fileContents = await data.text()
      const matterResult = matter(fileContents)
      return { id, ...matterResult.data }
    })
  }
  const articles = await Promise.all(articleIds.map(getArticle))
  return articles
}
    
export async function getArticlePaths(): Promise<string[]> {
  return supabase
    .storage
    .from('articles')
    .list('public')
    .then(({data, error}) => {
      if (error) return []
      return data.map((article: any) => article.name.replace(/\.md$/, ''))
    })
}

export async function getArticleById(id: string) {
  const fileContents = await supabase
    .storage
    .from('articles')
    .download(`public/${id}.md`)
    .then(async ({data, error}) => {
      if (error) return ''
      return await data.text()
    })

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}
