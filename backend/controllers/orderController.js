const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const Excel = require("exceljs");
const { PassThrough } = require("stream");

module.exports.editOrder = asyncHandler(async (req, res) => {
  if (req.body.status && req.params.id) {
    const order = await Order.findById(req.params.id);
    const status = req.body.status;
    if (order) {
      if (order.status === "Pendiente" && status === "En proceso") {
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
module.exports.viewOrders = asyncHandler(async (req, res) => {
  if (req.query.all && req.query.all === "1") {
    const orders = await Order.find({
      $and: [{ deleted: false }, { supplier: req.user._id }],
    }).select("orderId");
    res.json({ orders });
  } else {
    const pageSize = Number(req.query.pageSize);
    const page = Number(req.query.pageNumber) || 1;
    const sort = req.query.sort;
    const order = req.query.order;
    // -----------------------------
    var sortCondition = {};
    switch (sort) {
      case "orderId":
        sortCondition[sort] = order === "ascending" ? -1 : 1;
        break;
      case "supplier":
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
    // -----------------------------
    const regexPattern = req.query.keyword
      ? new RegExp(req.query.keyword, "i")
      : null;
    // -----------------------------
    const aggregateQuery = [
      {
        $match: { deleted: false, supplier: req.user._id },
      },
      {
        $lookup: {
          from: "users", // Replace with the actual collection name for "User" model
          localField: "supplier",
          foreignField: "_id",
          as: "supplier",
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
        $unwind: "$supplier",
      },
      {
        $unwind: "$marketplace",
      },
      {
        $unwind: "$parcel",
      },
    ];
    // -----------------------------
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
              "supplier.name": regexPattern,
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
    // -----------------------------
    const count = await Order.aggregate(aggregateQuery).count("count");
    // -----------------------------
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
    // -----------------------------

    const search = await Order.aggregate(aggregateQuery);
    const orders = await Order.populate(search, [
      {
        path: "supplier",
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
  const order = await Order.findOne({
    $and: [
      { _id: req.params.id },
      { supplier: req.user._id },
      { deleted: false },
    ],
  }).populate([
    {
      path: "supplier",
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
  const currentUser = await User.findById(req.user._id);
  if (order.supplier._id.equals(currentUser._id)) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

module.exports.exportOrders = asyncHandler(async (req, res) => {
  try {
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
                supplier: req.user._id,
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
  } catch (error) {
    console.error("there was an error:", error.message);
  }
});
