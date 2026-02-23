import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

// Place order (customer)
export const placeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty " });
    }

    let total = 0;

    const items = cart.items.map((item) => {
      total += item.product.price * item.qty;

      return {
        product: item.product._id,
        qty: item.qty,
        price: item.product.price,
      };
    });

    // stock reduce
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: { stock: -item.qty },
      });
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      totalAmount: total,
      status: "pending",
    });

    // clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json({ message: "Order placed ", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get customer order history
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "items.product"
    );

    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
