// Simple in-memory blog data used for listing and detail pages
export type BlogPost = {
  id: string
//   slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  image: string
  content: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    // slug: "sbi-mclr-base-rate-2025-guide",
    title: "SBI MCLR Base Rate 2025: The Complete Beginner’s Guide",
    excerpt:
      "Understand SBI’s MCLR and Base Rate in 2025, learn the key factors, check examples, and practical steps to plan your home loan better.",
    category: "MCLR BASE RATE",
    date: "28 Aug 2025",
    readTime: "8 min read",
    image: "/featured-blog-image.png",
    content:
      "This guide explains how MCLR works, its impact on your EMI, and how to compare offers from different lenders. We also cover tips to reduce total interest and nuances between base rate and MCLR with examples...",
  },
  {
    id: "2",
    // slug: "foir-calculation-for-home-loans",
    title: "FOIR Calculation for Home Loans: Why It Matters for Your Loan Approval",
    excerpt:
      "A walkthrough of FOIR (Fixed Obligations to Income Ratio), how to compute it, and what lenders typically expect.",
    category: "FOIR in Home Loans",
    date: "19 Aug 2025",
    readTime: "6 min read",
    image: "/foir-illustration.png",
    content:
      "FOIR is a key metric lenders use to determine repayment capacity. We explain formulas, examples, and practical steps to improve your FOIR before applying.",
  },
  {
    id: "3",
    // slug: "home-loan-tenure-prepayment-guide",
    title: "How Loan Tenure/Prepayment Impacts What Homeowners Should Know",
    excerpt:
      "See how changing tenure or making prepayments influences total interest and EMI. Includes simple math and scenarios.",
    category: "EMI / Tenure",
    date: "10 Aug 2025",
    readTime: "7 min read",
    image: "/emi-tenure-chart.png",
    content:
      "Prepayment strategies can meaningfully reduce your interest outgo. This article discusses part prepayment vs. tenure reduction vs. EMI reduction, with pros/cons for each approach.",
  },
]
