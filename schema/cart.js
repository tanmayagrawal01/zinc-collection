const mongoose = require('mongoose');
const cartItemSchema = new mongoose.Schema({
  variantId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductVariant', required: true },
  quantity: { type: Number, required: true, min: 1 },
  priceAtAdd: { type: Number, required: true, min: 0.01 },
  addedAt: { type: Date, default: Date.now }
});
const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [cartItemSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
cartSchema.index({ userId: 1 }, { unique: true });
cartSchema.pre('save', function(next) { this.updatedAt = Date.now(); next(); });
module.exports = mongoose.model('Cart', cartSchema);