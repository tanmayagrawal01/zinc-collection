const mongoose = require('mongoose');
const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String },
  zipCode: { type: String, required: true },
  country: { type: String, default: 'USA' }
});
const orderItemSchema = new mongoose.Schema({
  variantId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductVariant', required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0.01 },
  subtotal: { type: Number, min: 0 }
});
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderNumber: { type: String, required: true, unique: true },
  status: { type: String, enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  totalAmount: { type: Number, required: true, min: 0.01 },
  shippingAddress: { type: addressSchema, required: true },
  billingAddress: addressSchema,
  taxAmount: { type: Number, default: 0, min: 0 },
  discountAmount: { type: Number, default: 0, min: 0 },
  items: [orderItemSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
orderSchema.index({ userId: 1 });
orderSchema.index({ orderNumber: 1 }, { unique: true });
orderSchema.index({ status: 1, createdAt: -1 });
orderSchema.pre('save', function(next) {
  this.items.forEach(item => { item.subtotal = item.quantity * item.price; });
  this.updatedAt = Date.now();
  next();
});
module.exports = mongoose.model('Order', orderSchema);