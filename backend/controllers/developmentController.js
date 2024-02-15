const asyncHandler = require("express-async-handler");
const Development = require("../models/developmentModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
// Developments View
module.exports.viewDevelopments = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.user._id);
  const pageSize = Number(req.query.pageSize);
  const page = Number(req.query.pageNumber) || 1;
  const sort = req.query.sort;
  const order = req.query.order;
  const all = req.query.all;
  if (all === "true") {
    const count = await Development.countDocuments({
      $and: [{ deleted: false }, { _id: { $in: currentUser.developments } }],
    });
    const developments = await Development.find({
      $and: [{ deleted: false }, { _id: { $in: currentUser.developments } }],
    }).sort({ name: 1 });
    res.json({ developments, page, pages: Math.ceil(count / pageSize) });
  } else {
    var sortCondition = {};
    if (sort && order && (order === "ascending" || order === "descending")) {
      switch (sort) {
        case "name":
          sortCondition[sort] = order === "ascending" ? 1 : -1;
          break;
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
        { _id: { $in: currentUser.developments } },
        {
          $or: [{ ...keywordName }],
        },
      ],
    });

    const developments = await Development.find({
      $and: [
        { deleted: false },
        { _id: { $in: currentUser.developments } },
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

module.exports.filterLimitsByDevelopment = asyncHandler(async (req, res) => {
  const development = await Development.findById(req.params.id);
  if (development) {
    const filterLimits = await Product.aggregate([
      {
        $match: {
          development: development._id,
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
    res.json(filterLimits[0]);
  } else {
    res.status(404);
    throw new Error("Development not found");
  }
});
