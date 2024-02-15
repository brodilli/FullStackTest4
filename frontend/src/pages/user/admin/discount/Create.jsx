import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { AiOutlineWarning } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLoginData } from "../../../../actions/userActions";
import { adminCreateDiscount } from "../../../../actions/discountActions";
import SuccessAlert from "../../../../components/alerts/SuccessAlert";
import { Input, InputSelect } from "../../../../components/elements/Inputs";
import { useMaterialTailwindController } from "../../../../context";
import { DISCOUNT_ADMIN_CREATE_RESET } from "../../../../constants/discountConstants";
import { Switch } from "@material-tailwind/react";

export function DiscountCreate({ closeAction }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const adminDiscountCreate = useSelector((state) => state.adminDiscountCreate);
  const {
    loading: loadingCreateDiscount,
    error: errorCreateDiscount,
    message: messageDiscount,
  } = adminDiscountCreate;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [controller, setController] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;

  const [discount, setDiscount] = useState({
    quantity: 0,
    discountType: "Percentage",
    code: "",
    startDate: "",
    endDate: "",
    deleted: false,
    active: false,
  });
  const [showSuccessDiscount, setShowSuccessDiscount] = useState(false);
  const [keepCreating, setKeepCreating] = useState(false);

  const submitDiscountHandler = () => {
    dispatch(adminCreateDiscount(discount));
  };

  const handleChange = (e) =>
    setDiscount((prevState) => ({
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
    setDiscount((prevState) => ({
      ...prevState,
      [e.target.name.split(".")[0]]:
        e.target.name.split(".").length === 2
          ? {
              ...prevState[e.target.name.split(".")[0]],
              [e.target.name.split(".")[1]]: e.target.checked,
            }
          : e.target.checked,
    }));
  useEffect(() => {
    if (messageDiscount) {
      setShowSuccessDiscount(true);
      setTimeout(() => {
        if (!keepCreating) {
          navigate("/admin/descuentos");
        }
        dispatch({ type: DISCOUNT_ADMIN_CREATE_RESET });
        setDiscount({
          quantity: 0,
          discountType: "Percentage",
          code: "",
          startDate: "",
          endDate: "",
          active: false,
        });
        setShowSuccessDiscount(false);
      }, 1000);
    }
    if (!userInfo) {
      dispatch(getLoginData());
    } else if (userInfo.userType !== "Admin") {
      navigate("/login");
    }
    console.log(discount);
  }, [userInfo, messageDiscount]);
  return (
    <>
      <div className="fixed top-0 left-0 z-50 flex min-h-screen w-full items-center justify-center bg-black/30">
        <div className="relative max-h-[90%]  w-11/12 overflow-hidden rounded-md bg-white shadow lg:w-1/2 2xl:w-2/6">
          <div className="flex w-full items-center justify-between rounded-t-md bg-blue-gray-800 p-2 px-4 text-white">
            <h2 className="text-2xl  text-white">Crear Descuento</h2>
            <button
              type="button"
              onClick={closeAction}
              className="text-2xl font-bold hover:text-red-600"
            >
              <MdClose />
            </button>
          </div>
          <form
            className="flex flex-col gap-3 bg-white p-4"
            onSubmit={(e) => {
              e.preventDefault();
              submitDiscountHandler();
            }}
          >
            {showSuccessDiscount && <SuccessAlert title="Descuento creado" />}

            <Input
              title="Codigo de descuento"
              name="code"
              type="text"
              value={discount.code}
              setValue={handleChange}
            />
            <InputSelect
              title="Tipo de descuento"
              name="discountType"
              value={discount.discountType}
              setValue={handleChange}
            >
              <option disabled value="">
                {" "}
                -- Seleccione una opcion --{" "}
              </option>
              <option value={"Percentage"} key={"Percentage"}>
                Porcentaje
              </option>
              <option value={"Amount"} key={"Amount"}>
                Importe
              </option>
              <option value={"FreeShipping"} key={"FreeShipping"}>
                Envio gratis
              </option>
            </InputSelect>
            {discount.discountType !== "FreeShipping" && (
              <Input
                title="Cantidad"
                name="quantity"
                type="text"
                required={true}
                value={discount.quantity}
                setValue={handleChange}
              />
            )}
            <Input
              title="Fecha de inicio"
              name="startDate"
              type="date"
              required={true}
              value={discount.startDate}
              setValue={handleChange}
            />
            <Input
              title="Fecha de fin"
              name="endDate"
              type="date"
              required={true}
              value={discount.endDate}
              setValue={handleChange}
            />
            <div className="flex justify-center">
              <Switch
                key={"active"}
                id={"active"}
                name={"active"}
                label={discount.active ? "Activado" : "Desactivado"}
                checked={discount.active}
                labelProps={{
                  className: "text-sm font-medium text-black",
                }}
                onChange={handleChangeCheckbox}
              />
            </div>
            <div className="mt-3 flex justify-center">
              <Switch
                key={"keepCreating"}
                id={"keepCreating"}
                label="Seguir creando"
                value={keepCreating}
                labelProps={{
                  className: "text-sm font-medium text-black",
                }}
                onChange={(e) => setKeepCreating(e.target.checked)}
              />
            </div>
            <div className="col-span-full text-center">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  submitDiscountHandler();
                }}
                className={
                  "bg-" +
                  (sidenavColor ? sidenavColor : "black") +
                  "-500 flex w-full justify-center rounded-md p-2 px-4 text-center text-lg  text-white hover:bg-opacity-90"
                }
              >
                {loadingCreateDiscount && (
                  <img
                    src="/assets/loader.svg"
                    className="my-auto mr-3 h-6 w-6"
                  />
                )}
                {loadingCreateDiscount ? "Creando..." : "Crear"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default DiscountCreate;
