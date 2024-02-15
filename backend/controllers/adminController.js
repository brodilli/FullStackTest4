const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const User = require("../models/userModel");
const UserVerification = require("../models/userVerificationModel");
const UserForgotPassword = require("../models/userForgotPasswordModel");
const Order = require("../models/orderModel");
const Development = require("../models/developmentModel");
const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const Brand = require("../models/brandModel");
const Parcel = require("../models/parcelModel");
const Marketplace = require("../models/marketplaceModel");
const Discount = require("../models/discountModel");
const { cloudinary } = require("../cloudinary");
const { unlink } = require("node:fs/promises");
const Excel = require("exceljs");
const { PassThrough } = require("stream");

// --------- Development CRUD -------------
// Development View
module.exports.viewDevelopment = asyncHandler(async (req, res) => {
  const development = await Development.findById(req.params.id);
  if (development) {
    res.json(development);
  } else {
    res.status(404);
    throw new Error("development not found");
  }
});
// Developments View
module.exports.viewDevelopments = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize);
  const page = Number(req.query.pageNumber) || 1;
  const sort = req.query.sort;
  const order = req.query.order;
  const all = req.query.all;
  if (all === "true") {
    const count = await Development.countDocuments({
      $and: [{ deleted: false }],
    });
    const developments = await Development.find({
      $and: [{ deleted: false }],
    }).sort({ name: 1 });
    res.json({ developments, page, pages: Math.ceil(count / pageSize) });
  } else {
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

    const keywordName = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Development.countDocuments({
      $and: [
        { deleted: false },
        {
          $or: [{ ...keywordName }],
        },
      ],
    });

    const developments = await Development.find({
      $and: [
        { deleted: false },
        {
          $or: [{ ...keywordName }],
        },
      ],
    })
      .sort(sortCondition)
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ developments, page, pages: Math.ceil(count / pageSize) });
  }
});
// Development Edit
module.exports.editDevelopment = asyncHandler(async (req, res) => {
  const data = JSON.parse(req.body.development);
  const development = await Development.findOneAndUpdate(
    { _id: req.params.id },
    data
  );
  if (req.files?.length >= 1) {
    for (const file of req.files) {
      if (file.originalname == "image") {
        const imageProduct = await cloudinary.uploader.upload(file.path, {
          folder: "Rio/sevelopments/",
        });
        var uploadImage = {
          url: imageProduct.secure_url,
          filename: imageProduct.public_id,
        };
        development.images = [];
        development.images.push(uploadImage);
      }
      try {
        await unlink(file.path);
        console.log(`successfully deleted ${file.path}`);
      } catch (error) {
        console.error("there was an error:", error.message);
      }
    }
  }
  await development.save();
  res.status(200).json({ message: "Development updated" });
});

