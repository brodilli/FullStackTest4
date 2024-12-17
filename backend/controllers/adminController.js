const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const PaymentMethod = require("../models/paymentMethodModel");

const { cloudinary } = require("../cloudinary");
const { unlink } = require("node:fs/promises");



//PAYMENT METHOD
//PAYMENT METHOD CRUD
module.exports.createPaymentMethod = asyncHandler(async (req, res) => {
  console.log("Creating Payment Method");
  const data = req.body;
 
  const currentUser = await User.findById(req.user._id);
  data.user = currentUser;

  const paymentMethod = new PaymentMethod(data);
  await paymentMethod.save();
  res.status(201).json({ message: "Payment Method created" });
}
);
module.exports.deletePaymentMethod = asyncHandler(async (req, res) => {
  const paymentMethod = await PaymentMethod.findById(req.params.id);
  paymentMethod.deleted = true;
  await paymentMethod.save();
  res.json({ message: "Payment Method deleted" });
});
module.exports.editPaymentMethod = asyncHandler(async (req, res) => {
  const data = req.body.paymentMethod;
  const paymentMethod = await PaymentMethod.findByIdAndUpdate({ _id: req.params.id }, data);
  await paymentMethod.save();
  res.status(201).json(paymentMethod);
});
// --------------- View Payment Methods ---------------
module.exports.viewPaymentMethods = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 10; // Tamaño de página por defecto
  const page = Number(req.query.pageNumber) || 1; // Página actual
  const sort = req.query.sort; // Campo para ordenar
  const order = req.query.order === "ascending" ? 1 : -1; // Orden: ascendente o descendente

  // Condición de ordenamiento
  const sortCondition = sort ? { [sort]: order } : {};

  // Filtro por palabra clave (busca en alias, titular, banco)
  const keyword = req.query.keyword
    ? {
        $or: [
          { alias: { $regex: req.query.keyword, $options: "i" } },
          { holder: { $regex: req.query.keyword, $options: "i" } },
          { bank: { $regex: req.query.keyword, $options: "i" } },
        ],
      }
    : {};

  // Contar total de métodos de pago (filtrando eliminados)
  const count = await PaymentMethod.countDocuments({
    deleted: false,
    ...keyword,
  });

  // Obtener métodos de pago con paginación, ordenamiento y filtros
  const paymentMethods = await PaymentMethod.find({
    deleted: false,
    ...keyword,
  })
    .sort(sortCondition)
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  // Respuesta al cliente
  res.json({
    paymentMethods,
    page,
    pages: Math.ceil(count / pageSize),
    totalPaymentMethods: count,
  });
});
module.exports.viewPaymentMethod = asyncHandler(async (req, res) => {
  const paymentMethod = await PaymentMethod.findById(req.params.id);
  if (paymentMethod) {
    res.json(paymentMethod);
  } else {
    res.status(404);
    throw new Error("Payment Method not found");
  }
});

// USER
//USER CRUD
module.exports.createUser = asyncHandler(async (req, res) => {
  // Find the current user
  const currentUser = await User.findById(req.user._id);
  // Fetch User data from the request body
  const data = req.body.user;
  const password = req.body.password;
  console.log(data);
  data.deleted = false;
  data.username = data.email;
  data.createdBy = currentUser;
  await User.register(data, password);
  res.status(201).json({ message: "User created" });
});
module.exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  user.deleted = true;
  await user.save();
  res.json({ message: "User deleted" });
});
module.exports.editUser = asyncHandler(async (req, res) => {
  const data = req.body.user;
  data.username = data.email;
  const password = req.body.password;
  const user = await User.findByIdAndUpdate({ _id: req.params.id }, data);
  await user.save();
  res.status(201).json(user);
});
module.exports.viewUsers = asyncHandler(async (req, res) => {
  // Si se pasa el parámetro `all`, devolver todos los usuarios sin paginación
  if (req.query.all) {
    const users = await User.find({
      userType: { $in: ["Administrador", "Supplier", "Client"] },
      deleted: false,
    });
    return res.json({ users });
  }

  // Paginación y ordenamiento
  const pageSize = Number(req.query.pageSize) || 10; // Tamaño de la página por defecto
  const page = Number(req.query.pageNumber) || 1; // Página actual
  const sortField = req.query.sort; // Campo por el cual ordenar
  const order = req.query.order === "ascending" ? 1 : -1; // Orden (1: ascendente, -1: descendente)

  // Validar el campo de ordenamiento
  const validSortFields = [
    "name",
    "lastName",
    "email",
    "phone",
    "username",
    "tradename",
    "userType",
  ];
  const sortCondition = validSortFields.includes(sortField)
    ? { [sortField]: order }
    : {};

  // Filtrado por palabra clave (name, lastName, email, tradename)
  const keyword = req.query.keyword
    ? {
        $or: [
          { name: { $regex: req.query.keyword, $options: "i" } },
          { lastName: { $regex: req.query.keyword, $options: "i" } },
          { email: { $regex: req.query.keyword, $options: "i" } },
          { tradename: { $regex: req.query.keyword, $options: "i" } },
        ],
      }
    : {};

  // Contar el total de documentos para paginación
  const count = await User.countDocuments({
    deleted: false,
    userType: { $in: ["Administrador", "Supplier", "Client"] },
    ...keyword,
  });

  // Obtener los usuarios con paginación y ordenamiento
  const users = await User.find({
    deleted: false,
    userType: { $in: ["Administrador", "Supplier", "Client"] },
    ...keyword,
  })
    .sort(sortCondition)
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  // Enviar respuesta
  res.json({
    users,
    page,
    pages: Math.ceil(count / pageSize),
    totalUsers: count,
  });
});

