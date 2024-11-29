const mongoose = require("mongoose");
const user = require("./user");
const food = require("./food");

const favoriteFoodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
  },
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: food,
  },
});

favoriteFoodSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("FavoriteFood", favoriteFoodSchema);