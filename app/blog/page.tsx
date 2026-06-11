import React from 'react'
import Link from 'next/link'
import { Search, Calendar, ArrowRight, BookOpen, TrendingUp } from 'lucide-react'
import { getBlogPosts, getBlogCategories, searchBlogPosts } from '@/lib/sanity'

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>
}) {
  const { q, category } = await searchParams
  
  let posts = await getBlogPosts()
  const categories = await getBlogCategories()

  if (q) {
    posts = await searchBlogPosts(q)
  } else if (category) {
    posts = await client.fetch(
      `*[_type == "blogPost" && status == "published" && references(^)_@.slug.current == $category]`,
      { category }
    )
  }

  return (
    <div className="min-h-screen bg-secondary pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <BookOpen className="text-primary" size={32} />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-4">Travel Stories & Insights</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tips, guides, and personal accounts from explorers around the world.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/blog"
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                !category && !q ? 'bg-primary text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-primary'
              }`}
            >
              All Stories
            </Link>
            {categories.map((cat: any) => (
              <Link
                key={cat._id}
                href={`/blog?category=${cat.slug.current}`}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  category === cat.slug.current ? 'bg-primary text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-primary'
                }`}
              >
                {cat.title}
              </Link>
            ))}
          </div>

          <form action="/blog" className="relative w-full md:w-auto">
            <input
              name="q"
              type="text"
              placeholder="Search articles..."
              className="w-full md:w-64 pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </form>
        </div>

        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <article key={post._id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-100">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${post.mainImage ? post.mainImage.asset._ref : 'placeholder'}-jpg`}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wider">
                      {post.category?.title || 'General'}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 text-gray-400 text-xs mb-3">
                    <Calendar size={14} />
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    <span className="text-gray-300">•</span>
                    <span>{post.author}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-3 hover:text-primary-dark transition-colors">
                    <Link href={`/blog/${post.slug.current}`}>{post.title}</Link>
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug.current}`}
                    className="mt-auto flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all"
                  >
                    Read More <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="flex justify-center mb-4">
              <BookOpen size={48} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-medium text-gray-400">No stories found. Check back later!</h3>
          </div>
        )}
      </div>
    </div>
  )
}
