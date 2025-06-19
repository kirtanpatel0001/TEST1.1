import express from 'express';
import User from '../models/User.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Get all staff members (Admin only)
router.get('/', auth, adminAuth, async (req, res) => {
  try {
    const staff = await User.find({ role: { $in: ['admin', 'staff'] } })
      .select('-password')
      .sort({ createdAt: -1 });

    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create staff member (Admin only)
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const staff = new User({
      name,
      email,
      password,
      phone,
      role: role || 'staff'
    });

    await staff.save();

    const staffResponse = staff.toObject();
    delete staffResponse.password;

    res.status(201).json(staffResponse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;