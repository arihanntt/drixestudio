import mongoose from 'mongoose';

const LaunchPageSchema = new mongoose.Schema({
  owner: { type: String, required: true },
  discord: { type: String, required: true },
  features: { type: [String], default: [] },
  password: { type: String, default: '' }, // Hashed password (empty if no password)
  pageId: { type: String, required: true, unique: true }, // Unique ID for the page
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.LaunchPage || mongoose.model('LaunchPage', LaunchPageSchema);