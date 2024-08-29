const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed'],
    default: 'pending'
  },
  //TO DO
});

module.exports = mongoose.model('Delivery', DeliverySchema);