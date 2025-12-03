const mongoose = require('mongoose');
const productVariantSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  sku: { type: String, required: true, unique: true, match: /^[A-Z]{3}-[A-Z]{3}-[A-Z]{3}$/ },
  color: { type: String, required: true, minlength: 2 },
  size: { type: String },
  additionalAttributes: { type: mongoose.Schema.Types.Mixed },
  images: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
productVariantSchema.index({ productId: 1 });
productVariantSchema.index({ sku: 1 }, { unique: true });
productVariantSchema.index({ color: 1 });
productVariantSchema.pre('save', function(next) { this.updatedAt = Date.now(); next(); });
module.exports = mongoose.model('ProductVariant', productVariantSchema);