import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  userEmail: String,
  image: String,
  name: String,
  builds: [
    {
      name: String,
      status: {
        type: String,
        default: "regular",
      },
      inCart: {
        type: Boolean,
        default: false,
      },
      parts: [
        {
          partId: String,
          partType: String,
        },
      ],
    },
  ],
  // created_at: {
  //   type: Date,
  //   default: Date.now,
  // },
});
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