// Development Delete
module.exports.deleteDevelopment = asyncHandler(async (req, res) => {
  const development = await Development.findById(req.params.id);
  development.deleted = true;
  await development.save();
  res.status(201).json("Development deleted");
});
// Development Create
module.exports.createDevelopment = asyncHandler(async (req, res) => {
  const data = JSON.parse(req.body.development);
  const development = new Development(data);
  const currentUser = await User.findById(req.user._id);
  development.user = currentUser;
  if (req.files?.length >= 1) {
    for (const file of req.files) {
      if (file.originalname == "image") {
        const imageDevelopment = await cloudinary.uploader.upload(file.path, {
          folder: "Rio/developments/",
        });
        var uploadImage = {
          url: imageDevelopment.secure_url,
          filename: imageDevelopment.public_id,
        };
        development.images.push(uploadImage);

        try {
          await unlink(file.path);
          console.log(`successfully deleted ${file.path}`);
        } catch (error) {
          console.error("there was an error:", error.message);
        }
      }
    }
  }
  await development.save();
  res.status(201).json({ message: "Development created" });
});
//Products CRUD
module.exports.createProduct = asyncHandler(async (req, res) => {
  const data = JSON.parse(req.body.product);
  const product = new Product(data);
  const currentUser = await User.findById(req.user._id);
  product.user = currentUser;
  if (req.files?.length >= 1) {
    for (const file of req.files) {
      switch (file.originalname) {
        case "imageProperty":
          const imageProduct1 = await cloudinary.uploader.upload(file.path, {
            folder: "Rio/products/" + product._id + "/",
          });
          var uploadImage = {
            url: imageProduct1.secure_url,
            filename: imageProduct1.public_id,
          };
          product.imageProperty = uploadImage;
          break;
        case "architecturalPlaque":
          let imageProduct2 = await cloudinary.uploader.upload(file.path, {
            folder: "Rio/products/" + product._id + "/",
          });
          var uploadImage = {
            url: imageProduct2.secure_url,
            filename: imageProduct2.public_id,
          };
          product.architecturalPlaque = uploadImage;
          break;
        case "floorPlan":
          const imageProduct3 = await cloudinary.uploader.upload(file.path, {
            folder: "Rio/products/" + product._id + "/",
          });
          var uploadImage = {
            url: imageProduct3.secure_url,
            filename: imageProduct3.public_id,
          };
          product.floorPlan = uploadImage;
          break;
        default:
          // Code to handle other cases or do nothing
          break;
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
  const productExist = await Product.findOne({
    $and: [
      { _id: { $ne: req.params.id } }, // Not include the current product
      {
        $or: [
          data.skuTrep && { skuTrep: data.skuTrep },
          data.eanUpc && { eanUpc: data.eanUpc },
          data.skuLiverpool && { skuLiverpool: data.skuLiverpool },
        ].filter(Boolean),
      },
      { deleted: false },
    ],
  });
  if (!productExist) {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      data
    );
    if (req.files?.length >= 1) {
      for (const file of req.files) {
        if (file.originalname == "image") {
          const imageProduct = await cloudinary.uploader.upload(file.path, {
            folder: "Rio/products/",
          });
          var uploadImage = {
            url: imageProduct.secure_url,
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
    res.status(200).json({ message: "Product updated" });
  } else {
    if (req.files?.length >= 1) {
      for (const file of req.files) {
        try {
          await unlink(file.path);
          console.log(`successfully deleted ${file.path}`);
        } catch (error) {
          console.error("there was an error:", error.message);
        }
      }
    }
    if (data.skuTrep && productExist.skuTrep === data.skuTrep) {
      throw new Error("Producto ya existe, revise su SKU-TREP");
    } else if (data.eanUpc && productExist.eanUpc === data.eanUpc) {
      throw new Error("Producto ya existe, revise su EAN-UPC");
    } else if (
      data.skuLiverpool &&
      productExist.skuLiverpool === data.skuLiverpool
    ) {
      throw new Error("Producto ya existe, revise su SKU-Liverpool");
    }
  }
});

module.exports.viewProducts = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize);
  const page = Number(req.query.pageNumber) || 1;
  const sort = req.query.sort;
  const order = req.query.order;
  var sortCondition = {};
  if (sort && order && (order === "ascending" || order === "descending")) {
    switch (sort) {
      case "numero":
        sortCondition[sort] = order === "ascending" ? 1 : -1;
        break;
      case "recamaras":
        sortCondition[sort] = order === "ascending" ? 1 : -1;
        break;
      case "mt2":
        sortCondition[sort] = order === "ascending" ? 1 : -1;
        break;
      case "precioDeLista":
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

  const products = await Product.find({
    $and: [
      { deleted: false },
      {
        $or: [{ ...keywordSkuTrep }, { ...keywordName }],
      },
    ],
  })
    .sort(sortCondition)
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
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
// Category CRUD
module.exports.createCategory = asyncHandler(async (req, res) => {
  const category = new Category();
  const currentUser = await User.findById(req.user._id);
  category.user = currentUser;
  category.name = req.body.category;
  category.save();
  res.status(201).json({ message: "Category created" });
});
module.exports.viewCategories = asyncHandler(async (req, res) => {
  if (req.query.all) {
    const categories = await Category.find({});
    res.json({ categories });
  } else {
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
    const count = await Category.countDocuments({
      $and: [
        { deleted: false },
        {
          $or: [{ ...keywordSkuTrep }, { ...keywordName }],
        },
      ],
    });

    const categories = await Category.find({
      $and: [
        { deleted: false },
        {
          $or: [{ ...keywordSkuTrep }, { ...keywordName }],
        },
      ],
    })
      .sort(sortCondition)
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ categories, page, pages: Math.ceil(count / pageSize) });
  }
});
module.exports.viewCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    res.json(category);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});
module.exports.editCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    { _id: req.params.id },
    { name: req.body.category }
  );
  await category.save();
  res.status(201).json(category);
});
module.exports.deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  category.deleted = true;
  await category.save();
  res.status(201).json({ message: "Category deleted" });
});

