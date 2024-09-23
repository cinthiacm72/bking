import mongoose from "mongoose";

const CitiesSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  country: {
    type: String,
    required: true,
    lowercase: true,
  },

  image: {
    type: String,
  },
});

export default mongoose.model("Cities", CitiesSchema);
