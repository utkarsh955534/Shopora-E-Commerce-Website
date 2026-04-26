import { ShoppingCart, User, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white/5 backdrop-blur-md sticky top-0 z-50 text-white">

      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-purple-400">
        Shopora
      </Link>

      {/* Links */}
      <div className="hidden md:flex gap-6 items-center">
        <Link to="/" className="hover:text-purple-400 transition">
          Home
        </Link>
        <Link to="/dashboard" className="hover:text-purple-400 transition">
          Products
        </Link>
        <Link to="/deals" className="hover:text-purple-400 transition">
          Deals
        </Link>
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center bg-white/10 px-3 py-1 rounded-lg">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none ml-2 text-sm text-white"
        />
      </div>

      {/* Icons */}
      <div className="flex gap-4 items-center">

        <Link to="/login">
          <User className="cursor-pointer hover:text-purple-400 transition" />
        </Link>

        <Link to="/cart">
          <ShoppingCart className="cursor-pointer hover:text-purple-400 transition" />
        </Link>

      </div>

    </nav>
  );
}