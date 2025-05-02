const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const CommercialUsSchema = new Schema(
  {
    image: {
      type: String,
      required: [true, "Image is required"],
      unique: true,
    },
  },
  { timestamps: true }
);

CommercialUsSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

CommercialUsSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret, options) {
    delete ret._id;
    delete ret._v;
  },
});

CommercialUsSchema.plugin(uniqueValidator);

const commercialUsModel = mongoose.model("commercial", CommercialUsSchema);

module.exports = commercialUsModel;
