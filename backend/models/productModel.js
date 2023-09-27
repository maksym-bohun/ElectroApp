const mongoose = require("mongoose");
const Category = require("./categoryModel");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: [5, "Name is too short!"],
      maxlength: [200, "Name is too long!"],
    },
    slug: String,
    images: [{ type: String }],
    price: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      // required: true,
    },
    description: {
      type: String,
      minlength: 10,
      maxlength: 3000,
    },
    technicalInfo: {
      type: Object,
    },
    location: {
      type: { type: String, default: "Point", enum: ["Point"] },
      //   required: true,
      coordinates: { type: [Number] },
      description: { type: String },
    },
    author: { type: mongoose.Schema.ObjectId, ref: "User" },
    views: { type: Number, default: 0, min: 0 },
    likes: { type: Number, default: 0, min: 0 },
    phoneNumberViews: { type: Number, default: 0, min: 0 },
  },
  {
    toJSON: { virtuals: true },
    toObjects: { virtuals: true },
  }
);

productSchema.index({ author: 1 });
productSchema.index({ name: "text" });
productSchema.index({ category: "text" });

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
