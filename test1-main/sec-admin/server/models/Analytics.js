import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  visitors: {
    total: { type: Number, default: 0 },
    unique: { type: Number, default: 0 },
    returning: { type: Number, default: 0 }
  },
  pageViews: {
    total: { type: Number, default: 0 },
    pages: [{
      path: String,
      views: Number
    }]
  },
  sales: {
    revenue: { type: Number, default: 0 },
    orders: { type: Number, default: 0 },
    avgOrderValue: { type: Number, default: 0 }
  },
  topProducts: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    views: Number,
    sales: Number
  }],
  traffic: {
    sources: [{
      source: String,
      visitors: Number
    }]
  }
});

export default mongoose.model('Analytics', analyticsSchema);