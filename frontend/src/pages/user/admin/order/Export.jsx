import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { AiOutlineWarning, AiOutlineInfoCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLoginData } from "../../../../actions/userActions";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { adminListAdvisers } from "../../../../actions/adviserActions";
import {
  adminListAllOrders,
  adminExportOrder,
} from "../../../../actions/orderActions";
import Loader from "../../../../components/Loader";
import {
  InputFile,
  Input,
  CheckBox,
  InputSelect,
  Textarea,
  ComboBox,
} from "../../../../components/elements/Inputs";
import { Typography, Tooltip } from "@material-tailwind/react";

export function OrderExport({ closeAction }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [exportSettings, setExportSettings] = useState({
    adviser: "all",
    mode: "",
    ids: [],
    startDate: "",
    endDate: "",
    status: "all",
  });
  const [downloadError, setDownloadError] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const adminOrderExport = useSelector((state) => state.adminOrderExport);
  const {
    loading: loadingExport,
    error: errorExport,
    success: successExport,
  } = adminOrderExport;
  const adminOrderDelete = useSelector((state) => state.adminOrderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    message,
  } = adminOrderDelete;
  const adminAdviserList = useSelector((state) => state.adminAdviserList);
  const {
    loading: loadingAdviserList,
    error: errorAdviserList,
    advisers,
    success: successAdviserList,
  } = adminAdviserList;
  const adminOrderListAll = useSelector((state) => state.adminOrderListAll);
  const {
    loading: loadingOrders,
    error: errorOrders,
    success,
    orders,
  } = adminOrderListAll;

  useEffect(() => {
    if (!(successAdviserList || errorAdviserList)) {
      dispatch(adminListAllOrders());
      dispatch(adminListAdvisers("", "", "", "", "", true));
    }
    if (message) {
      navigate("/admin/ordenes");
    }
  }, [message, successAdviserList, errorAdviserList]);
  const submitHandler = () => {
    try {
      var arr = [];
      exportSettings?.ids?.forEach((ord) => {
        arr.push(ord?._id);
      });
      var obj = { ...exportSettings };
      obj.ids = arr;
      dispatch(adminExportOrder(obj));
      obj.ids = [];
      setExportSettings(obj);
      setDownloadError(false);
    } catch (error) {
      setDownloadError(true);
    }
  };
  const closeHandler = () => {
    navigate("/admin/ordenes");
  };
  const handleChange = (e) =>
    setExportSettings((prevState) => ({
      ...prevState,
      [e.target.name.split(".")[0]]:
        e.target.name.split(".").length === 2
          ? {
              ...prevState[e.target.name.split(".")[0]],
              [e.target.name.split(".")[1]]: e.target.value,
            }
          : e.target.value,
    }));
  const handleChangeCombobox = (e) => {
    var add = true;
    exportSettings?.ids?.forEach((c) => {
      if (c?._id === e?._id) return (add = false);
    });
    if (add) {
      setExportSettings((prevState) => ({
        ...prevState,
        ids: [...prevState["ids"], e],
      }));
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 z-50 flex min-h-screen w-full items-center justify-center bg-black/30">
        {loading || loadingAdviserList || loadingOrders ? (
          <Loader />
        ) : (
          <div className="relative max-h-[90%]  w-11/12 overflow-hidden rounded-md bg-white shadow lg:w-1/2 2xl:w-2/6">
            <div className="flex w-full items-center justify-between rounded-t-md bg-blue-gray-800 p-2 px-4 text-white">
              <h2 className="text-2xl  text-white">Exportar Ordenes</h2>
              <button
                type="button"
                onClick={closeHandler}
                className="text-2xl font-bold hover:text-red-600"
              >
                <MdClose />
              </button>
            </div>
            <form
              className="flex min-h-[50vh] flex-col  gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                submitHandler();
              }}
            >
              <div className="m-3 flex flex-col justify-center gap-3">
                <InputSelect
                  title={
                    <Tooltip
                      key={"Description"}
                      content={
                        <div>
                          <p>Orden, seleccionas las ordenes por ID</p>
                          <p>
                            Personalizado, Selecciona proveedor, status y/o
                            fecha
                          </p>
                        </div>
                      }
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center font-semibold hover:text-blue-500"
                      >
                        Modo de seleccion
                        <AiOutlineInfoCircle className=" ml-1 h-4 w-4 fill-blue-600" />
                      </Typography>
                    </Tooltip>
                  }
                  name="mode"
                  value={exportSettings.mode}
                  setValue={handleChange}
                >
                  <option disabled value="">
                    {" "}
                    -- Seleccione una opcion --{" "}
                  </option>
                  <option value={"orderId"} key={"orderId"}>
                    Orden
                  </option>
                  <option value={"custom"} key={"custom"}>
                    Personalizado
                  </option>
                </InputSelect>
                <div className="my-4 border-t border-blue-gray-600"></div>
                {exportSettings.mode === "orderId" ? (
                  <>
                    <ComboBox
                      data={orders ? orders : []}
                      selected={exportSettings.ids}
                      setAction={handleChangeCombobox}
                      title="Ordenes"
                      name="ids"
                      small={true}
                    />
                    <div className="flex flex-wrap gap-2">
                      {exportSettings?.ids?.map((order, key) => (
                        <div
                          key={key}
                          className="flex rounded-full border border-black py-1 px-3 hover:border-blue-500 hover:bg-white"
                        >
                          <span>{order?.orderId}</span>
                          <XMarkIcon
                            strokeWidth={2.5}
                            className="my-auto  ml-3 h-4 w-4 hover:text-red-900 hover:shadow-red-900"
                            onClick={() =>
                              setExportSettings((prevState) => ({
                                ...prevState,
                                ids: exportSettings.ids.filter(
                                  (e, index) => index !== key
                                ),
                              }))
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  exportSettings.mode === "custom" && (
                    <>
                      <InputSelect
                        title="Proveedor"
                        name="adviser"
                        value={exportSettings.adviser}
                        setValue={handleChange}
                      >
                        <option value={"all"} key={"all"}>
                          Todos
                        </option>
                        {advisers?.map((adviser) => (
                          <option value={adviser._id} key={adviser._id}>
                            {adviser.name}
                          </option>
                        ))}
                      </InputSelect>
                      <InputSelect
                        title="Status"
                        name="status"
                        value={exportSettings.status}
                        setValue={handleChange}
                      >
                        <option value={"all"} key={"all"}>
                          Todos
                        </option>
                        {[
                          "Cancelado",
                          "Devolución",
                          "Enviado",
                          "En proceso",
                          "Pendiente",
                          "Rechazado por proveedor",
                        ].map((element) => (
                          <option value={element} key={element}>
                            {element}
                          </option>
                        ))}
                      </InputSelect>
                      <Input
                        title={
                          <Tooltip
                            key={"startDate"}
                            content={
                              <div>
                                <p>
                                  Si no se ingresa valor, no tendra limite de
                                  inicio
                                </p>
                              </div>
                            }
                          >
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="flex items-center font-semibold hover:text-blue-500"
                            >
                              Fecha de inicio
                              <AiOutlineInfoCircle className=" ml-1 h-4 w-4 fill-blue-600" />
                            </Typography>
                          </Tooltip>
                        }
                        name="startDate"
                        type="date"
                        value={exportSettings.startDate}
                        setValue={handleChange}
                      />
                      <Input
                        title={
                          <Tooltip
                            key={"startDate"}
                            content={
                              <div>
                                <p>
                                  Si no se ingresa valor, no tendra limite de
                                  fin
                                </p>
                              </div>
                            }
                          >
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="flex items-center font-semibold hover:text-blue-500"
                            >
                              Fecha de fin
                              <AiOutlineInfoCircle className=" ml-1 h-4 w-4 fill-blue-600" />
                            </Typography>
                          </Tooltip>
                        }
                        name="endDate"
                        type="date"
                        value={exportSettings.endDate}
                        setValue={handleChange}
                      />
                    </>
                  )
                )}
                {(downloadError || errorExport) && (
                  <span className="text-center font-bold text-red-700">
                    Ocurrio un error con la descarga, refresque la pagina por
                    favor
                  </span>
                )}
                <div className="mt-6 flex items-center justify-center text-center">
                  <button
                    className={
                      "mb-6 flex items-center rounded-full py-2 px-4 text-lg font-bold text-gray-100 hover:text-white hover:shadow-2xl " +
                      (loadingExport
                        ? "bg-blue-600 hover:bg-blue-900"
                        : "bg-green-600 hover:bg-green-900")
                    }
                  >
                    {loadingExport && (
                      <img
                        src="/assets/loader.svg"
                        className="my-auto mr-3 h-6 w-6"
                      />
                    )}
                    {loadingExport ? "Exportando..." : "Exportar"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default OrderExport;