// Brand CRUD
module.exports.createBrand = asyncHandler(async (req, res) => {
  const brand = new Brand();
  const currentUser = await User.findById(req.user._id);
  brand.user = currentUser;
  brand.name = req.body.brand.name;
  brand.porcentaje = req.body.brand.porcentaje;
  brand.save();
  res.status(201).json({ message: "Brand created" });
});
module.exports.viewBrands = asyncHandler(async (req, res) => {
  if (req.query.all) {
    const brands = await Brand.find({});
    res.json({ brands });
  } else {
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
    const count = await Brand.countDocuments({
      $and: [
        { deleted: false },
        {
          $or: [{ ...keywordSkuTrep }, { ...keywordName }],
        },
      ],
    });

    const brands = await Brand.find({
      $and: [
        { deleted: false },
        {
          $or: [{ ...keywordSkuTrep }, { ...keywordName }],
        },
      ],
    })
      .sort(sortCondition)
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ brands, page, pages: Math.ceil(count / pageSize) });
  }
});
module.exports.viewBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  if (brand) {
    res.json(brand);
  } else {
    res.status(404);
    throw new Error("Brand not found");
  }
});
module.exports.editBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findByIdAndUpdate(
    { _id: req.params.id },
    { name: req.body.brand }
  );
  await brand.save();
  res.status(201).json(brand);
});
module.exports.deleteBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  brand.deleted = true;
  await brand.save();
  res.json({ message: "Brand deleted" });
});

// Parcel CRUD
module.exports.createParcel = asyncHandler(async (req, res) => {
  const parcel = new Parcel();
  const currentUser = await User.findById(req.user._id);
  parcel.user = currentUser;
  parcel.name = req.body.parcel;
  parcel.save();
  res.status(201).json({ message: "Parcel created" });
});
module.exports.viewParcels = asyncHandler(async (req, res) => {
  if (req.query.all) {
    const parcels = await Parcel.find({});
    res.json({ parcels });
  } else {
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
    const count = await Parcel.countDocuments({
      $and: [
        { deleted: false },
        {
          $or: [{ ...keywordSkuTrep }, { ...keywordName }],
        },
      ],
    });

    const parcels = await Parcel.find({
      $and: [
        { deleted: false },
        {
          $or: [{ ...keywordSkuTrep }, { ...keywordName }],
        },
      ],
    })
      .sort(sortCondition)
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ parcels, page, pages: Math.ceil(count / pageSize) });
  }
});
module.exports.viewParcel = asyncHandler(async (req, res) => {
  const parcel = await Parcel.findById(req.params.id);
  if (parcel) {
    res.json(parcel);
  } else {
    res.status(404);
    throw new Error("Parcel not found");
  }
});
module.exports.editParcel = asyncHandler(async (req, res) => {
  const parcel = await Parcel.findByIdAndUpdate(
    { _id: req.params.id },
    { name: req.body.parcel }
  );
  await parcel.save();
  res.status(201).json(parcel);
});
module.exports.deleteParcel = asyncHandler(async (req, res) => {
  const parcel = await Parcel.findById(req.params.id);
  parcel.deleted = true;
  await parcel.save();
  res.json({ message: "Parcel deleted" });
});

