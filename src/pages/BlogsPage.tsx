const BlogsPage = () => {
  const blogs = [
    {
      id: 1,
      title: "Home Loan Interest Rates: What You Need to Know in 2024",
      excerpt: "Understanding the current market trends and how to get the best rates for your home loan.",
      date: "March 15, 2024",
      category: "Interest Rates",
      image: "/modern-house-with-financial-charts-overlay.png",
    },
    {
      id: 2,
      title: "First-Time Home Buyer's Guide: Complete Checklist",
      excerpt: "Everything you need to know before applying for your first home loan.",
      date: "March 10, 2024",
      category: "Home Buying",
      image: "/young-couple-looking-at-house-plans.png",
    },
    {
      id: 3,
      title: "Balance Transfer vs Refinancing: Which is Better?",
      excerpt: "Compare the benefits and drawbacks of balance transfer and refinancing options.",
      date: "March 5, 2024",
      category: "Refinancing",
      image: "/calculator-and-documents-on-desk.png",
    },
    {
      id: 4,
      title: "Tax Benefits on Home Loans: Maximize Your Savings",
      excerpt: "Learn about Section 80C and 24B deductions to save more on your home loan.",
      date: "February 28, 2024",
      category: "Tax Benefits",
      image: "/tax-forms-and-calculator.png",
    },
    {
      id: 5,
      title: "Credit Score Impact on Home Loan Approval",
      excerpt: "How your credit score affects your loan eligibility and interest rates.",
      date: "February 20, 2024",
      category: "Credit Score",
      image: "/credit-score-report-with-house-icon.png",
    },
    {
      id: 6,
      title: "Pre-approved Home Loans: Advantages and Process",
      excerpt: "Why getting pre-approved can give you an edge in the home buying process.",
      date: "February 15, 2024",
      category: "Pre-approval",
      image: "/approved-stamp-on-loan-documents.png",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-basic-dark mb-4">Home Loan Insights & Tips</h1>
          <p className="text-center text-basic-gray mb-12">
            Stay updated with the latest trends, tips, and guides for home loans
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img src={blog.image || "/placeholder.svg"} alt={blog.title} className="w-full h-48 object-cover" />

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-basic-blue text-white px-3 py-1 rounded-full text-xs font-medium">
                      {blog.category}
                    </span>
                    <span className="text-basic-gray text-sm">{blog.date}</span>
                  </div>

                  <h2 className="text-xl font-semibold text-basic-dark mb-3 line-clamp-2">{blog.title}</h2>

                  <p className="text-basic-gray text-sm mb-4 line-clamp-3">{blog.excerpt}</p>

                  <button className="text-basic-blue hover:text-blue-600 font-medium text-sm transition-colors">
                    Read More →
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-basic-blue hover:bg-blue-600 text-white px-8 py-3 rounded font-medium transition-colors">
              Load More Articles
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogsPage
