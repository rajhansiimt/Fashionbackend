const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const CoverUsSchema = new Schema(
  {
    image: {
      type: String,
      required: [true, "Image is required"],
      unique: true,
    },
  },
  { timestamps: true }
);

CoverUsSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

CoverUsSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret, options) {
    delete ret._id;
    delete ret._v;
  },
});

CoverUsSchema.plugin(uniqueValidator);

const coversUsModel = mongoose.model("cover", CoverUsSchema);

module.exports = coversUsModel;
