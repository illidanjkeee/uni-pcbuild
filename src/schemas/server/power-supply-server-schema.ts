import mongoose from "mongoose";

const powerSupplySchema = new mongoose.Schema({
  image: {
    required: true,
    type: String,
    default:
      "https://res.cloudinary.com/gamma1199/image/upload/v1712268051/power-supply_pjavgq.webp",
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
  type: {
    type: String,
    required: true,
    default: null,
  },
  efficiency: {
    type: String,
    required: true,
    default: null,
  },
  wattage: {
    type: Number,
    required: true,
    default: null,
  },
  modular: {
    type: String,
    required: true,
    default: null,
  },
  color: {
    type: String,
    required: true,
    default: null,
  },
});

const PowerSupply =
  mongoose.models.power || mongoose.model("power", powerSupplySchema);

export default PowerSupply;
