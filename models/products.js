const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    productList: {
      type: [
        {
          _id: false,
          price: {
            type: Number,
            required: true,
          },
          weight: {
            type: Number,
            required: true,
          },
          unit: {
            type: String,
            required: true,
            enum: ["kg", "g", "mg", "lb", "oz"],
          },
        },
      ],
    },
    description: {
      type: String,
      required: true,
    },
    farmerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    images: {
      type: [String],
      required: false,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Fruits",
        "Vegetables",
        "Meats",
        "Dairy",
        "Grains",
        "Nuts",
        "Spices",
        "Herbs",
        "Other",
      ],
    },
  },
  { timestamps: true }
);

module.exports = model("Product", productSchema);
