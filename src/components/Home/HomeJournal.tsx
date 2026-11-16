import Link from 'next/link'
import { Button } from '@/components/ui/button'
import SectionHeading from '@/components/site/SectionHeading'
import Reveal from '@/components/site/Reveal'
import PostCard from '@/components/News/PostCard'
import { IPost } from '@/types/post'

export default function HomeJournal({ posts }: { posts: IPost[] }) {
  if (!posts.length) return null

  return (
    <section className="section-y border-t border-line bg-washi">
      <div className="container-site">
        <SectionHeading
          title="Kiến thức và xu hướng rượu vang"
          action={
            <Button asChild variant="link">
              <Link href="/tin-tuc">Tất cả bài viết</Link>
            </Button>
          }
        />
        <div className="mt-14 grid gap-x-8 gap-y-14 md:mt-16 md:grid-cols-3">
          {posts.slice(0, 3).map((post, i) => (
            <Reveal key={post.id} delay={i * 100}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
