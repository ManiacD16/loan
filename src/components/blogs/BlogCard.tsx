// import { Link } from "react-router-dom"
import type { BlogPost } from "../data/blogs"

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="rounded-md border border-neutral-200 bg-white overflow-hidden hover:shadow-lg transition-shadow">
      {/* <Link to={`/blogs/${post.slug}`} aria-label={post.title}>
        <img
          src={post.image || "/placeholder.svg?height=160&width=280&query=blog%20image"}
          alt=""
          className="w-full h-40 object-cover"
        />
      </Link> */}
      <div className="p-4">
        <div className="flex items-center gap-2 text-[11px] text-neutral-500">
          <span className="uppercase tracking-wide">{post.category}</span>
          <span>•</span>
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
        <h3 className="mt-2 font-semibold text-neutral-900">
          {/* <Link to={`/blogs/${post.slug}`} className="hover:text-blue-600">
            {post.title}
          </Link> */}
        </h3>
        <p className="mt-1 text-sm text-neutral-600 line-clamp-3">{post.excerpt}</p>
      </div>
    </article>
  )
}
