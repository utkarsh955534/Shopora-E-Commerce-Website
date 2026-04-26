import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import API from "../api";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const product = state;

  const [payment, setPayment] = useState("COD");
  const [address, setAddress] = useState("");

  if (!product) {
    return <p className="text-white p-6">No product selected 😢</p>;
  }

  // 🔥 LOAD RAZORPAY SCRIPT
  const loadScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      document.body.appendChild(script);
    });
  };

  // 🔥 CREATE ORDER (COMMON FUNCTION)
  const createOrderInDB = async () => {
    await API.post("/orders", {
      items: [
        {
          product: product._id,
          quantity: 1,
        },
      ],
      totalPrice: product.price,
      paymentMethod: payment,
      address,
    });
  };

  // 💳 HANDLE UPI PAYMENT
  const handleUPIPayment = async () => {
    const loaded = await loadScript();

    if (!loaded) {
      toast.error("Razorpay failed ❌");
      return;
    }

    try {
      const { data } = await API.post("/payment/create-order", {
        amount: product.price,
      });

      const options = {
  key: "rzp_test_SiC2F3egmQcWOO",
  amount: data.amount,
  currency: "INR",
  order_id: data.id,

  name: "Shopora",
  description: product.name,

  handler: async function (response) {
    await createOrderInDB();
    toast.success("Payment Successful 🎉");
    navigate("/profile");
  },

  // 🔥 ONLY THIS (simple)
  method: {
    upi: true
  },

  theme: {
    color: "#7c3aed",
  },
};

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (err) {
      console.error(err);
      toast.error("Payment failed ❌");
    }
  };

  // 🛒 PLACE ORDER (MAIN)
  const placeOrder = async () => {
    if (!address) {
      toast.error("Enter address ❌");
      return;
    }

    if (payment === "COD") {
      try {
        await createOrderInDB();
        toast.success("Order placed 🎉");
        navigate("/profile");
      } catch {
        toast.error("Order failed ❌");
      }
    }

    if (payment === "UPI") {
      handleUPIPayment();
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white p-6">

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">

        {/* PRODUCT */}
        <div className="bg-white/5 p-4 rounded-xl">
          <img src={product.image} className="rounded-lg" />
          <h2 className="mt-2 text-xl">{product.name}</h2>
          <p className="text-purple-400">₹{product.price}</p>
        </div>

        {/* CHECKOUT */}
        <div className="bg-white/5 p-6 rounded-xl">

          <h2 className="text-2xl mb-4">Checkout</h2>

          {/* ADDRESS */}
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter delivery address"
            className="w-full p-3 mb-4 bg-white/10 rounded outline-none"
          />

          {/* PAYMENT */}
          <div className="mb-4">
            <p className="mb-2">Payment Method:</p>

            <label className="block">
              <input
                type="radio"
                value="COD"
                checked={payment === "COD"}
                onChange={(e) => setPayment(e.target.value)}
              />
              Cash on Delivery
            </label>

            <label className="block">
              <input
                type="radio"
                value="UPI"
                checked={payment === "UPI"}
                onChange={(e) => setPayment(e.target.value)}
              />
              UPI (Razorpay)
            </label>
          </div>

          {/* TOTAL */}
          <p className="text-xl mb-4">
            Total: ₹{product.price}
          </p>

          {/* BUTTON */}
          <button
            onClick={placeOrder}
            className="w-full bg-purple-600 py-3 rounded-lg hover:bg-purple-700"
          >
            {payment === "UPI" ? "Pay & Order" : "Place Order"}
          </button>

        </div>

      </div>
    </div>
  );
}