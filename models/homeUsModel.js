const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const HomeUsSchema = new Schema(
  {
    image: [
      {
        type: String,
        required: [true, "Image is a required field"],
      },
    ],
  },
  { timestamps: true }
);

// Virtual ID field
HomeUsSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Customize JSON output
HomeUsSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret, options) {
    delete ret._id;
    delete ret._v;
  },
});

HomeUsSchema.plugin(uniqueValidator);

// Export the model
const homeUsModel = mongoose.model("home", HomeUsSchema);
module.exports = homeUsModel;
