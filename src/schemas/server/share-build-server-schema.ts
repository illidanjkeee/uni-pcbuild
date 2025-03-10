import mongoose, { Schema } from "mongoose";
import build from "next/dist/build";

const shareBuildsSchema = new Schema({
  buildID: String,
  buildName: String,
  parts: [],
  email: String,
  name: String,
  image: String,
  reactions: [
    {
      reaction: String,
      email: String,
      name: String,
      image: String,
    },
  ],
});
const ShareBuilds =
  mongoose.models.sharebuild || mongoose.model("sharebuild", shareBuildsSchema);

export default ShareBuilds;
