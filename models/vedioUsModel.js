const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const VedioUsSchema = new Schema(
  {
    video: {
      type: String,
      required: [true, "Video is required"],
      unique: true,
    },
  },
  { timestamps: true }
);

// Virtual ID field
VedioUsSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Customize JSON output
VedioUsSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret, options) {
    delete ret._id;
    delete ret.__v; // Fix typo here
  },
});

VedioUsSchema.plugin(uniqueValidator);

const VedioUsModel = mongoose.model("vedio", VedioUsSchema);
module.exports = VedioUsModel;
