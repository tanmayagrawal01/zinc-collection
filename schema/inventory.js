const mongoose = require('mongoose');
const inventorySchema = new mongoose.Schema({
  variantId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductVariant', required: true, unique: true },
  stockQuantity: { type: Number, default: 0, min: 0 },
  reservedQuantity: { type: Number, default: 0, min: 0 },
  lowStockThreshold: { type: Number, default: 5 },
  isInStock: { type: Boolean, default: true },
  lastUpdated: { type: Date, default: Date.now }
});
inventorySchema.index({ variantId: 1 }, { unique: true });
inventorySchema.index({ isInStock: 1 });
inventorySchema.pre('save', function(next) {
  this.isInStock = this.stockQuantity > 0;
  this.lastUpdated = Date.now();
  next();
});
module.exports = mongoose.model('Inventory', inventorySchema);