// Discount CRUD
module.exports.createDiscount = asyncHandler(async (req, res) => {
  const data = req.body.discount;
  var startDate = new Date(data.startDate);
  var endDate = new Date(data.endDate);
  endDate.setUTCMinutes(59);
  endDate.setUTCSeconds(59);
  endDate.setUTCHours(endDate.getUTCHours() + 23);
  data.startDate = startDate;
  data.endDate = endDate;
  const newDiscount = new Discount(data);
  const currentUser = await User.findById(req.user._id);
  newDiscount.user = currentUser;
  await newDiscount.save();
  res.status(201).json({ message: "Discount created" });
});
module.exports.deleteDiscount = asyncHandler(async (req, res) => {
  const discount = await Discount.findById(req.params.id);
  discount.deleted = true;
  await discount.save();
  res.json({ message: "Discount deleted" });
});
module.exports.editDiscount = asyncHandler(async (req, res) => {
  const data = req.body.discount;
  var startDate = new Date(data.startDate);
  var endDate = new Date(data.endDate);
  endDate.setUTCMinutes(59);
  endDate.setUTCSeconds(59);
  endDate.setUTCHours(endDate.getUTCHours() + 23);
  data.startDate = startDate;
  data.endDate = endDate;
  const discount = await Discount.findByIdAndUpdate(
    { _id: req.params.id },
    data
  );
  await discount.save();
  res.status(201).json(discount);
});
module.exports.viewDiscounts = asyncHandler(async (req, res) => {
  if (req.query.all) {
    const discounts = await Discount.find({});
    res.json({ discounts });
  } else {
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
    const count = await Discount.countDocuments({
      $and: [
        { deleted: false },
        {
          $or: [{ ...keywordSkuTrep }, { ...keywordName }],
        },
      ],
    });

    const discounts = await Discount.find({
      $and: [
        { deleted: false },
        {
          $or: [{ ...keywordSkuTrep }, { ...keywordName }],
        },
      ],
    })
      .sort(sortCondition)
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ discounts, page, pages: Math.ceil(count / pageSize) });
  }
});
module.exports.viewDiscount = asyncHandler(async (req, res) => {
  const discount = await Discount.findById(req.params.id);
  if (discount) {
    res.json(discount);
  } else {
    res.status(404);
    throw new Error("Discount not found");
  }
});

//Marketplaces CRUD
module.exports.createMarketplace = asyncHandler(async (req, res) => {
  const data = req.body.marketplace;
  const newMarketplace = new Marketplace(data);
  const currentUser = await User.findById(req.user._id);
  newMarketplace.user = currentUser;
  await newMarketplace.save();
  res.status(201).json({ message: "Marketplace created" });
});
module.exports.deleteMarketplace = asyncHandler(async (req, res) => {
  const marketplace = await Marketplace.findById(req.params.id);
  marketplace.deleted = true;
  await marketplace.save();
  res.json({ message: "Marketplace deleted" });
});
module.exports.editMarketplace = asyncHandler(async (req, res) => {
  const data = req.body.marketplace;
  const marketplace = await Marketplace.findByIdAndUpdate(
    { _id: req.params.id },
    data
  );
  await marketplace.save();
  res.status(201).json(marketplace);
});
module.exports.viewMarketplaces = asyncHandler(async (req, res) => {
  if (req.query.all) {
    const marketplaces = await Marketplace.find({}).populate();
    res.json({ marketplaces });
  } else {
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
    const count = await Marketplace.countDocuments({
      $and: [
        { deleted: false },
        {
          $or: [{ ...keywordSkuTrep }, { ...keywordName }],
        },
      ],
    });

    const marketplaces = await Marketplace.find({
      $and: [
        { deleted: false },
        {
          $or: [{ ...keywordSkuTrep }, { ...keywordName }],
        },
      ],
    })
      .sort(sortCondition)
      .populate()
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ marketplaces, page, pages: Math.ceil(count / pageSize) });
  }
});
module.exports.viewMarketplace = asyncHandler(async (req, res) => {
  const marketplace = await Marketplace.findById(req.params.id);
  if (marketplace) {
    res.json(marketplace);
  } else {
    res.status(404);
    throw new Error("Marketplace not found");
  }
});

