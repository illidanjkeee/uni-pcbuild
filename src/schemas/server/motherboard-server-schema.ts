import mongoose from "mongoose";

const motherboardSchema = new mongoose.Schema({
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/gamma1199/image/upload/v1712267899/motherboard_bthfse.webp",
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
  socket: {
    type: String,
    required: true,
    default: null,
  },
  form_factor: {
    type: String,
    required: true,
    default: null,
  },
  max_memory: {
    type: Number,
    required: true,
    default: null,
  },
  memory_slots: {
    type: Number,
    required: true,
    default: null,
  },
  color: {
    type: String,
    required: true,
    default: null,
  },
});

const Motherboard =
  mongoose.models.motherboard ||
  mongoose.model("motherboard", motherboardSchema);

export default Motherboard;
