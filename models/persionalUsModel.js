const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const persionalUsSchema = new Schema(
  {
    mainImage: {
      type: String,
      required: [true, "Main Image is required"],
    },
    subImage: {
      type: String,
      required: [true, "Sub Image is required"],
    },
    titlemain: {
      type: String,
      required: true,
    },
    titlesub: {
        type: String,
        required: true,
      },
    description: {
      type: String,
      required: true,
    },
    interviewtitle: {
      type: String,
      required: true,
    },
    interviewQuote: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
);

persionalUsSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

persionalUsSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret, options) {
    delete ret._id;
    delete ret._v;
  },
});

persionalUsSchema.plugin(uniqueValidator);

const persionalUsModel = mongoose.model("persional", persionalUsSchema);

module.exports = persionalUsModel;
