import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-basic-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
<Link to="/" className="flex items-center gap-2 mb-4" aria-label="BASIC Home">
            <img src="/Logo1.svg" alt="BASIC Home" className="h-14 w-auto object-cover" />
          </Link>
            <p className="text-gray-300 text-sm">Making home loans simple and accessible for everyone.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-white">
                  Home Loan
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Balance Transfer
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Loan Against Property
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-white">
                  Track Application
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Calculators
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; 2024 Basic Home Loan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
