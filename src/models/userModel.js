import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide first name"],
    unique: false,
  },
  lastName: {
    type: String,
    required: [true, "Please provide last name"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    unique: true,
  },
  budgetLimit: {
    type: String,
    required: [true, "Please provide a Budget limit"],
    unique: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  jobTitle: {
    type: String,
  },
  streetAddress: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zipCode: {
    type: String,
  },
  completeAddress: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  education: {
    type: String,
  },
  gender: {
    type: String,
  },
  about: {
    type: String,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
