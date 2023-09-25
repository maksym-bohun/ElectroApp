const mongoose = require("mongoose");
const { default: slugify } = require("slugify");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    slug: String,
    products: [{ type: mongoose.Schema.ObjectId, ref: "Product" }],
  },
  {
    toJSON: { virtuals: true },
    toObjects: { virtuals: true },
  }
);

categorySchema.index({ name: "text" });

categorySchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  // console.log("\n\nSLUGIFY\n\n", this.slug);
  next();
});

// categorySchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "products",
//   });
//   next();
// });

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
