const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const User = require("../models/userModel");
const Lookup = require("../models/lookupModel");

// Get categories
// Route: GET /api/lookup/categories
// Access: Public
const viewCategories = asyncHandler(async (req, res) => {
  const categories = await Lookup.find({ attribeGroup: "category" });
  res.json(categories);
});

// Get brands
// Route: GET /api/lookup/brands
// Access: Public
const viewBrand = asyncHandler(async (req, res) => {
  const brands = await Lookup.find({ attribeGroup: "brand" });
  res.json(brands);
});

// Get types
// Route: GET /api/lookup/types
// Access: Public
const viewTypes = asyncHandler(async (req, res) => {
  const types = await Lookup.find({ attribeGroup: "type" });
  res.json(types);
});
