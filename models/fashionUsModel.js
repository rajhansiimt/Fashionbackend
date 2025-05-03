const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const FashionUsSchema = new Schema(
  {
    image: {
      type: String,
      required: [true, "Image is required"],
      unique: true,
    },
  },
  { timestamps: true }
);

FashionUsSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

FashionUsSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret, options) {
    delete ret._id;
    delete ret._v;
  },
});

FashionUsSchema.plugin(uniqueValidator);

const fashionUsModel = mongoose.model("fashion", FashionUsSchema);

module.exports = fashionUsModel;
