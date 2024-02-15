const asyncHandler = require("express-async-handler");

const Product = require("../models/productModel");
const Development = require("../models/developmentModel");
const mongoose = require("mongoose");

module.exports.searchProducts = asyncHandler(async (req, res) => {
  const searchSettings = req.body.searchSettings;
  if (searchSettings) {
    const products = await Product.find({
      $and: [
        { deleted: false },
        { development: searchSettings.development },
        { onSale: searchSettings.onSale },
        {
          number: searchSettings.number
            ? { $regex: req.body.searchSettings.number, $options: "i" }
            : { $exists: true },
        },
        {
          type: searchSettings.type
            ? { $regex: req.body.searchSettings.type, $options: "i" }
            : { $exists: true },
        },
        {
          mt2: searchSettings.mt2?.min
            ? { $gte: searchSettings.mt2.min }
            : { $exists: true },
        },
        {
          mt2: searchSettings.mt2?.max
            ? { $lte: searchSettings.mt2.max }
            : { $exists: true },
        },
        {
          price: searchSettings.price?.min
            ? { $gte: searchSettings.price.min }
            : { $exists: true },
        },
        {
          price: searchSettings.price?.max
            ? { $lte: searchSettings.price.max }
            : { $exists: true },
        },
        {
          bedrooms: searchSettings.bedrooms?.min
            ? { $gte: searchSettings.bedrooms.min }
            : { $exists: true },
        },
        {
          bedrooms: searchSettings.bedrooms?.max
            ? { $lte: searchSettings.bedrooms.max }
            : { $exists: true },
        },
        {
          bathrooms: searchSettings.bathrooms?.min
            ? { $gte: searchSettings.bathrooms.min }
            : { $exists: true },
        },
        {
          bathrooms: searchSettings.bathrooms?.max
            ? { $lte: searchSettings.bathrooms.max }
            : { $exists: true },
        },
      ],
    });
    const filterLimits = await Product.aggregate([
      {
        $match: {
          development: new mongoose.Types.ObjectId(searchSettings.development),
          deleted: false,
        },
      },
      {
        $group: {
          _id: "$development",
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
          minMt2: { $min: "$mt2" },
          maxMt2: { $max: "$mt2" },
          minBedrooms: { $min: "$bedrooms" },
          maxBedrooms: { $max: "$bedrooms" },
          minBathrooms: { $min: "$bathrooms" },
          maxBathrooms: { $max: "$bathrooms" },
          minParkingLots: { $min: "$parkingLots" },
          maxParkingLots: { $max: "$parkingLots" },
          minTerrace: { $min: "$terrace" },
          maxTerrace: { $max: "$terrace" },
        },
      },
    ]);

    res.json({ products, filterLimits: filterLimits[0] });
  } else {
    throw new Error("Search settings not found");
  }
});
module.exports.viewProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate({
    path: "development",
    select: "name",
  });
  if (product) {
    res.json({ product });
  } else res.json(404);
});
//Products CRUD
module.exports.createProduct = asyncHandler(async (req, res) => {
  const data = JSON.parse(req.body.product);
  const newProduct = new Product(data);
  const currentUser = await User.findById(req.user._id);
  newProduct.user = currentUser;
  if (req.files?.length >= 1) {
    for (const file of req.files) {
      if (file.originalname == "image") {
        const imageProduct = await cloudinary.uploader.upload(file.path, {
          folder: "Eyewear/products/",
        });
        var uploadImage = {
          url: imageProduct.url,
          filename: imageProduct.public_id,
        };
        newProduct.images.push(uploadImage);
      }
      try {
        await unlink(file.path);
        console.log(`successfully deleted ${file.path}`);
      } catch (error) {
        console.error("there was an error:", error.message);
      }
    }
  }
  await newProduct.save();
  res.status(201).json({ message: "Product created" });
});
module.exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  product.deleted = true;
  await product.save();
  res.status(201).json("Product deleted");
});
module.exports.editProduct = asyncHandler(async (req, res) => {
  const data = JSON.parse(req.body.product);
  const product = await Product.findOneAndUpdate({ _id: req.params.id }, data);
  if (req.files?.length >= 1) {
    for (const file of req.files) {
      if (file.originalname == "image") {
        const imageProduct = await cloudinary.uploader.upload(file.path, {
          folder: "Eyewear/products/",
        });
        var uploadImage = {
          url: imageProduct.url,
          filename: imageProduct.public_id,
        };
        product.images = [];
        product.images.push(uploadImage);
      }
      try {
        await unlink(file.path);
        console.log(`successfully deleted ${file.path}`);
      } catch (error) {
        console.error("there was an error:", error.message);
      }
    }
  }
  await product.save();
  res.status(204).json({ message: "Product updated" });
});

module.exports.viewProducts = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize);
  const page = Number(req.query.pageNumber) || 1;
  const sort = req.query.sort;
  const order = req.query.order;
  var sortCondition = {};
  if (sort && order && (order === "ascending" || order === "descending")) {
    switch (sort) {
      case "name":
        sortCondition[sort] = order === "ascending" ? 1 : -1;
        break;
      case "skuTrep":
        sortCondition[sort] = order === "ascending" ? 1 : -1;
        break;
      case "brand":
        sortCondition[sort] = order === "ascending" ? 1 : -1;
        break;
      case "countInStock":
        sortCondition[sort] = order === "ascending" ? 1 : -1;
        break;
    }
  }
  const keywordSkuTrep = req.query.keyword
    ? {
        skuTrep: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const keywordName = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const count = await Product.countDocuments({
    $and: [
      { deleted: false },
      {
        $or: [{ ...keywordSkuTrep }, { ...keywordName }],
      },
    ],
  });

  const products = pageSize
    ? await Product.find({
        $and: [
          { deleted: false },
          {
            $or: [{ ...keywordSkuTrep }, { ...keywordName }],
          },
        ],
      })
        .sort(sortCondition)
        .limit(pageSize)
        .skip(pageSize * (page - 1))
    : await Product.find({
        $and: [
          { deleted: false },
          {
            $or: [{ ...keywordSkuTrep }, { ...keywordName }],
          },
        ],
      }).sort(sortCondition);

  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
  });
});
module.exports.viewProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
