import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, LogOut } from "lucide-react";

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) =>
    location.pathname === path
      ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white"
      : "text-gray-400 hover:bg-white/10 hover:text-white";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  return (
    <>
      {/* 🔲 OVERLAY (MOBILE) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 📦 SIDEBAR */}
      <div
        className={`
          fixed md:sticky top-0 left-0 z-50
          h-screen
          w-64 sm:w-72 md:w-64
          bg-gradient-to-b from-[#0f0f1a] to-[#0a0a12]
          border-r border-white/10
          p-5 sm:p-6
          flex flex-col
          overflow-y-auto
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >

        {/* 🔝 TOP */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold mb-8 sm:mb-10 text-purple-400 tracking-wide">
            Shopora Admin
          </h1>

          <div className="space-y-2 sm:space-y-3">

            <Link
              to="/admin/dashboard"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 p-2.5 sm:p-3 rounded-lg text-sm sm:text-base transition ${isActive(
                "/admin/dashboard"
              )}`}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

            <Link
              to="/admin/products"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 p-2.5 sm:p-3 rounded-lg text-sm sm:text-base transition ${isActive(
                "/admin/products"
              )}`}
            >
              <Package size={18} />
              Products
            </Link>

            <Link
              to="/admin/orders"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 p-2.5 sm:p-3 rounded-lg text-sm sm:text-base transition ${isActive(
                "/admin/orders"
              )}`}
            >
              <ShoppingCart size={18} />
              Orders
            </Link>

          </div>
        </div>

        {/* 🔻 BOTTOM */}
        <div className="mt-auto pt-6">
          <button
            onClick={logout}
            className="flex items-center gap-3 p-2.5 sm:p-3 w-full text-red-400 hover:bg-red-500/10 rounded-lg text-sm sm:text-base transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

      </div>
    </>
  );
}
