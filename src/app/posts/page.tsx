export async function generateMetadata() {
    return {
      title: 'Các Bài Viết',
      description: 'Danh sách các bài viết',
    }
  }
  
  async function getArticles() {
    return [
      { slug: 'article-1', title: 'Article 1' },
      { slug: 'article-2', title: 'Article 2' }
    ]
  }
  
  export default async function ArticlesPage() {
    const articles = await getArticles()
  
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">Các Bài Viết</h1>
        <ul>
          {articles.map(article => (
            <li key={article.slug}>
              <a
                className="text-blue-500 hover:underline"
                href={`/articles/${article.slug}`}
              >
                {article.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }