import asyncHandler from "express-async-handler";
import Brand from "../model/Brand.js";
import Product from "../model/Product.js";

// @desc create a new brand
// @route POST /api/brands
// @access Private/Admin
export const createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const brandName = name.toLowerCase();

  const brandExists = await Brand.findOne({ name: brandName });
  if (brandExists) {
    res.status(400);
    throw new Error("Brand already exists");
  }

  const brand = await Brand.create({
    name: brandName,
    user: req.user,
  });

  res.status(201).json({
    status: "success",
    message: "Brand created successfully",
    brand,
  });
});

// @desc get all brands
// @route GET /api/brands
// @access Public
export const getBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find({});
  res.status(200).json({
    status: "success",
    brands,
  });
});

// @desc get a single brand
// @route GET /api/brands/:id
// @access Public
export const getBrandById = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  if (!brand) {
    res.status(404);
    throw new Error("Brand not found");
  }
  const products = await Product.find({ brand: brand._id }).populate([
    {
      path: "brand",
      select: "name",
    },
    {
      path: "category",
      select: "name",
    },
  ]);

  res.status(200).json({
    status: "success",
    brand: { ...brand._doc, products },
  });
});

// @desc update a brand
// @route PUT /api/brands/:id
// @access Private/Admin
export const updateBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  console.log(req.body);
  const brand = await Brand.findByIdAndUpdate(
    req.params.id,
    { name: name.toLowerCase() },
    { new: true }
  );

  if (!brand) {
    res.status(404);
    throw new Error("Brand not found");
  }

  res.status(200).json({
    status: "success",
    message: "Brand updated successfully",
    brand,
  });
});

// @desc delete a brand
// @route DELETE /api/brands/:id
// @access Private/Admin
export const deleteBrand = asyncHandler(async (req, res) => {
  const deletedBrand = await Brand.findByIdAndDelete(req.params.id);
  if (!deletedBrand) {
    res.status(404);
    throw new Error("Brand not found");
  }
  res.status(200).json({
    status: "success",
    message: "Brand deleted successfully",
  });
});
