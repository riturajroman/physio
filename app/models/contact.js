import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema({
  fullname: {
    type: String,
    required: [true, "Full Name is required."],
    trim: true,
    minLength: [2, "Full Name must be larger than 2 characters"],
    maxLength: [50, "Full Name must be lesser than 50 characters"],
  },

  phone: {
    type: String,
    required: [true, "Phone number is required."],
    unique: true,
  },

  email: {
    type: String,
    required: [true, "Email is required."],
    match: [/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/i, "Invalid email address"],
  },

  status: {
    type: String,
    required: [true, "Status is required."],
    enum: ["Studying", "Working"], // Enumerate the possible values
    default: "Studying", // Default value
  },

  experience: {
    type: String,
    required: function () {
      return this.status === "Working"; // Required only if status is "Working"
    },
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;
