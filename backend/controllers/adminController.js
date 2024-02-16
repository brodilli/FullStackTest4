const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const User = require("../models/userModel");

const { cloudinary } = require("../cloudinary");
const { unlink } = require("node:fs/promises");
const Excel = require("exceljs");
const { PassThrough } = require("stream");

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
