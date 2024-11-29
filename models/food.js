const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  timeToCook: Number,
  rating: Number,
  category: String,
  image: String,
});

foodSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("Food", foodSchema);
