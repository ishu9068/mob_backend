import Product from "../models/product.model.js";

// Seller create product
export const createProduct = async (req, res) => {
  try {
    const { title, brand, price, stock, description, category } = req.body;

    if (!title || !price) {
      return res.status(400).json({ message: "Title and Price required " });
    }

    const product = await Product.create({
      title,
      brand,
      price,
      stock: stock || 0,
      description: description || "",
      category: category || "",
      seller: req.user._id,
    });

    res.status(201).json({ message: "Product created ", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Public get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("seller", "name email");
    res.json({ products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get single product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "seller",
      "name email"
    );
    if (!product) return res.status(404).json({ message: "Product not found " });
    res.json({ product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Seller get own products
export const getSellerProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user._id });
    res.json({ products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Seller update product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found " });

    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not your product " });
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json({ message: "Product updated ", updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Seller delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found " });

    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not your product " });
    }

    await product.deleteOne();

    res.json({ message: "Product deleted " });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