// ADVISER
//ADVISER CRUD
module.exports.createAdviser = asyncHandler(async (req, res) => {
  const data = req.body.adviser;
  data.userType = "Adviser";
  data.username = data.email;
  data.deleted = false;
  const password = req.body.password;
  const adviser = await User.register(data, password);
  const currentUser = await User.findById(req.user._id);
  adviser.user = currentUser;
  await adviser.save();
  res.status(201).json({ message: "Adviser created" });
});
module.exports.deleteAdviser = asyncHandler(async (req, res) => {
  const adviser = await User.findById(req.params.id);
  adviser.deleted = true;
  await adviser.save();
  res.json({ message: "Adviser deleted" });
});
module.exports.editAdviser = asyncHandler(async (req, res) => {
  const data = req.body.adviser;
  data.username = data.email;
  const password = req.body.password;
  const adviser = await User.findByIdAndUpdate({ _id: req.params.id }, data);
  if (password) {
    await adviser.setPassword(password, function (err, user) {
      adviser.save();
    });
  }
  await adviser.save();
  res.status(201).json(adviser);
});
module.exports.viewAdvisers = asyncHandler(async (req, res) => {
  if (req.query.all) {
    const advisers = await User.find({ userType: "Adviser" });
    res.json({ advisers });
  } else {
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
    const count = await User.countDocuments({
      $and: [
        { deleted: false },
        { userType: "Adviser" },
        {
          $or: [{ ...keywordSkuTrep }, { ...keywordName }],
        },
      ],
    });

    const advisers = await User.find({
      $and: [
        { deleted: false },
        { userType: "Adviser" },
        {
          $or: [{ ...keywordSkuTrep }, { ...keywordName }],
        },
      ],
    })
      .sort(sortCondition)
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ advisers, page, pages: Math.ceil(count / pageSize) });
  }
});
module.exports.viewAdviser = asyncHandler(async (req, res) => {
  const adviser = await User.findById(req.params.id);
  if (adviser) {
    res.json(adviser);
  } else {
    res.status(404);
    throw new Error("Adviser not found");
  }
});
// Order CRUD
module.exports.createOrder = asyncHandler(async (req, res) => {
  const data = JSON.parse(req.body.order);
  const newOrder = new Order(data);
  const currentUser = await User.findById(req.user._id);
  newOrder.user = currentUser;
  if (req.files?.length >= 1) {
    for (const file of req.files) {
      if (file.originalname === "shippingGuide") {
        const fileShippingGuide = await cloudinary.uploader.upload(file.path, {
          folder: "Rio/shippingGuides/",
        });
        var uploadShippingGuide = {
          url: fileShippingGuide.secure_url,
          filename: fileShippingGuide.public_id,
        };
        newOrder.shippingGuide = uploadShippingGuide;
      }
      if (file.originalname === "deliveryNote") {
        const fileDeliveryNote = await cloudinary.uploader.upload(file.path, {
          folder: "Rio/deliveryNotes/",
        });
        var uploadDeliveryNote = {
          url: fileDeliveryNote.secure_url,
          filename: fileDeliveryNote.public_id,
        };
        newOrder.deliveryNote = uploadDeliveryNote;
      }
      try {
        await unlink(file.path);
        console.log(`successfully deleted ${file.path}`);
      } catch (error) {
        console.error("there was an error:", error.message);
      }
    }
  }
  await newOrder.save();
  res.status(201).json({ message: "Order created" });
});
module.exports.deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  order.deleted = true;
  await order.save();
  res.status(201).json("Order deleted");
});
module.exports.editOrder = asyncHandler(async (req, res) => {
  if (req.body.status && req.params.id) {
    const order = await Order.findById(req.params.id);
    const status = req.body.status;
    if (order) {
      if (
        (order.status === "Cancelado" ||
          order.status === "Devolución" ||
          order.status === "Rechazado por proveedor" ||
          order.status === "Pendiente") &&
        (status === "En proceso" || status === "Enviado")
      ) {
        const updateOperations = order.products.map(
          ({ product, quantity }) => ({
            updateOne: {
              filter: { _id: product },
              update: { $inc: { countInStock: -quantity } }, // Decrease countInStock by the quantity
            },
          })
        );
        await Product.bulkWrite(updateOperations)
          .then((result) => {
            console.log(`Updated ${result.modifiedCount} products`);
          })
          .catch((error) => {
            console.error(`Error updating products: ${error}`);
          });
      } else if (
        (order.status === "En proceso" || order.status === "Enviado") &&
        (status === "Cancelado" || status === "Devolución")
      ) {
        const updateOperations = order.products.map(
          ({ product, quantity }) => ({
            updateOne: {
              filter: { _id: product },
              update: { $inc: { countInStock: quantity } }, // Decrease countInStock by the quantity
            },
          })
        );
        await Product.bulkWrite(updateOperations)
          .then((result) => {
            console.log(`Updated ${result.modifiedCount} products`);
          })
          .catch((error) => {
            console.error(`Error updating products: ${error}`);
          });
      }
      order.status = status;
      await order.save();
      res.status(200).json({ message: "Order updated" });
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  }
  res.status(404);
  throw new Error("Order not found");
});
module.exports.exportOrders = asyncHandler(async (req, res) => {
  const exportSettings = req.body.exportSettings;
  // Create Excel workbook and worksheet
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("Ordenes");
  // Define headers
  worksheet.columns = [
    { header: "Company", key: "null", width: 10 },
    { header: "User", key: "null", width: 10 },
    { header: "Customer", key: "null", width: 10 },
    { header: "Customer Reference", key: "orderId", width: 25 },
    { header: "Customer", key: "null", width: 10 },
    {
      header: "Safilo Sku Code(13)",
      key: "skuTrep",
      width: 25,
    },
    { header: "Quantity", key: "quantity", width: 10 },
    { header: "Price", key: "null", width: 10 },
    { header: "Apply", key: "null", width: 10 },
    { header: "Fix", key: "null", width: 10 },
    { header: "Addictional Line Description", key: "null", width: 10 },
    { header: "Spare Part", key: "null", width: 10 },
    { header: "Customer", key: "null", width: 10 },
    { header: "Order", key: "null", width: 10 },
    { header: "Order", key: "null", width: 10 },
    { header: "Order", key: "null", width: 10 },
    { header: "Special", key: "null", width: 10 },
    { header: "Commessa", key: "null", width: 10 },
    { header: "Order", key: "null", width: 10 },
    { header: "Type Of", key: "null", width: 10 },
    { header: "IncoTerm*", key: "null", width: 10 },
    { header: "Nr Of", key: "null", width: 10 },
    { header: "Warehouse", key: "null", width: 10 },
    { header: "Order Date", key: "null", width: 10 },
    { header: "Confirmed", key: "null", width: 10 },
    { header: "Price List", key: "null", width: 10 },
    // Add columns for other fields as needed
  ];
  // Apply style to multiple header cells
  ["A", "B", "C", "G", "H"].forEach((column) => {
    const headerCell = worksheet.getCell(column + "1");
    headerCell.style = {
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF0000" },
      },
      font: { bold: true },
    };
  });
  [
    "E",
    "F",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Z",
    "AA",
  ].forEach((column) => {
    const headerCell = worksheet.getCell(column + "1");
    headerCell.style = {
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFF00" },
      },
      font: { bold: true },
    };
  });
  ["D"].forEach((column) => {
    const headerCell = worksheet.getCell(column + "1");
    headerCell.style = {
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "00FF00" },
      },
      font: { bold: true },
    };
  });
  const orders =
    exportSettings.mode === "orderId"
      ? await Order.find({
          $and: [{ deleted: false }, { _id: { $in: exportSettings.ids } }],
        }).populate([
          {
            path: "products.product",
            model: "Product",
            select: "skuTrep",
          },
        ])
      : await Order.find({
          $and: [
            { deleted: false },
            {
              adviser:
                exportSettings.adviser === "all"
                  ? { $exists: true }
                  : exportSettings.adviser,
            },
            {
              status:
                exportSettings.status === "all"
                  ? { $exists: true }
                  : exportSettings.status,
            },
            {
              createdAt: exportSettings.startDate
                ? {
                    $gt: new Date(exportSettings.startDate),
                  }
                : { $exists: true },
            },
            {
              createdAt: exportSettings.endDate
                ? {
                    $lt: new Date(exportSettings.endDate),
                  }
                : { $exists: true },
            },
          ],
        }).populate([
          {
            path: "products.product",
            model: "Product",
            select: "skuTrep",
          },
        ]);

  const formattedOrders = [];
  orders.forEach((order) => {
    order.products.forEach((element) => {
      const obj = {
        orderId: order.orderId,
        skuTrep: element.product.skuTrep,
        quantity: element.quantity,
      };
      formattedOrders.push(obj);
    });
  });

  // Add data to worksheet
  formattedOrders.forEach((order) => {
    worksheet.addRow(order);
  });
  // Create a stream of the workbook
  const stream = new PassThrough();
  await workbook.xlsx.write(stream);

  // Set the response headers
  res.setHeader("Content-Disposition", 'attachment; filename="Ordenes.xlsx"');
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );

  // Send the workbook as a response
  stream.pipe(res);
});
module.exports.viewOrders = asyncHandler(async (req, res) => {
  if (req.query.all && req.query.all === "1") {
    const orders = await Order.find({ deleted: false }).select("orderId");
    res.json({ orders });
  } else {
    const pageSize = Number(req.query.pageSize);
    const page = Number(req.query.pageNumber) || 1;
    const sort = req.query.sort;
    const order = req.query.order;
    var sortCondition = {};
    switch (sort) {
      case "orderId":
        sortCondition[sort] = order === "ascending" ? -1 : 1;
        break;
      case "adviser":
        sortCondition[sort + ".name"] = order === "ascending" ? -1 : 1;
        break;
      case "marketplace":
        sortCondition[sort + ".name"] = order === "ascending" ? -1 : 1;
        break;
      case "parcel":
        sortCondition[sort + ".name"] = order === "ascending" ? -1 : 1;
        break;
      case "total":
        sortCondition[sort] = order === "ascending" ? -1 : 1;
        break;
      case "createdAt":
        sortCondition[sort] = order === "ascending" ? -1 : 1;
        break;
      case "status":
        sortCondition[sort] = order === "ascending" ? -1 : 1;
        break;
      default:
        sortCondition["createdAt"] = -1;
    }
    const regexPattern = req.query.keyword
      ? new RegExp(req.query.keyword, "i")
      : null;

    //
    const aggregateQuery = [
      {
        $match: { deleted: false },
      },
      {
        $lookup: {
          from: "users", // Replace with the actual collection name for "User" model
          localField: "adviser",
          foreignField: "_id",
          as: "adviser",
        },
      },
      {
        $lookup: {
          from: "marketplaces", // Replace with the actual collection name for "User" model
          localField: "marketplace",
          foreignField: "_id",
          as: "marketplace",
        },
      },
      {
        $lookup: {
          from: "parcels", // Replace with the actual collection name for "User" model
          localField: "parcel",
          foreignField: "_id",
          as: "parcel",
        },
      },
      {
        $unwind: "$adviser",
      },
      {
        $unwind: "$marketplace",
      },
      {
        $unwind: "$parcel",
      },
    ];
    //
    if (regexPattern) {
      aggregateQuery.push({
        $match: {
          $or: [
            {
              orderId: regexPattern,
            },
            {
              status: regexPattern,
            },
            {
              "adviser.name": regexPattern,
            },
            {
              "marketplace.name": regexPattern,
            },

            {
              "parcel.name": regexPattern,
            },
          ],
        },
      });
    }
    //
    const count = await Order.aggregate(aggregateQuery).count("count");
    //
    aggregateQuery.push(
      {
        $sort: sortCondition, // ReplOace with your desired sorting criteria
      },
      {
        $skip: pageSize * (page - 1), // Replace with the number of documents to skip
      },
      {
        $limit: pageSize, // Replace with the number of documents to limit
      }
    );
    const search = await Order.aggregate(aggregateQuery);
    const orders = await Order.populate(search, [
      {
        path: "adviser",
        model: "User",
        select: "name",
      },
      {
        path: "marketplace",
        model: "Marketplace",
        select: "name",
      },
      {
        path: "parcel",
        model: "Parcel",
        select: "name",
      },
    ]);

    res.json({ orders, page, pages: Math.ceil(count[0].count / pageSize) });
  }
});
module.exports.viewOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate([
    {
      path: "adviser",
      model: "User",
      select: "name",
    },
    {
      path: "marketplace",
      model: "Marketplace",
      select: "name",
    },
    {
      path: "parcel",
      model: "Parcel",
      select: "name",
    },
    {
      path: "products.product",
      model: "Product",
      populate: [
        {
          path: "categories",
          model: "Category",
          select: "name",
        },
        {
          path: "brand",
          model: "Brand",
          select: "name",
        },
      ],
    },
  ]); /*.populate(
    "brand categories"
  );*/
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
