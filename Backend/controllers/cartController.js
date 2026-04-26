import Cart from "../models/Cart.js";
import asyncHandler from "../utils/asyncHandler.js";


// 🛒 GET CART
export const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id })
    .populate("items.product");

  res.json(cart || { items: [] });
});


// ➕ ADD TO CART
export const addToCart = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user.id,
      items: [],
    });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += 1;
  } else {
    cart.items.push({ product: productId, quantity: 1 }); // 🔥 FIX
  }

  await cart.save();

  res.json(cart);
});


// ➕ INCREASE QTY
export const increaseQty = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  const cart = await Cart.findOne({ user: req.user.id });

  if (!cart)
    return res.status(404).json({ message: "Cart not found" });

  const item = cart.items.find(
    (i) => i.product.toString() === productId
  );

  if (!item)
    return res.status(404).json({ message: "Item not found" });

  item.quantity += 1;

  await cart.save();

  res.json(cart);
});


// ➖ DECREASE QTY
export const decreaseQty = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  const cart = await Cart.findOne({ user: req.user.id });

  if (!cart)
    return res.status(404).json({ message: "Cart not found" });

  const item = cart.items.find(
    (i) => i.product.toString() === productId
  );

  if (!item)
    return res.status(404).json({ message: "Item not found" });

  if (item.quantity > 1) {
    item.quantity -= 1;
  } else {
    // remove if 1
    cart.items = cart.items.filter(
      (i) => i.product.toString() !== productId
    );
  }

  await cart.save();

  res.json(cart);
});


// ❌ REMOVE ITEM
export const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: req.user.id });

  if (!cart)
    return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  await cart.save();

  res.json(cart);
});