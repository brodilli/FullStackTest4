import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { AiOutlineWarning } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLoginData } from "../../../../actions/userActions";
import { adminCreateParcel } from "../../../../actions/parcelActions";
import SuccessAlert from "../../../../components/alerts/SuccessAlert";
import { Input } from "../../../../components/elements/Inputs";
import { useMaterialTailwindController } from "../../../../context";
import { PARCEL_ADMIN_CREATE_RESET } from "../../../../constants/parcelConstants";
import { Switch } from "@material-tailwind/react";

export function ParcelCreate({ closeAction }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const adminParcelCreate = useSelector((state) => state.adminParcelCreate);
  const {
    loading: loadingCreateParcel,
    error: errorCreateParcel,
    message: messageParcel,
  } = adminParcelCreate;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [controller, setController] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;

  const [newParcel, setNewParcel] = useState("");
  const [showSuccessParcel, setShowSuccessParcel] = useState(false);
  const [keepCreating, setKeepCreating] = useState(false);

  const submitParcelHandler = () => {
    dispatch(adminCreateParcel(newParcel));
  };
  const handleParcelChange = (e) => {
    setNewParcel(e.target.value);
  };
  useEffect(() => {
    if (messageParcel) {
      setShowSuccessParcel(true);
      setTimeout(() => {
        if (!keepCreating) {
          navigate("/admin/paqueterias");
        }
        dispatch({ type: PARCEL_ADMIN_CREATE_RESET });
        setNewParcel("");
        setShowSuccessParcel(false);
      }, 1000);
    }
    if (!userInfo) {
      dispatch(getLoginData());
    } else if (userInfo.userType !== "Admin") {
      navigate("/login");
    }
  }, [userInfo, messageParcel]);
  return (
    <>
      <div className="fixed top-0 left-0 z-50 flex min-h-screen w-full items-center justify-center bg-black/30">
        <div className="relative max-h-[90%]  w-11/12 overflow-hidden rounded-md bg-white shadow lg:w-1/2 2xl:w-2/6">
          <div className="flex w-full items-center justify-between rounded-t-md bg-blue-gray-800 p-2 px-4 text-white">
            <h2 className="text-2xl  text-white">Crear Paqueteria</h2>
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
              submitParcelHandler();
            }}
          >
            {showSuccessParcel && <SuccessAlert title="Paqueteria creada" />}

            <Input
              title="Nombre de paqueteria"
              name="parcel_name"
              type="text"
              required={true}
              value={newParcel}
              setValue={handleParcelChange}
            />
            <div className="flex justify-center">
              <Switch
                key={"keepCreating"}
                id={"keepCreating"}
                label="Seguir creando"
                defaultChecked={false}
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
                  submitParcelHandler();
                }}
                className={
                  "bg-" +
                  (sidenavColor ? sidenavColor : "black") +
                  "-500 flex w-full justify-center rounded-md p-2 px-4 text-center text-lg  text-white hover:bg-opacity-90"
                }
              >
                {loadingCreateParcel && (
                  <img
                    src="/assets/loader.svg"
                    className="my-auto mr-3 h-6 w-6"
                  />
                )}
                {loadingCreateParcel ? "Creando..." : "Crear"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ParcelCreate;
