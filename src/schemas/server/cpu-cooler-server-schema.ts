import mongoose from "mongoose";

const cpuCoolerSchema = new mongoose.Schema({
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/gamma1199/image/upload/v1712220075/cpu-cooler_ptswlc.webp",
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
  rpm: {
    type: [Number],
    required: true,
    default: null,
  },
  noise_level: {
    type: [Number],
    required: true,
    default: null,
  },
  color: {
    type: String,
    required: true,
    default: null,
  },
  size: {
    type: Number,
    required: true,
    default: null,
  },
  created_at: {
    type: Date,
  },
});

const CpuCooler =
  mongoose.models.Cpucooler || mongoose.model("Cpucooler", cpuCoolerSchema);

export default CpuCooler;
