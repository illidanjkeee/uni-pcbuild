import mongoose from "mongoose";

const networkCardSchema = new mongoose.Schema({
  image: {
    required: true,
    type: String,
    default:
      "https://res.cloudinary.com/gamma1199/image/upload/v1712268032/network-card_basdqx.webp",
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
  protocol: {
    type: String,
    required: true,
    default: null,
  },
  interface: {
    type: String,
    required: true,
    default: null,
  },
  color: {
    type: String,
    required: true,
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const NetworkCard =
  mongoose.models.Networkcard ||
  mongoose.model("Networkcard", networkCardSchema);

export default NetworkCard;
