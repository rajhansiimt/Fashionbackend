const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const contactUsSchema = new Schema(
  {
    FirstName: {
      type: String,
      required: [true, "First name is required"],
    },
    LastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // optional
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    Message: {
      type: String,
      required: [true, "Message is required"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // if you have user model
    },
  },
  { timestamps: true }
);

contactUsSchema.plugin(uniqueValidator);

contactUsSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

contactUsSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model("ContactUs", contactUsSchema);
