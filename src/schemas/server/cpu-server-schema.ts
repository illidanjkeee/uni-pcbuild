import mongoose from "mongoose";

const cpuSchema = new mongoose.Schema({
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/gamma1199/image/upload/v1712267899/cpu_bqk7g1.webp",
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
  core_count: {
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
  tdp: {
    type: Number,
    required: true,
    default: null,
  },
  graphics: {
    type: String,
    required: true,
    default: null,
  },
  smt: {
    type: Boolean,
    required: true,
    default: null,
  },
});

const Cpu = mongoose.models.cpu || mongoose.model("cpu", cpuSchema);

export default Cpu;
