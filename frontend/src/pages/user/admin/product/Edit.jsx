import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  adminDetailsProduct,
  adminUpdateProduct,
} from "../../../../actions/productActions";
import { getLoginData } from "../../../../actions/userActions";
import { adminListDevelopments } from "../../../../actions/developmentActions";
import { XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  InputFile,
  Input,
  CheckBox,
  InputSelect,
  Textarea,
  ComboBox,
} from "../../../../components/elements/Inputs";
import SuccessAlert from "../../../../components/alerts/SuccessAlert";
import Alert from "../../../../components/alerts/Alert";
import {
  adminCreateCategory,
  adminListCategories,
} from "../../../../actions/categoryActions";
import {
  adminCreateBrand,
  adminListBrands,
} from "../../../../actions/brandActions";
import { Button, Switch } from "@material-tailwind/react";
import { useMaterialTailwindController } from "../../../../context";
import Loader from "../../../../components/Loader";

export function ProductEdit() {
  const [product, setProduct] = useState({
    number: 0,
    development: "",
    type: "",
    level: 0,
    bedrooms: 2,
    parkingLots: 2,
    bathrooms: 1,
    mt2: 2,
    terrace: 0,
    price: 0,
    discountType: "Percentage",
    discount: 0,
    status: "Disponible",
    onSale: true,
  });
  const { id } = useParams();
  const [selectedImages, setSelectedImages] = useState();
  const [newCategory, setNewCategory] = useState("");
  const [newBrand, setNewBrand] = useState("");

  const [selectCategory, setSelectCategory] = useState("");
  const [filterCategories, setFilterCategories] = useState("");

  const productImage = useRef();
  const productInputImage = useRef();

  const [showSuccessCategory, setShowSuccessCategory] = useState(false);
  const [showSuccessBrand, setShowSuccessBrand] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [controller, setController] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const adminProductUpdate = useSelector((state) => state.adminProductUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    message: messageUpdate,
  } = adminProductUpdate;
  const adminProductDetails = useSelector((state) => state.adminProductDetails);
  const {
    loading: loadingDetails,
    error: errorDetails,
    productDetails,
  } = adminProductDetails;
  const adminCategoryCreate = useSelector((state) => state.adminCategoryCreate);
  const {
    loading: loadingCreateCategory,
    error: errorCreateCategory,
    message: messageCategory,
  } = adminCategoryCreate;
  const adminCategoryList = useSelector((state) => state.adminCategoryList);
  const {
    loading: loadingCategoryList,
    error: errorCategoryList,
    categories,
  } = adminCategoryList;
  const adminBrandCreate = useSelector((state) => state.adminBrandCreate);
  const {
    loading: loadingCreateBrand,
    error: errorCreateBrand,
    message: messageBrand,
  } = adminBrandCreate;
  const adminBrandList = useSelector((state) => state.adminBrandList);
  const {
    loading: loadingBrandList,
    error: errorBrandList,
    brands,
  } = adminBrandList;
  const adminDevelopmentsList = useSelector(
    (state) => state.adminDevelopmentsList
  );
  const {
    loading: loadindDevelopments,
    error: errorDevelopments,
    success,
    developments,
    page,
    pages,
  } = adminDevelopmentsList;
  const submitCategoryHandler = () => {
    dispatch(adminCreateCategory(newCategory));
  };
  const handleCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };
  const submitBrandHandler = () => {
    dispatch(adminCreateBrand(newBrand));
  };
  const handleBrandChange = (e) => {
    setNewBrand(e.target.value);
  };
  const handleChangeCombobox = (e) => {
    var add = true;
    product.categories.forEach((c) => {
      if (c._id === e._id) return (add = false);
    });
    if (add) {
      setProduct((prevState) => ({
        ...prevState,
        categories: [...prevState["categories"], e],
      }));
    }
  };
  const handleChange = (e) =>
    setProduct((prevState) => ({
      ...prevState,
      [e.target.name.split(".")[0]]:
        e.target.name.split(".").length === 2
          ? {
              ...prevState[e.target.name.split(".")[0]],
              [e.target.name.split(".")[1]]: e.target.value,
            }
          : e.target.value,
    }));
  const handleChangeCheckbox = (e) =>
    setProduct((prevState) => ({
      ...prevState,
      [e.target.name.split(".")[0]]:
        e.target.name.split(".").length === 2
          ? {
              ...prevState[e.target.name.split(".")[0]],
              [e.target.name.split(".")[1]]: e.target.checked,
            }
          : e.target.checked,
    }));
  const handleChangePercentage = (e) =>
    setProduct((prevState) => ({
      ...prevState,
      [e.target.name.split(".")[0]]:
        e.target.name.split(".").length === 2
          ? {
              ...prevState[e.target.name.split(".")[0]],
              [e.target.name.split(".")[1]]: e.target.checked
                ? "Percentage"
                : "Amount",
            }
          : e.target.checked
          ? "Percentage"
          : "Amount",
    }));
  const submitHandler = () => {
    setShowErrorMessage(false);
    const formData = new FormData();
    var arr = [];
    product.categories.forEach((c) => {
      arr.push(c._id);
    });
    var p = { ...product };
    p.categories = arr;
    formData.append("product", JSON.stringify(p));

    if (selectedImages) {
      formData.append("files", selectedImages, "image");
    }
    if (id) dispatch(adminUpdateProduct(id, formData));
  };
  const redirect = "/login";
  useEffect(() => {
    if (messageUpdate) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } else if (errorUpdate) {
      setShowErrorMessage(true);
    }
    if (!userInfo) {
      dispatch(getLoginData());
    } else if (userInfo.userType !== "Admin") {
      navigate(redirect);
    } else if (id && (!productDetails || productDetails._id !== id)) {
      dispatch(adminListCategories());
      dispatch(adminListDevelopments());
      dispatch(adminListBrands());
      dispatch(adminDetailsProduct(id));
    }
    if (messageCategory) {
      setNewCategory("");
      setShowSuccessCategory(true);
      setTimeout(() => {
        setShowSuccessCategory(false);
      }, 3000);
    }
    if (messageBrand) {
      setNewBrand("");
      setShowSuccessBrand(true);
      setTimeout(() => {
        setShowSuccessBrand(false);
      }, 3000);
    }
    if (productDetails) {
      setProduct(productDetails);
    }
  }, [
    userInfo,
    messageUpdate,
    messageCategory,
    messageBrand,
    productDetails,
    errorUpdate,
  ]);
  return (
    <div className="bg-slate-50 flex min-h-[85vh] flex-col p-4">
      {showErrorMessage && (
        <div className="fixed bottom-0 left-0 right-0 z-10 flex items-end justify-center p-4">
          <div
            id="toast-danger"
            className="mb-4 flex w-full max-w-xs items-center justify-between rounded-lg bg-red-100 p-4 text-gray-800 shadow dark:bg-gray-800 dark:text-gray-400"
            role="alert"
          >
            <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white text-red-500 dark:bg-red-800 dark:text-red-200">
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
              </svg>
              <span className="sr-only">Error icon</span>
            </div>
            <div className="ms-3 px-3 text-sm font-normal">
              {errorUpdate ? errorUpdate : ""}
            </div>
            <button
              type="button"
              className="ms-auto  -mx-1.5 -my-1.5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-200 p-1.5 text-white hover:bg-gray-100 hover:text-red-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
              data-dismiss-target="#toast-danger"
              aria-label="Close"
              onClick={() => setShowErrorMessage(false)}
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
      <h2 className="text-xl font-bold">Editar Producto</h2>
      {loadingDetails || loadingBrandList || loadingCategoryList ? (
        <div className="flex h-[75vh] w-full items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <form
            className="grid  gap-2 md:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              submitHandler();
            }}
          >
            <div className="flex flex-col gap-3">
              <Input
                title="Numero"
                name="number"
                type="number"
                required={true}
                value={product.number}
                setValue={handleChange}
              />
              <InputSelect
                title="Desarrollo"
                name="development"
                value={product.development}
                setValue={handleChange}
              >
                <option disabled value="">
                  {" "}
                  Seleccione una opcion{" "}
                </option>
                {developments?.map((development) => (
                  <option value={development._id} key={development._id}>
                    {development.name}
                  </option>
                ))}
              </InputSelect>
              <InputSelect
                title="Tipo"
                name="type"
                value={product.type}
                setValue={handleChange}
              >
                <option disabled value="">
                  {" "}
                  Seleccione una opcion{" "}
                </option>
                <option value="departamento">Departamento</option>
                <option value="oficina">Oficina</option>
              </InputSelect>

              <Input
                title="Nivel"
                name="level"
                type="number"
                required={true}
                value={product.level}
                setValue={handleChange}
              />
              <Input
                title="Recamaras"
                name="bedrooms"
                type="number"
                required={true}
                value={product.bedrooms}
                setValue={handleChange}
              />
              <Input
                title="Estacionamientos"
                name="parkingLots"
                type="number"
                required={true}
                value={product.parkingLots}
                setValue={handleChange}
              />
              <Input
                title="Baños"
                name="bathrooms"
                type="number"
                required={true}
                value={product.bathrooms}
                setValue={handleChange}
              />
              <Input
                title="MT2"
                name="mt2"
                type="number"
                required={true}
                value={product.mt2}
                setValue={handleChange}
              />
              <Input
                title="Terraza"
                name="terrace"
                type="number"
                required={true}
                value={product.terrace}
                setValue={handleChange}
              />
              <Input
                title="Precio"
                name="price"
                type="number"
                required={true}
                value={product.price}
                setValue={handleChange}
              />

              <Input
                title="Descuento"
                name="discount"
                type="number"
                required={true}
                value={product.discount}
                setValue={handleChange}
              />
              <Switch
                key={"discountType"}
                id={"discountType"}
                name={"discountType"}
                label="Tipo de descuento (Cantidad/Porcentaje)"
                defaultChecked={product.discountType === "Percentage"}
                labelProps={{
                  className: "text-sm font-medium text-black",
                }}
                onChange={(e) => handleChangePercentage(e)}
              />
              <Input
                title="status"
                name="status"
                type="text"
                required={true}
                value={product.status}
                setValue={handleChange}
              />

              <div className="flex justify-center">
                <Switch
                  key={"onSale"}
                  id={"onSale"}
                  name={"onSale"}
                  label="En venta"
                  defaultChecked={product.onSale}
                  labelProps={{
                    className: "text-sm font-medium text-black",
                  }}
                  onChange={handleChangeCheckbox}
                />
              </div>
            </div>

            <div className="group flex flex-col  gap-2">
              <span className="block font-medium">Imagen del producto:</span>
              <div className="group relative flex h-max items-center justify-center">
                <img
                  src={product?.images ? product.images[0].url : ""}
                  alt={"currentLogo"}
                  ref={productImage}
                  className="aspect-square mx-auto w-full rounded-md border-2 shadow"
                />
                <input
                  type="file"
                  hidden
                  name="productImage"
                  className="h-full"
                  ref={productInputImage}
                  onChange={(e) => {
                    let url = URL.createObjectURL(e.target.files[0]);
                    productImage.current.src = url;
                    setSelectedImages(e.target.files[0]);
                  }}
                />
                <button
                  className="aspect-square absolute top-0 hidden h-full w-full items-center justify-center rounded-md bg-black/20 font-bold text-white drop-shadow group-hover:flex"
                  type="button"
                  onClick={() => productInputImage.current.click()}
                >
                  Subir nueva imagen
                </button>
              </div>
            </div>

            <div className="col-span-full">
              <div className="col-span-full flex justify-center text-center">
                <Button
                  type="onSubmit"
                  color={sidenavColor}
                  className="mt-6 flex justify-center rounded-md p-2 px-4 text-center text-lg font-normal text-white hover:bg-opacity-90"
                  fullWidth
                >
                  {loadingUpdate && (
                    <img
                      src="/assets/loader.svg"
                      className="my-auto mr-3 h-6 w-6"
                    />
                  )}
                  {loadingUpdate ? "Modificando..." : "Modificar"}
                </Button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default ProductEdit;
