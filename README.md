# 🛍️ Shopora — MERN E-Commerce Platform

Shopora is a full-stack e-commerce web application built using the **MERN stack**.
It allows users to browse products, manage cart & wishlist, place orders, and enables admins/sellers to manage products and orders.

---

## 🚀 Live Features

### 👤 User Side

* 🔐 Authentication (JWT आधारित login/register)
* 🛍️ Browse & search products
* ❤️ Wishlist system
* 🛒 Cart management
* 📦 Order placement (COD + UPI)
* 👤 Profile & order history

---

### 🛠️ Admin / Seller Side

* ➕ Add / update / delete products
* 📦 View seller-specific orders
* 🚚 Update order status (placed → shipped → delivered)
* 💰 View payment type (COD / Paid)

---

### 💳 Payment Integration

* Razorpay integration (Test Mode)
* UPI / Pay Later support
* Payment status tracking

---

## 🧱 Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios
* React Router
* Framer Motion

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Razorpay API

---

## 📁 Project Structure

```
frontend/
  src/
    pages/
    components/
    store/
    api.js

backend/
  controllers/
  models/
  routes/
  middleware/
  config/
```

---

## ⚙️ Environment Variables

Create a `.env` file inside **backend**:

```
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
ADMIN_SECRET=your_admin_secret

RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx

PORT=5000
```

---

## ▶️ Run Locally

### Backend

```
cd backend
npm install
npm start
```

---

### Frontend

```
cd frontend
npm install
npm run dev
```

---

## 🔐 Authentication Flow

* JWT token stored in `localStorage`
* Axios interceptor attaches token in headers
* Protected routes restrict unauthorized access

---

## 📌 Important API Routes

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`
* `GET /api/auth/profile`

### Products

* `GET /api/products`
* `POST /api/products` (admin)

### Orders

* `POST /api/orders`
* `GET /api/orders/my-orders`
* `GET /api/orders/seller-orders`

### Cart

* `GET /api/cart`
* `POST /api/cart`
* `DELETE /api/cart/:productId`

### Wishlist

* `GET /api/users/wishlist`
* `POST /api/users/wishlist/:productId`

---

## ⚠️ Notes

* Razorpay is in **test mode** (no real money deduction)
* UPI options may not appear on desktop (use mobile)
* Ensure `.env` is not pushed to GitHub

---

## 💡 Future Improvements

* 🔔 Real-time notifications
* 📊 Admin analytics dashboard
* ☁️ Cloudinary image upload
* ⭐ Product reviews & ratings
* 🚚 Delivery tracking

---

## 🧑‍💻 Author

**Utkarsh Mishra**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
