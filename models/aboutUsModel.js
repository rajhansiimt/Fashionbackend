const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const aboutUsSchema = new Schema(
  {
    image: [
      {
        type: String,
        required: [true, "Image is a required field"],
      },
    ],
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
  },
  { timestamps: true }
);

aboutUsSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

aboutUsSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
  },
});

aboutUsSchema.plugin(uniqueValidator);

const AboutUsModel = mongoose.model("about-us-registry", aboutUsSchema);

module.exports = AboutUsModel;
