// app/articles/layout.tsx
import Link from 'next/link';

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
  
      <aside className="w-64 bg-gray-100 p-4">
        <h2 className="text-xl font-bold mb-4">Danh Mục Bài Viết</h2>
        <ul>
          <li><Link href="/articles">Tất Cả</Link></li>
          <li><Link href="/articles/category1">Chuyên Mục 1</Link></li>
          <li><Link href="/articles/category2">Chuyên Mục 2</Link></li>
        </ul>
      </aside>
    
      <div className="flex-1 p-4">
        {children}
      </div>
    </div>
  )
}