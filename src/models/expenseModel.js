import mongoose from "mongoose";

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: [0, "Amount cannot be negative"],
  },
  date: {
    type: Date,
    default: Date.now,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

expenseSchema.virtual("formattedAmount").get(function () {
  return `$${this.amount.toFixed(2)}`;
});

expenseSchema.methods.formatDate = function () {
  return this.date.toLocaleDateString();
};

expenseSchema.set("toJSON", { virtuals: true });
expenseSchema.set("toObject", { virtuals: true });

export default mongoose.models.Expense ||
  mongoose.model("Expense", expenseSchema);
