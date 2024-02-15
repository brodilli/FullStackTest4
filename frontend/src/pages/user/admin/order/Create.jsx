import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminCreateOrder } from "../../../../actions/orderActions";
import { adminListProducts } from "../../../../actions/productActions";
import { adminListAdvisers } from "../../../../actions/adviserActions";
import { adminListParcels } from "../../../../actions/parcelActions";
import { adminListMarketplaces } from "../../../../actions/marketplaceActions";
import { getLoginData } from "../../../../actions/userActions";
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
import { ORDER_ADMIN_CREATE_RESET } from "../../../../constants/orderConstants";
import { Button, Switch } from "@material-tailwind/react";
import { useMaterialTailwindController } from "../../../../context";

export function OrderCreate() {
  const [order, setOrder] = useState({
    orderId: "",
    status: "Pendiente",
    adviser: "",
    marketplace: "",
    marketplaceComission: 0.0,
    parcel: "",
    products: [],
    total: 0.0,
    comments: "",
  });
  const [selectedShippingGuide, setSelectedShippingGuide] = useState();
  const [showShippingGuideAlert, setShowShippingGuideAlert] = useState(false);
  const [selectedDeliveryNote, setSelectedDeliveryNote] = useState();
  const [showDeliveryNoteAlert, setShowDeliveryNoteAlert] = useState(false);

  const [selectProduct, setSelectProduct] = useState("");
  const [filterProducts, setFilterProducts] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [controller, setController] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const adminOrderCreate = useSelector((state) => state.adminOrderCreate);
  const {
    loading: loadingCreateOrder,
    error: errorCreateOrder,
    message: messageCreateOrder,
  } = adminOrderCreate;

  const adminProductList = useSelector((state) => state.adminProductList);
  const {
    loading: loadingProductList,
    error: errorProductList,
    products,
    success: successProductList,
  } = adminProductList;
  const adminParcelList = useSelector((state) => state.adminParcelList);
  const {
    loading: loadingParcelList,
    error: errorParcelList,
    parcels,
    success: successParcelList,
  } = adminParcelList;
  const adminAdviserList = useSelector((state) => state.adminAdviserList);
  const {
    loading: loadingAdviserList,
    error: errorAdviserList,
    advisers,
    success: successAdviserList,
  } = adminAdviserList;
  const adminMarketplaceList = useSelector(
    (state) => state.adminMarketplaceList
  );
  const {
    loading: loadingMarketplaceList,
    error: errorMarketplaceList,
    marketplaces,
    success: successMarketplaceList,
  } = adminMarketplaceList;
  const updateTotal = (products) => {
    var total = 0;
    products.forEach((element) => {
      total += element.quantity * element.price;
    });
    setOrder((prevState) => ({
      ...prevState,
      total: total,
    }));
  };
  const handleChangeCombobox = (e) => {
    var add = true;
    order.products.forEach((c) => {
      if (c._id === e._id) return (add = false);
    });
    if (add) {
      setOrder((prevState) => ({
        ...prevState,
        products: [
          ...prevState["products"],
          { product: e, quantity: 1, price: e.price, discount: false },
        ],
      }));
    }
  };
  const handleChange = (e) =>
    setOrder((prevState) => ({
      ...prevState,
      [e.target.name.split(".")[0]]:
        e.target.name.split(".").length === 2
          ? {
              ...prevState[e.target.name.split(".")[0]],
              [e.target.name.split(".")[1]]: e.target.value,
            }
          : e.target.value,
    }));

  const handleChangeProduct = (e, index) => {
    setOrder((prevState) => {
      console.log(index);
      const ord = { ...prevState }; // Create a copy of the array
      console.log(ord.products[index]);
      ord.products[index][e.target.name] = e.target.value; // Update the specific element
      updateTotal(ord.products);
      return ord;
    });
  };
  const handleChangeProductCheckbox = (e, index) => {
    setOrder((prevState) => {
      console.log(index);

      const ord = { ...prevState }; // Create a copy of the array
      console.log(ord.products[index]);
      ord.products[index][e.target.name] = e.target.checked; // Update the specific element
      updateTotal(ord.products);
      return ord;
    });
  };
  const handleChangeCheckbox = (e) =>
    setOrder((prevState) => ({
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
    setOrder((prevState) => ({
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
    setShowDeliveryNoteAlert(false);
    setShowShippingGuideAlert(false);
    const formData = new FormData();
    var arr = [];
    var total = 0;
    order.products.forEach((element) => {
      arr.push({
        product: element.product._id,
        quantity: element.quantity,
        price: element.price,
        discount: element.discount,
      });
    });
    var ord = { ...order };
    ord.products = arr;
    formData.append("order", JSON.stringify(ord));

    if (selectedDeliveryNote) {
      formData.append("files", selectedDeliveryNote, "deliveryNote");
    } else {
      setShowDeliveryNoteAlert(true);
    }
    if (selectedShippingGuide) {
      formData.append("files", selectedShippingGuide, "shippingGuide");
    } else {
      setShowShippingGuideAlert(true);
    }
    dispatch(adminCreateOrder(formData));
  };
  const redirect = "/login";
  useEffect(() => {
    if (!userInfo) {
      dispatch(getLoginData());
    } else if (userInfo.userType !== "Admin") {
      navigate(redirect);
    } else if (order.products.length > 0) {
      updateTotal(order.products);
    } else if (!successProductList && !errorProductList) {
      dispatch(adminListProducts("", "", "", "", "", true));
      dispatch(adminListParcels("", "", "", "", "", true));
      dispatch(adminListAdvisers("", "", "", "", "", true));
      dispatch(adminListMarketplaces("", "", "", "", "", true));
    }
    if (order.products.length > 0) {
      updateTotal(order.products);
    } else {
      updateTotal([]);
    }
    if (messageCreateOrder) {
      dispatch({ type: ORDER_ADMIN_CREATE_RESET });
      navigate("/admin/ordenes");
    }
  }, [userInfo, messageCreateOrder, order.products]);
  return (
    <div className="bg-slate-50 p-4">
      <h2 className="text-palette-primary text-xl font-bold">Crear Orden</h2>
      <form
        className="grid gap-2 md:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler();
        }}
      >
        <div className="flex flex-col gap-3">
          <Input
            title="ID Orden"
            name="orderId"
            type="text"
            required={true}
            value={order.orderId}
            setValue={handleChange}
          />

          <InputSelect
            title="Asesor"
            name="adviser"
            value={order.adviser}
            setValue={handleChange}
          >
            <option disabled value="">
              {" "}
              -- Seleccione una opcion --{" "}
            </option>
            {advisers?.map((adviser) => (
              <option value={adviser._id} key={adviser._id}>
                {adviser.name}
              </option>
            ))}
          </InputSelect>
          <InputSelect
            title="Marketplace"
            name="marketplace"
            value={order.marketplace}
            setValue={handleChange}
          >
            <option disabled value="">
              {" "}
              -- Seleccione una opcion --{" "}
            </option>
            {marketplaces?.map((marketplace) => (
              <option value={marketplace._id} key={marketplace._id}>
                {marketplace.name}
              </option>
            ))}
          </InputSelect>
          <Input
            title="Comisiones Marketplace"
            name="marketplaceComission"
            type="number"
            step=".01"
            required={true}
            value={order.marketplaceComission}
            setValue={handleChange}
          />
          <InputSelect
            title="Paqueteria"
            name="parcel"
            value={order.parcel}
            setValue={handleChange}
          >
            <option disabled value="">
              {" "}
              -- Seleccione una opcion --{" "}
            </option>
            {parcels?.map((parcel) => (
              <option value={parcel._id} key={parcel._id}>
                {parcel.name}
              </option>
            ))}
          </InputSelect>

          <Textarea
            title="Comentarios"
            name="comments"
            type="text"
            value={order.comments}
            setValue={handleChange}
          />
        </div>
        <div className="flex h-[34rem] flex-col gap-3">
          <ComboBox
            data={products ? products : []}
            selected={order.products}
            selectedSubField="product"
            setAction={handleChangeCombobox}
            title="Productos"
            name="products"
          />
          <div className="mx-2 flex flex-col gap-3 overflow-auto rounded-md border border-[#9ea9ba] p-3">
            {order.products.map((element, key) => (
              <div
                key={key}
                className="flex items-center justify-between rounded-full border border-black py-1 px-3 text-xs hover:border-blue-500 hover:bg-white lg:text-sm"
              >
                <div className="flex w-32 items-center justify-start">
                  {element.product?.images.length > 0 && (
                    <img
                      src={
                        element.product.images[0]?.url
                          ? element.product.images[0].url
                          : ""
                      }
                      alt={element.product?.name}
                      className="mr-2 h-8 w-8 scale-100 transform rounded-full object-cover md:h-12 md:w-12"
                    />
                  )}
                  <span className="mr-3">
                    <strong>{element.product?.name}</strong>
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <span>Cantidad: </span>
                  <input
                    name="quantity"
                    className="m-2 h-6 w-16 rounded-md text-center 2xl:w-20"
                    value={element.quantity}
                    type="number"
                    onChange={(e) => handleChangeProduct(e, key)}
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <span>Precio: </span>
                  <input
                    name={"price"}
                    className="m-2 h-6 w-16 rounded-md text-center 2xl:w-20"
                    type="number"
                    value={element.price}
                    onChange={(e) => handleChangeProduct(e, key)}
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <span>Descuento: </span>
                  <Switch
                    key={"discount" + key}
                    id={"discount" + key}
                    name={"discount"}
                    defaultChecked={false}
                    onChange={(e) => handleChangeProductCheckbox(e, key)}
                  />
                </div>
                <XMarkIcon
                  strokeWidth={2.5}
                  className="my-auto ml-3 h-4 w-4 hover:text-red-900 hover:shadow-red-900"
                  onClick={() =>
                    setOrder((prevState) => ({
                      ...prevState,
                      products: order.products.filter(
                        (e, index) => index !== key
                      ),
                    }))
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <InputFile
          name="shippingGuide"
          title="Guía de envío"
          setValue={setSelectedShippingGuide}
        />
        <InputFile
          name="deliveryNote"
          title="Albarán de entrega"
          setValue={setSelectedDeliveryNote}
        />

        <div className="col-span-full">
          <div className="inline-block h-0.5 w-full rounded-full bg-blue-gray-500"></div>
          <div className="flex justify-center text-2xl">
            <span className="font-bold">Total:</span>
            <span> ${order.total?.toFixed(2)}</span>
          </div>
          <div className="col-span-full flex justify-center text-center">
            {(showDeliveryNoteAlert || showShippingGuideAlert) && (
              <Alert
                title="Informacion incompleta"
                text="Por favor suba los archivos correspondientes"
              />
            )}
          </div>
          <div className="col-span-full flex justify-center text-center">
            <Button
              type="onSubmit"
              color={sidenavColor}
              className="mt-6 flex justify-center rounded-md p-2 px-4 text-center text-lg font-normal text-white hover:bg-opacity-90"
              fullWidth
            >
              {loadingCreateOrder && (
                <img
                  src="/assets/loader.svg"
                  className="my-auto mr-3 h-6 w-6"
                />
              )}
              {loadingCreateOrder ? "Creando..." : "Crear"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default OrderCreate;
