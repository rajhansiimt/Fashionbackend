const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const BeautyUsSchema = new Schema(
  {
    image: {
      type: String,
      required: [true, "Image is required"],
      unique: true,
    },
  },
  { timestamps: true }
);

BeautyUsSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

BeautyUsSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret, options) {
    delete ret._id;
    delete ret._v;
  },
});

BeautyUsSchema.plugin(uniqueValidator);

const beautyUsModel = mongoose.model("beauty", BeautyUsSchema);

module.exports = beautyUsModel;
