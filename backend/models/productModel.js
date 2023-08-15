const mongoose = require("mongoose");
const Category = require("./categoryModel");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [10, "Name is too short!"],
      maxlength: [50, "Name is too long!"],
    },
    slug: String,
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
      //   enum: [
      //     "Smartphones",
      //     "Laptops",
      //     "Watches",
      //     "Monitors",
      //     "Keyboards",
      //     "Printers",
      //     "Cameras",
      //     "Headphones",
      //     "Powerbanks",
      //   ],
    },
    location: {
      type: { type: String, default: "Point", enum: ["Point"] },
      //   required: true,
      coordinates: Number,
    },
    author: { type: mongoose.Schema.ObjectId, ref: "User" },
  },
  {
    toJSON: { virtuals: true },
    toObjects: { virtuals: true },
  }
);

productSchema.statics.addProduct = async function (categoryId) {
  const stats = await this.aggregate([
    {
      $match: { category: categoryId },
    },
    {
      $group: {
        _id: categoryId,
        products: {
          $push: {
            _id: "$_id",
          },
        },
      },
    },
  ]);

  if (stats.length > 0) {
    await Category.findByIdAndUpdate(categoryId, {
      products: stats[0].products,
    });
  }
};

productSchema.pre("save", function () {
  this.constructor.addProduct(this.category);
});

// productSchema.pre(/^find/, function (next) {
//   this.populate({ path: "category", select: "name" });
//   next();
// });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
