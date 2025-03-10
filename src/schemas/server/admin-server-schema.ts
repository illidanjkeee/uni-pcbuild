import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema({
  name: String,
  orders: [
    {
      mail: String,
      buildName: String,
      bill: Number,
      parts: [
        {
          partId: String,
          partType: String,
        },
      ],
      status: String,
      buildID: String,
    },
  ],
});
const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

export default Admin;
