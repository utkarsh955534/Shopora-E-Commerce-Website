import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";

// ❤️ TOGGLE WISHLIST
export const toggleWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const productId = req.params.productId;

  const exists = user.wishlist.some(
    (id) => id.toString() === productId
  );

  if (exists) {
    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== productId
    );
  } else {
    user.wishlist.push(productId);
  }

  await user.save();

  res.json({
    message: exists ? "Removed from wishlist" : "Added to wishlist",
    wishlist: user.wishlist,
  });
});


// ❤️ GET WISHLIST
export const getWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).populate("wishlist");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.json(user.wishlist);
});