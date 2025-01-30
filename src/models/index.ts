import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
  role: { type: String, enum: ["user", "admin", "mod"], default: "user" },
});

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  details: { type: String, required: true },
  inquiryType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const orderSchema = new mongoose.Schema({
  user: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  items: [
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
      size: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      imageUrl: { type: String, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  paymentId: { type: String, required: true },
  orderId: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "processing", "completed", "cancelled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

export const Order =
  mongoose.models.Order || mongoose.model("Order", orderSchema);

export const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
