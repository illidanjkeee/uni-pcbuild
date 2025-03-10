import mongoose, { Schema } from "mongoose";

const caseSchema = new Schema({
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/gamma1199/image/upload/v1712220160/case_kjdrzx.webp",
  },
  name: String,
  price: Number,
  type: String,
  color: String,
  psu: String,
  side_panel: String,
  external_volume: Number,
  internal_35_bays: Number,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Use mongoose.models.Case to check if the model already exists
const Case = mongoose.models.Case || mongoose.model("Case", caseSchema);

export default Case;
