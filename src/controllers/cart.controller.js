import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

// Get cart
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });

    res.json({ cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found " });

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });

    const existingItem = cart.items.find(
      (i) => i.product.toString() === productId
    );

    if (existingItem) {
      existingItem.qty += qty || 1;
    } else {
      cart.items.push({ product: productId, qty: qty || 1 });
    }

    await cart.save();

    res.json({ message: "Added to cart ", cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove from cart
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) return res.status(404).json({ message: "Cart not found " });

    cart.items = cart.items.filter((i) => i.product.toString() !== productId);

    await cart.save();

    res.json({ message: "Removed from cart ", cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
