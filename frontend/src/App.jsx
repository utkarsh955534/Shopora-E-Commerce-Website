import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="bg-[#0f0f1a] text-white min-h-screen">
      <BrowserRouter>
        
        <Navbar />

        <Routes>
          {/* 🔓 Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* 🔒 Protected Routes (Grouped) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>

          {/* ❌ Optional: 404 Route */}
          <Route path="*" element={<h1 className="p-10 text-xl">Page Not Found</h1>} />
        </Routes>

        {/* 🔔 Toast Notification */}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          theme="dark"
        />

      </BrowserRouter>
    </div>
  );
}

export default App;