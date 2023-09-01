const Category = require("../models/categoryModel");

exports.getAllCategories = async (req, res) => {
  const categories = await Category.find().populate({
    path: "products",
    // select: "name price _id author tec",
    populate: [
      {
        path: "author",
        select: "name phoneNumber ",
      },
      {
        path: "category",
        select: "name",
      },
    ],
  });
  res.status(200).json({ status: "success", data: categories });
};

exports.getCategory = async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug }).populate({
    path: "products",
    select: "name price author category location images technicalInfo",
    populate: [
      {
        path: "author",
        select: "name email phoneNumber",
      },
      {
        path: "category",
        select: "name",
      },
    ],
  });
  res.status(200).json({ status: "success", data: category });
};

exports.createCategory = async (req, res) => {
  const newCategory = await Category.create(req.body);
  res.status(201).json({ status: "success", data: newCategory });
};
