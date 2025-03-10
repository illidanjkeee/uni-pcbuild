import mongoose from "mongoose";

const storageSchema = new mongoose.Schema({
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/gamma1199/image/upload/v1712267899/storage_bqk7g1.webp",
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
  capacity: {
    type: Number,
    required: true,
    default: null,
  },
  price_per_gb: {
    type: Number,
    required: true,
    default: null,
  },
  type: {
    type: String,
    required: true,
    default: null,
  },
  cache: {
    type: Number,
    required: true,
    default: null,
  },
  form_factor: {
    type: String,
    required: true,
    default: null,
  },
  interface: {
    type: String,
    required: true,
    default: null,
  },
});

const Storage =
  mongoose.models.storage || mongoose.model("storage", storageSchema);

export default Storage;
