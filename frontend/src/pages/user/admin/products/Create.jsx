import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { getLoginData } from "../../../../actions/userActions";
import { Input, InputFile } from "../../../../components/elements/Inputs";
import Alert from "../../../../components/alerts/Alert";
import SuccessAlert from "../../../../components/alerts/SuccessAlert";
import ComboBoxSingle from "../../../../components/elements/ComboBoxSingle";

import { PRODUCT_ADMIN_CREATE_RESET } from "../../../../constants/productConstants";
import { adminCreateProduct } from "../../../../actions/productActions";

import { Button, Typography, Switch } from "@material-tailwind/react";

export function ProductCreate() {
  const [product, setProduct] = useState({
    name: "",
    type: "Tubo", // Default enum value
    appearance: "Color", // Default enum value
    color: "", // Default enum value
    category: "Economico", // Default enum value
    diameter: 0,
    thickness: 0,
    length: 1.5, // Default value
    initialQuantity: 0,
    piecesPerBox: 0,
    weightPerBox: 0,
    tubeQuantityPerBox: 0,
    minimumQuantity: 0,
    unitOfMeasure: "Pieza", // Default enum value
    code: "",
    taxesIncluded: false,
    onSale: false,
    image: null, // For the product image file
  });
  // Función para generar un código compuesto
  const generateProductCode = useCallback(() => {
    const {
      name,
      type,
      appearance,
      color,
      category,
      diameter,
      thickness,
      length,
      unitOfMeasure,
    } = product;
    const categoryPrefix = category.slice(0, 3); // Obtiene los primeros 3 caracteres de 'category'
    const code = `${type[0]}${appearance[0]}${color}${categoryPrefix}${diameter}X${thickness}`;
    return code.toUpperCase(); // Convertir a mayúsculas si es necesario
  });

  const [selectedImages, setSelectedImages] = useState();
  const [showImageAlert, setShowImageAlert] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const adminProductCreate = useSelector((state) => state.adminProductCreate);
  const { error: errorCreateProduct, message: messageCreateProduct } =
    adminProductCreate;

  const adminBrandList = useSelector((state) => state.adminBrandList);
  const { brands = [] } = adminBrandList || {};

  const adminCategoryList = useSelector((state) => state.adminCategoryList);
  const { categories = [] } = adminCategoryList || {};

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleComboboxChange = (name, value) => {
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setProduct((prev) => ({ ...prev, [name]: checked }));
  };

  const submitHandler = () => {
    setShowImageAlert(false);
    setShowErrorMessage(false);

    const formData = new FormData();
    formData.append("product", JSON.stringify(product));

    if (selectedImages) {
      formData.append("files", selectedImages, "image");
    } else {
      setShowImageAlert(true);
      return;
    }

    dispatch(adminCreateProduct(formData));
  };

  useEffect(() => {
    if (messageCreateProduct) {
      dispatch({ type: PRODUCT_ADMIN_CREATE_RESET });
      navigate("/admin/productos");
    }
    if (!userInfo) {
      dispatch(getLoginData());
    }
  }, [dispatch, userInfo, messageCreateProduct, navigate]);

  useEffect(() => {
    // Actualiza el código cuando los datos cambian
    setProduct((prev) => ({
      ...prev,
      code: generateProductCode(),
    }));
  }, [
    product.name,
    product.type,
    product.color,
    product.appearance,
    product.category,
    product.diameter,
    product.thickness,
    product.length,
    product.unitOfMeasure,
    generateProductCode, // La función de generación de código
  ]);

  return (
    <div className="bg-slate-50 p-4">
      {showErrorMessage && (
        <Alert title="Error" text="No se pudo crear el producto." />
      )}
      <h2 className="text-palette-primary text-xl font-bold">
        Agregar Producto
      </h2>
      <form
        className=""
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler();
        }}
      >
        <div className="grid grid-cols-2 gap-6">
          {/* Column 1 */}
          <div className="flex flex-col gap-3">
            <Input
              title="Nombre"
              name="name"
              value={product.name}
              setValue={handleChange}
              required
            />

            {/* Select for Tipo */}
            <div>
              <label className="mb-1 block text-sm font-medium">Tipo</label>
              <select
                name="type"
                value={product.type}
                onChange={handleChange}
                className="w-full rounded-md border p-2"
                required
              >
                <option value="Tubo">Tubo</option>
                <option value="Varilla">Varilla</option>
              </select>
            </div>

            {/* Select for Apariencia */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                Apariencia
              </label>
              <select
                name="appearance"
                value={product.appearance}
                onChange={(e) => {
                  const { value } = e.target;
                  setProduct((prev) => ({
                    ...prev,
                    appearance: value,
                    color: value === "Transparente" ? "" : prev.color, // Si "Transparente", vaciar el color
                  }));
                }}
                className="w-full rounded-md border p-2"
                required
              >
                <option value="Color">Color</option>
                <option value="Transparente">Transparente</option>
              </select>
            </div>
            {/* Show Color input if appearance is Color */}
            {product.appearance === "Color" && (
              <Input
                title="Color"
                name="color"
                value={product.color}
                setValue={handleChange}
                required
              />
            )}

            {/* Select for Categoría */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                Categoría
              </label>
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                className="w-full rounded-md border p-2"
                required
              >
                <option value="Economico">Económico</option>
                <option value="Premiun">Premium</option>
              </select>
            </div>

            <Input
              title="Diámetro"
              name="diameter"
              type="number"
              value={product.diameter}
              setValue={handleChange}
              required
            />

            <Input
              title="Espesor"
              name="thickness"
              type="number"
              value={product.thickness}
              setValue={handleChange}
              required
            />

            <Input
              title="Longitud"
              name="length"
              type="number"
              value={product.length}
              setValue={handleChange}
              required
            />
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-3">
            <Input
              title="Cantidad Inicial"
              name="initialQuantity"
              type="number"
              value={product.initialQuantity}
              setValue={handleChange}
              required
            />

            <Input
              title="Piezas por Caja"
              name="piecesPerBox"
              type="number"
              value={product.piecesPerBox}
              setValue={handleChange}
              required
            />

            <Input
              title="Peso por Caja"
              name="weightPerBox"
              type="number"
              value={product.weightPerBox}
              setValue={handleChange}
              required
            />

            <Input
              title="Tubos por Caja"
              name="tubeQuantityPerBox"
              type="number"
              value={product.tubeQuantityPerBox}
              setValue={handleChange}
              required
            />

            <Input
              title="Cantidad Mínima"
              name="minimumQuantity"
              type="number"
              value={product.minimumQuantity}
              setValue={handleChange}
              required
            />

            {/* Select for Unidad de Medida */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                Unidad de Medida
              </label>
              <select
                name="unitOfMeasure"
                value={product.unitOfMeasure}
                onChange={handleChange}
                className="w-full rounded-md border p-2"
                required
              >
                <option value="Kg">Kg</option>
                <option value="Pieza">Pieza</option>
              </select>
            </div>

            <Input
              title="Código"
              name="code"
              value={product.code}
              setValue={handleChange}
              required
              disabled={true}
            />
          </div>
        </div>

        {/* Full-width Row for Image */}
        <div className="mt-6 flex flex-col gap-3">
          <InputFile
            name="product_image"
            title="Imagen del Producto"
            setValue={setSelectedImages}
          />
          {selectedImages && (
            <div className="mt-2 flex justify-center">
              <img
                src={URL.createObjectURL(selectedImages)}
                alt="Vista previa"
                className="max-h-40 w-auto rounded-md shadow-md"
              />
            </div>
          )}
        </div>

        {/* Contenedor Sticky para el Botón */}
        <div className="bg-slate-50 sticky bottom-0 col-span-full p-4 shadow-md">
          <Button
            type="submit"
            fullWidth
            className="rounded-md p-2 px-4 text-lg font-normal text-white hover:bg-opacity-90"
          >
            Crear Producto
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ProductCreate;
