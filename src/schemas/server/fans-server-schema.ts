import mongoose from "mongoose";

const fanSchema = new mongoose.Schema({
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/gamma1199/image/upload/v1712267899/fan_bqk7g1.webp",
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
  size: {
    type: Number,
    required: true,
    default: null,
  },
  color: {
    type: String,
    required: true,
    default: null,
  },
  rpm: {
    type: [Number],
    required: true,
    default: null,
  },
  airflow: {
    type: [Number],
    required: true,
    default: null,
  },
  noise_level: {
    type: [Number],
    required: true,
    default: null,
  },
  pwm: {
    type: String,
    required: true,
    default: null,
  },
});

const Fan = mongoose.models.fan || mongoose.model("fan", fanSchema);

export default Fan;
