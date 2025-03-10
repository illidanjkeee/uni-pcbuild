import mongoose from "mongoose";

const memorySchema = new mongoose.Schema({
  image: {
    required: true,
    type: String,
    default:
      "https://res.cloudinary.com/gamma1199/image/upload/v1712268017/memory_vyvz6j.webp",
  },
  name: {
    type: String,
    required: true,
    default: null,
  },
  price: {
    type: Number,
    required: true,
    default: null,
  },
  speed: {
    type: [Number],
    required: true,
    default: null,
  },
  modules: {
    type: [Number],
    required: true,
    default: null,
  },
  price_per_gb: {
    type: Number,
    required: true,
    default: null,
  },
  color: {
    type: String,
    required: true,
    default: null,
  },
  first_word_latency: {
    type: Number,
    required: true,
    default: null,
  },
  cas_latency: {
    type: Number,
    required: true,
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Memory = mongoose.models.memory || mongoose.model("memory", memorySchema);

export default Memory;