module.exports.viewUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/* ---------------------------- CATEGORY CRUD ----------------------------- */
// --------------- Create Category ---------------
module.exports.createCategory = asyncHandler(async (req, res) => {
  const data = req.body.category;
  const currentUser = await User.findById(req.user._id);
  data.user = currentUser;
  const category = new Category(data);
  await category.save();
  res.status(201).json({ message: "Category created" });
});
// --------------- View Categories ---------------
module.exports.viewCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json({ categories });
});
/* -------------------------- END CATEGORY CRUD --------------------------- */

/* ---------------------------- BRAND CRUD ----------------------------- */
// --------------- Create Brand ---------------
module.exports.createBrand = asyncHandler(async (req, res) => {
  const data = req.body;
  const currentUser = await User.findById(req.user._id);
  data.user = currentUser;
  const brand = new Brand(data);
  await brand.save();
  res.status(201).json({ message: "Brand created" });
});
// --------------- View Brands ---------------
module.exports.viewBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find({});
  res.json({ brands });
});
/* -------------------------- END BRAND CRUD --------------------------- */

/* -------------------------- PRODUCT CRUD ---------------------------- */
// --------------- Create Product ---------------
module.exports.createProduct = asyncHandler(async (req, res) => {
  // Get the data from the request body
  const data = JSON.parse(req.body.product);
  // Create a new product
  const newProduct = new Product(data);
  // Find the current user
  const currentUser = await User.findById(req.user._id);
  // Assign the current user as the creator of the product
  newProduct.user = currentUser;
  if (req.files?.length >= 1) {
    for (const file of req.files) {
      if (file.originalname == "image") {
        const imageProduct = await cloudinary.uploader.upload(file.path, {
          folder: "Test/products/",
        });
        var uploadImage = {
          url: imageProduct.secure_url,
          filename: imageProduct.public_id,
        };
        newProduct.image = uploadImage;
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
// --------------- Delete Product ---------------
module.exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  product.deleted = true;
  await product.save();
  res.status(201).json("Product deleted");
});
// --------------- Edit Product ---------------
module.exports.editProduct = asyncHandler(async (req, res) => {
  const data = JSON.parse(req.body.product);
  // --------------- Update product ---------------
  const product = await Product.findOneAndUpdate({ _id: req.params.id }, data);
  if (req.files?.length >= 1) {
    for (const file of req.files) {
      if (file.originalname == "image") {
        const imageProduct = await cloudinary.uploader.upload(file.path, {
          folder: "Test/products/",
        });
        var uploadImage = {
          url: imageProduct.secure_url,
          filename: imageProduct.public_id,
        };
        product.image = uploadImage;
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
// --------------- View Products ---------------
module.exports.viewProducts = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 10; // Tamaño de página por defecto
  const page = Number(req.query.pageNumber) || 1; // Página actual
  const sort = req.query.sort; // Campo para ordenar
  const order = req.query.order === "ascending" ? 1 : -1; // Orden: ascendente o descendente

  // Condición de ordenamiento
  const sortCondition = sort ? { [sort]: order } : {};

  // Filtro por palabra clave
  const keyword = req.query.keyword
    ? {
        $or: [
          { name: { $regex: req.query.keyword, $options: "i" } },
          { description: { $regex: req.query.keyword, $options: "i" } },
        ],
      }
    : {};

  // Contar total de productos para paginación
  const count = await Product.countDocuments({
    deleted: false,
    ...keyword,
  });

  // Obtener los productos
  const products = await Product.find({
    deleted: false,
    ...keyword,
  })
    .sort(sortCondition)
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  // Respuesta al cliente
  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
  });
});
// --------------- View Product ---------------
module.exports.viewProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json({ product });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
/* -------------------------- END PRODUCT CRUD ---------------------------- */
