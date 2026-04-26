import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, LogOut } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) =>
    location.pathname === path
      ? "bg-purple-600 text-white"
      : "text-gray-400 hover:bg-white/10 hover:text-white";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  return (
    <div className="w-64 bg-black/80 backdrop-blur-lg p-6 min-h-screen flex flex-col justify-between">

      {/* 🔝 TOP */}
      <div>
        <h1 className="text-2xl font-bold mb-10 text-purple-400 tracking-wide">
          Shopora Admin
        </h1>

        <div className="space-y-3">

          <Link
            to="/admin/dashboard"
            className={`flex items-center gap-3 p-3 rounded-lg transition ${isActive(
              "/admin/dashboard"
            )}`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link
            to="/admin/products"
            className={`flex items-center gap-3 p-3 rounded-lg transition ${isActive(
              "/admin/products"
            )}`}
          >
            <Package size={18} />
            Products
          </Link>

          <Link
            to="/admin/orders"
            className={`flex items-center gap-3 p-3 rounded-lg transition ${isActive(
              "/admin/orders"
            )}`}
          >
            <ShoppingCart size={18} />
            Orders
          </Link>

        </div>
      </div>

      {/* 🔻 BOTTOM */}
      <div>
        <button
          onClick={logout}
          className="flex items-center gap-3 p-3 w-full text-red-400 hover:bg-red-500/10 rounded-lg transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

    </div>
  );
}