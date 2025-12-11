
import { useMemo, useState } from "react"
import { BLOG_POSTS } from "../components/data/blogs"
import BlogCard from "../components/blogs/BlogCard"
// import { Link } from "react-router-dom"

export default function BlogsPage() {
  const [q, setQ] = useState("")

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    if (!query) return BLOG_POSTS
    return BLOG_POSTS.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.excerpt.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query),
    )
  }, [q])

  const featured = filtered[0]
  const sidePosts = filtered.slice(1, 3)
  const recent = filtered.slice(0, 6)

  return (
    <div className="bg-white">
      <section className="border-b border-neutral-200">
        <div className="container mx-auto px-4 py-6">
          <nav className="text-xs text-neutral-500">
            Home / <span className="text-neutral-700">Blog</span>
          </nav>
          <div className="mt-2 flex items-center justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900">Featured</h1>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search..."
              className="w-48 md:w-64 rounded border border-neutral-300 px-3 py-2 text-sm"
              aria-label="Search blog posts"
            />
          </div>

          {/* Featured block */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featured ? (
              <>
                {/* <Link
                  to={`/blogs/${featured.slug}`}
                  className="group relative rounded-md overflow-hidden border border-neutral-200 lg:col-span-2 bg-white"
                > */}
                  <img
                    src={featured.image || "/placeholder.svg?height=280&width=1000&query=featured"}
                    alt=""
                    className="w-full h-60 md:h-72 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-[11px] text-neutral-500">
                      <span className="uppercase tracking-wide">{featured.category}</span>
                      <span>•</span>
                      <span>{featured.date}</span>
                      <span>•</span>
                      <span>{featured.readTime}</span>
                    </div>
                    <h2 className="mt-2 text-lg md:text-xl font-semibold text-neutral-900 group-hover:text-blue-600">
                      {featured.title}
                    </h2>
                    <p className="mt-1 text-sm text-neutral-600 line-clamp-2">{featured.excerpt}</p>
                  </div>
                {/* </Link> */}

                <div className="space-y-4">
                  {sidePosts.map((p) => (
                    <>
                    {/* <Link
                     to={`/blogs/${p.slug}`}
                      key={p.id}
                      className="flex gap-3 rounded-md border border-neutral-200 bg-white p-3 hover:shadow-md transition-shadow"
                     > */}
                      <img
                        src={p.image || "/placeholder.svg?height=88&width=120&query=post"}
                        alt=""
                        className="w-28 h-20 object-cover rounded"
                      />
                      <div className="min-w-0">
                        <div className="text-[11px] text-neutral-500 uppercase tracking-wide">{p.category}</div>
                        <div className="text-sm font-semibold text-neutral-900 line-clamp-2">{p.title}</div>
                        <div className="mt-1 text-[11px] text-neutral-500">
                          {p.date} • {p.readTime}
                        </div>
                      </div>
                    {/* // </Link> */}
                    </>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-neutral-600">No posts found.</p>
            )}
          </div>
        </div>
      </section>

      {/* Recent posts */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="text-xl font-extrabold text-neutral-900">Recent Posts</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recent.map((p) => (
            <BlogCard key={p.id} post={p} />
          ))}
        </div>
      </section>
    </div>
  )
}
