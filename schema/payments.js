const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true, unique: true },
  paymentMethod: { type: String, required: true, enum: ['credit_card', 'paypal', 'bank_transfer'] },
  amount: { type: Number, required: true, min: 0.01 },
  status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending' },
  transactionId: { type: String },
  paidAt: { type: Date },
  gateway: { type: String, default: 'Stripe' },
  createdAt: { type: Date, default: Date.now }
});
paymentSchema.index({ orderId: 1 }, { unique: true });
paymentSchema.index({ status: 1 });
module.exports = mongoose.model('Payment', paymentSchema);