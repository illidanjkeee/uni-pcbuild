import mongoose, { Schema } from "mongoose";

const questionsSchema = new Schema({
  question: String,
  email: String,
  name: String,
  image: String,
  answers: [
    {
      answer: String,
      email: String,
      name: String,
      image: String,
    },
  ],
});
const Questions =
  mongoose.models.Question || mongoose.model("Question", questionsSchema);

export default Questions;
