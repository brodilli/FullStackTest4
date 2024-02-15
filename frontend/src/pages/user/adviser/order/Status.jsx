import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailsOrder, updateOrder } from "../../../../actions/orderActions";
import { getLoginData } from "../../../../actions/userActions";
import {
  NoSymbolIcon,
  CogIcon,
  TruckIcon,
  ArrowLeftOnRectangleIcon,
  ClockIcon,
  UserMinusIcon,
} from "@heroicons/react/24/outline";
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
import Loader from "../../../../components/Loader";
import { Avatar, Button, IconButton } from "@material-tailwind/react";
import { useMaterialTailwindController } from "../../../../context";

export function OrderStatus() {
  const [status, setStatus] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [controller, setController] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const [isHoveredOne, setHoveredOne] = useState(false);
  const [isHoveredTwo, setHoveredTwo] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const {
    loading: loadingDetails,
    error: errorDetails,
    orderDetails: order,
  } = orderDetails;
  const orderUpdate = useSelector((state) => state.orderUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    orderUpdate: orderUpdateMessage,
  } = orderUpdate;
  const downloadPDF = (pdfUrl, name) => {
    const arr = pdfUrl.split(".");
    const extension = "." + arr[arr.length - 1];
    fetch(pdfUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement("a");
        a.href = url;
        a.download = name + extension; // Set the desired file name
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading PDF:", error);
      });
  };
  const openUrl = (url) => {
    window.open(url, "_blank"); // Replace with the desired URL
  };

  const redirect = "/login";
  useEffect(() => {
    if (!userInfo) {
      dispatch(getLoginData());
    } else if (userInfo.userType !== "Supplier") {
      navigate(redirect);
    }
    if ((id && !order) || (id && order._id !== id)) {
      dispatch(detailsOrder(id));
    }
    if (order) {
      setStatus(order.status);
    }
  }, [userInfo, order]);
  const submitHandler = () => {
    dispatch(updateOrder(id, status));
  };
  const acceptHandler = () => {
    dispatch(updateOrder(id, "En proceso"));
  };
  const deniedHandler = () => {
    dispatch(updateOrder(id, "Rechazado por proveedor"));
  };

  return (
    <div className="bg-slate-50 p-4">
      <h2 className="text-palette-primary text-xl font-bold">
        Orden: {order?.orderId}
      </h2>
      <div className="flex w-full justify-end">
        <span className="text-end">
          Fecha de pedido:{" "}
          <strong>
            {order?.createdAt
              ? new Date(order.createdAt).toLocaleString("es-MX", {
                  timeZone: "America/Mexico_City",
                })
              : ""}
          </strong>
        </span>
      </div>
      {loadingDetails || loadingUpdate ? (
        <Loader />
      ) : (
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <div className="mx-2 rounded-md border border-gray-400 p-3">
              <span className="mr-3">Proveedor:</span>
              <span className="font-bold">{order?.supplier?.name}</span>
            </div>
            <div className="mx-2 rounded-md border border-gray-400 p-3">
              <span className="mr-3">Paqueteria:</span>
              <span className="font-bold">{order?.parcel?.name}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="mx-2 rounded-md border border-gray-400 p-3">
              <span className="mr-3">Marketplace:</span>
              <span className="font-bold">{order?.marketplace?.name}</span>
            </div>
            <div className="mx-2 rounded-md border border-gray-400 p-3">
              <span className="mr-3">Comisiones Marketplace:</span>
              <span className="font-bold">
                ${order?.marketplaceComission.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="col-span-full">
            {order?.comments && (
              <div className="mx-2 mt-3 flex flex-col gap-3 rounded-md border border-gray-400 p-3">
                <span className="text-center text-lg">Comentarios</span>
                <p className="text-sm">{order?.comments}</p>
              </div>
            )}
            <div className="mx-2 mt-3 flex flex-col gap-3 rounded-md border border-gray-400 p-3">
              <span className="text-center text-xl">Productos</span>
              {order?.products?.map((element, key) => (
                <div
                  key={key}
                  className="flex items-center justify-between rounded-full border border-black p-3 text-xs hover:border-blue-500 hover:bg-white lg:text-sm"
                >
                  <div className="flex w-48 items-center justify-start">
                    {element?.product?.images?.length > 0 && (
                      <img
                        src={
                          element.product.images[0]?.url
                            ? element.product.images[0].url
                            : ""
                        }
                        alt={element?.product?.name}
                        className="mr-2 h-8 w-8 transform rounded-full object-cover md:h-12 md:w-12"
                      />
                    )}
                    <div className="flex flex-col">
                      <span>
                        <strong>{element?.product?.name}</strong>
                      </span>
                      <span>{element?.product?.brand?.name}</span>
                    </div>
                  </div>
                  <div className="flex w-48 flex-wrap">
                    {element?.product?.categories?.map((category, key) => (
                      <span>{category.name},&nbsp;</span>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <span>
                      EAN: <strong>{element?.product?.eanUpc}</strong>
                    </span>
                    <span>
                      SKU: <strong>{element?.product?.skuTrep}</strong>
                    </span>
                    <span>
                      {element?.product?.skuLiverpool ? "Liverpool: " : ""}
                      <strong>{element?.product?.skuLiverpool}</strong>
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="mr-3">
                      Cantidad: <strong>{element?.quantity}</strong>
                    </span>
                    <span className="mr-3">
                      Precio: <strong>{element?.price}</strong>
                    </span>
                    <span className="mr-3">
                      Total:{" "}
                      <strong>{element?.quantity * element?.price}</strong>
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="inline-block h-0.5 w-full rounded-full bg-blue-gray-500"></div>
            <div className="my-3 flex text-xl">
              <div className="mx-3 w-1/2">
                <button
                  className="hover:split-button group relative w-full transform-gpu overflow-hidden rounded-md bg-blue-500 py-2 px-4 text-white transition-transform duration-300"
                  onMouseEnter={() => setHoveredOne(true)}
                  onMouseLeave={() => setHoveredOne(false)}
                >
                  <span
                    className={`absolute inset-0 w-1/2 transform bg-red-500 ${
                      isHoveredOne ? "translate-x-0" : "-translate-x-full"
                    }`}
                  ></span>
                  <span
                    className={`relative z-10 ${
                      isHoveredOne ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    Guía de envío
                  </span>
                  {isHoveredOne && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-1/2">
                        <button
                          className="w-full rounded-l-md bg-blue-500 py-2 px-4 text-white hover:bg-blue-600"
                          onClick={() =>
                            downloadPDF(
                              order?.shippingGuide?.url,
                              order.orderId + " Guía de envío"
                            )
                          }
                        >
                          Descargar
                        </button>
                      </div>
                      <div className="w-1/2">
                        <button
                          className="w-full rounded-r-md bg-blue-500 py-2 px-4 text-white hover:bg-blue-600"
                          onClick={() => openUrl(order?.shippingGuide?.url)}
                        >
                          Abrir
                        </button>
                      </div>
                    </div>
                  )}
                </button>
              </div>
              <div className="mx-3 w-1/2">
                <button
                  className="hover:split-button group relative w-full transform-gpu overflow-hidden rounded-md bg-blue-500 py-2 px-4 text-white transition-transform duration-300"
                  onMouseEnter={() => setHoveredTwo(true)}
                  onMouseLeave={() => setHoveredTwo(false)}
                  color={sidenavColor}
                >
                  <span
                    className={`absolute inset-0 w-1/2 transform bg-red-500 ${
                      isHoveredTwo ? "translate-x-0" : "-translate-x-full"
                    }`}
                  ></span>
                  <span
                    className={`relative z-10 ${
                      isHoveredTwo ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    Albarán de entrega
                  </span>
                  {isHoveredTwo && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-1/2">
                        <button
                          className="w-full rounded-l-md bg-blue-500 py-2 px-4 text-white hover:bg-blue-600"
                          onClick={() =>
                            downloadPDF(
                              order?.deliveryNote?.url,
                              order.orderId + " Albarán de entrega"
                            )
                          }
                        >
                          Descargar
                        </button>
                      </div>
                      <div className="w-1/2">
                        <button
                          className="w-full rounded-r-md bg-blue-500 py-2 px-4 text-white hover:bg-blue-600"
                          onClick={() => openUrl(order?.deliveryNote?.url)}
                        >
                          Abrir
                        </button>
                      </div>
                    </div>
                  )}
                </button>
              </div>
            </div>
            <div className="flex justify-center text-2xl">
              <span className="font-bold">Total:</span>
              <span> ${order?.total?.toFixed(2)}</span>
            </div>
            <div className="my-3 flex items-center justify-center gap-3 text-2xl">
              {order?.status === "Pendiente" ? (
                <>
                  <div className="mx-3 w-1/2">
                    <button
                      className="w-full rounded-md bg-green-500 py-2 px-4 text-white transition-transform duration-300 hover:bg-green-700"
                      onClick={acceptHandler}
                    >
                      <span>Aceptar</span>
                    </button>
                  </div>
                  <div className="mx-3 w-1/2">
                    <button
                      className="w-full rounded-md bg-red-500 py-2 px-4 text-white transition-transform duration-300 hover:bg-red-700"
                      onClick={deniedHandler}
                    >
                      <span>Rechazar</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span>Status:</span>
                  <select
                    className="rounded-md"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option disabled value="">
                      {" "}
                      -- Seleccione una opcion --{" "}
                    </option>
                    {status === "Pendiente" && (
                      <option value="Pendiente">Pendiente</option>
                    )}
                    {status === "Rechazado por proveedor" && (
                      <option value="Rechazado por proveedor">
                        Rechazado por proveedor
                      </option>
                    )}
                    <option value="En proceso">En proceso</option>
                    <option value="Enviado">Enviado</option>
                  </select>
                  <span
                    className={`h-8 w-8 text-${
                      order?.status === "Enviado"
                        ? "green"
                        : order?.status === "En proceso"
                        ? "blue"
                        : order?.status === "Devolución"
                        ? "orange"
                        : order?.status === "Cancelado" ||
                          order?.status === "Rechazado por proveedor"
                        ? "red"
                        : "brown"
                    }-500`}
                  >
                    {order?.status === "Enviado" ? (
                      <TruckIcon />
                    ) : order?.status === "En proceso" ? (
                      <CogIcon />
                    ) : order?.status === "Devolución" ? (
                      <ArrowLeftOnRectangleIcon />
                    ) : order?.status === "Cancelado" ? (
                      <NoSymbolIcon />
                    ) : order?.status === "Rechazado por proveedor" ? (
                      <UserMinusIcon />
                    ) : (
                      <ClockIcon />
                    )}
                  </span>
                </>
              )}
            </div>
            <div className="col-span-full flex justify-center text-center">
              {(error || errorDetails) && (
                <Alert
                  title="Ocurrio un error"
                  text={error ? error : errorDetails}
                />
              )}
            </div>
            {(order?.status === "En proceso" ||
              order?.status === "Enviado") && (
              <div className="col-span-full flex justify-center text-center">
                <Button
                  type="button"
                  onClick={submitHandler}
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
                  {loadingUpdate ? "Actualizando..." : "Actualizar"}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderStatus;
