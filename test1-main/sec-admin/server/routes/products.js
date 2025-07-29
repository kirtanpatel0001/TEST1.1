import express from 'express';
import Product from '../models/Product.js';
import { auth, adminAuth } from '../middleware/auth.js';
import upload from '../middleware/uploadImage.js';
import { addImageMetadata, getImagesByProduct, removeImagesByProduct } from '../middleware/imageMetadata.js';
import mongoose from 'mongoose';

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, brand, search } = req.query;
    const query = {};

    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const products = await Product.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(query);

    // Attach image URL for each product (priority)
    const productsWithImages = products.map(product => {
      let imageUrl = '';
      // Try to get image from metadata.json
      const metaImages = getImagesByProduct(product._id.toString());
      if (metaImages && metaImages.length > 0) {
        imageUrl = `/images/${metaImages[0].filename}`;
      } else if (product.images && product.images.length > 0 && product.images[0].url) {
        imageUrl = product.images[0].url;
      }
      return {
        ...product.toObject(),
        imageUrl
      };
    });

    res.json({
      products: productsWithImages,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create product (Admin only)
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update product (Admin only)
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete product (Admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    // Remove images and metadata
    removeImagesByProduct(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Image upload endpoint
router.post('/upload-image', auth, adminAuth, upload.single('image'), async (req, res) => {
  const { productId } = req.body;
  if (!req.file || !productId) {
    return res.status(400).json({ message: 'Image file and productId are required.' });
  }
  addImageMetadata(productId, req.file.filename, req.file.originalname);
  const imageUrl = `/images/${req.file.filename}`;
  // Update product's images array in MongoDB
  await Product.findByIdAndUpdate(
    productId,
    { $push: { images: { url: imageUrl, alt: req.file.originalname } } },
    { new: true }
  );
  res.json({
    url: imageUrl,
    filename: req.file.filename,
    originalname: req.file.originalname
  });
});

export default router;