import mongoose, { Schema } from "mongoose";
const specialBuildsSchema = new Schema({
  buildName: String,
  parts: [
    {
      partId: String,
      partType: String,
    },
  ],
});
const SpecialBuilds =
  mongoose.models.specialbuild ||
  mongoose.model("specialbuild", specialBuildsSchema);

export default SpecialBuilds;
