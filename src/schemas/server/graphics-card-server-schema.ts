import mongoose from "mongoose";

const graphicsCardSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
    default:
      "https://res.cloudinary.com/gamma1199/image/upload/v1712267899/graphics-card_ryzj5v.webp",
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
  chipset: {
    type: String,
    required: true,
    default: null,
  },
  memory: {
    type: Number,
    required: true,
    default: null,
  },
  core_clock: {
    type: Number,
    required: true,
    default: null,
  },
  boost_clock: {
    type: Number,
    required: true,
    default: null,
  },
  color: {
    type: String,
    required: true,
    default: null,
  },
  length: {
    type: Number,
    required: true,
    default: null,
  },
});

const GraphicsCard =
  mongoose.models.graphicscard ||
  mongoose.model("graphicscard", graphicsCardSchema);

export default GraphicsCard;
