import razorpay from "../config/razorpay.js";

export const createRazorpayOrder = async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100, // ₹ → paise
    currency: "INR",
    receipt: "order_rcptid_" + Date.now(),
  };

  const order = await razorpay.orders.create(options);

  res.json(order);
};