import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css"

// 🔐 PAGES
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import AdminRegister from "./pages/AdminRegister";

// 🔐 COMPONENTS
import AdminRoute from "./components/AdminRoute";
import Sidebar from "./components/Sidebar";

function Layout({ children }) {
  const location = useLocation();

  // 🔥 hide sidebar on login page
  const isLogin = location.pathname === "/admin/login";

  return (
    <div className="flex bg-[#0f0f1a] text-white min-h-screen">

      {!isLogin && <Sidebar />}

      <div className="flex-1 p-6">
        {children}
      </div>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>

      <Layout>
        <Routes>

          {/* 🔐 LOGIN */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* 🔓 REGISTER (PUBLIC) */}
          <Route path="/admin/register" element={<AdminRegister />} />

          {/* 🔐 PROTECTED ADMIN */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <Products />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <Orders />
              </AdminRoute>
            }
          />

          {/* 🔁 DEFAULT (ALWAYS LAST) */}
          <Route path="*" element={<AdminLogin />} />

        </Routes>
      </Layout>

      {/* 🔔 TOAST */}
      <ToastContainer position="top-right" autoClose={2000} />

    </BrowserRouter>
  );
}

export default App;