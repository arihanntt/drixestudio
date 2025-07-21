const mongoose = require('mongoose');

   const TransactionSchema = new mongoose.Schema({
     planName: {
       type: String,
       required: true,
       enum: ['Basic Support', 'Standard Support', 'Premium Support', 'PRO MAX Support', 'Custom'],
     },
     amount: {
       type: Number,
       required: true,
     },
     currency: {
       type: String,
       required: true,
       enum: ['INR', 'USD', 'EUR', 'GBP', 'AUD'],
     },
     message: {
       type: String,
       default: '',
     },
     contactMethod: {
       type: String,
       enum: ['Email', 'Discord', 'Telegram', 'Instagram', null],
       default: null,
     },
     contactDetails: {
       type: String,
       default: null,
     },
     razorpayOrderId: {
       type: String,
       required: true,
     },
     razorpayPaymentId: {
       type: String,
       required: true,
     },
     razorpaySignature: {
       type: String,
       required: true,
     },
     createdAt: {
       type: Date,
       default: Date.now,
     },
   });

   module.exports = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);