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

  gender: {
    type: String,
    required: [true, "Gender is required."],
  },

  age: {
    type: Number,
    required: [true, "Age is required."],
  },

  degree: {
    type: String,
    required: [true, "Education Degree is required."],
  },

  designation: {
    type: String,
    required: [true, "Current Designation is required."],
  },

  organization: {
    type: String,
    required: [true, "Current Organization & Address is required."],
  },

  experience: {
    type: String,
    required: [true, "Total Experience is required."],
  },

  elderly: {
    type: String,
    required: [true, "Willingness to work with Elderly is required."],
  },

  targets: {
    type: String,
    required: [true, "Monthly targets are required."],
  },

  date: {
    type: Date,
    default: Date.now,
  },
});


const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;