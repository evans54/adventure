import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, ArrowLeft, User, Share2 } from 'lucide-react'
import { getBlogPostBySlug } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Link 
            href="/blog" 
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {post.category?.title || 'General'}
            </span>
            <span className="text-gray-400 text-sm flex items-center gap-1">
              <Calendar size={14} /> {new Date(post.publishedAt).toLocaleDateString()}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between py-6 border-y border-gray-100 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-primary font-bold">
                {post.author?.[0].toUpperCase() || 'A'}
              </div>
              <div>
                <p className="text-sm font-bold text-primary">{post.author}</p>
                <p className="text-xs text-gray-500">Author</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-primary">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="relative aspect-video rounded-3xl overflow-hidden mb-12">
          <img
            src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${post.mainImage ? post.mainImage.asset._ref : 'placeholder'}-jpg`}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
          <PortableText value={post.content} />
        </div>
      </div>
    </div>
  )
}
