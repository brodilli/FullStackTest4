import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  adminDetailsUser,
  adminUpdateUser,
} from "../../../../actions/userActions";
import { getLoginData } from "../../../../actions/userActions";

import {
  Input,
  Textarea,
  CheckBox,
} from "../../../../components/elements/Inputs";
import Alert from "../../../../components/alerts/Alert";
import { Button, Typography } from "@material-tailwind/react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export function UserEdit() {
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    tradename: "",
    allowPlusOne: false,
    plusOne: false,
    allergies: "",
    status: "Pending",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const adminUserDetails = useSelector((state) => state.adminUserDetails);
  const {
    loading: loadingDetails,
    error: errorDetails,
    userDetails,
    success: userDetailsSuccess,
  } = adminUserDetails;

  const adminUserUpdate = useSelector((state) => state.adminUserUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    messageUpdate,
  } = adminUserUpdate;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handlePhoneChange = (value) => {
    setUser((prevState) => ({ ...prevState, phone: value }));
  };
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: checked }));
  };

  const submitHandler = () => {
    dispatch(adminUpdateUser(id, user));
  };

  useEffect(() => {
    if (messageUpdate) {
      navigate("/admin/invitados");
    }

    if (!userInfo) {
      dispatch(getLoginData());
    } else if (userInfo.userType !== "Admin") {
      navigate("/login");
    } else if (!userDetails || userDetails._id !== id) {
      dispatch(adminDetailsUser(id));
    } else {
      setUser({
        name: userDetails.name || "",
        lastName: userDetails.lastName || "",
        email: userDetails.email || "",
        phone: userDetails.phone || "",
        tradename: userDetails.tradename || "",
        allowPlusOne: userDetails.allowPlusOne || false,
        plusOne: userDetails.plusOne || false,
        allergies: userDetails.allergies || "",
        status: userDetails.status || "Pending",
      });
    }
  }, [dispatch, userInfo, userDetails, id, messageUpdate]);

  return (
    <div className="bg-slate-50 p-4">
      <h2 className="text-palette-primary text-xl font-bold">
        Editar Invitado
      </h2>
      {loadingDetails ? (
        <p>Cargando datos...</p>
      ) : errorDetails ? (
        <Alert title="Error" text={errorDetails} />
      ) : (
        <form
          className="mt-3 grid gap-6 md:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            submitHandler();
          }}
        >
          <div className="flex flex-col gap-3">
            <Typography className="text-lg font-semibold hover:text-gray-800">
              Datos Generales
            </Typography>
            <Input
              title="Nombre"
              name="name"
              type="text"
              required={true}
              value={user.name}
              setValue={handleChange}
            />
            <Input
              title="Apellido"
              name="lastName"
              type="text"
              required={true}
              value={user.lastName}
              setValue={handleChange}
            />
            <Input
              title="Correo Electrónico"
              name="email"
              type="email"
              required={true}
              value={user.email}
              setValue={handleChange}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Teléfono
              </label>
              <PhoneInput
                country="ar"
                value={user.phone}
                onChange={handlePhoneChange}
                inputStyle={{ width: "100%" }}
              />
            </div>
            <Input
              title="Alias"
              name="tradename"
              type="text"
              required={true}
              value={user.tradename}
              setValue={handleChange}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Typography className="text-lg font-semibold hover:text-gray-800">
              Datos de la invitación
            </Typography>
            {userDetailsSuccess && (
              <CheckBox
                title="Permitir un acompañante"
                name="allowPlusOne"
                type="checkbox"
                required={true}
                checked={userDetails.allowPlusOne}
                setValue={handleCheckboxChange}
              />
            )}
            {user.allowPlusOne && (
              <Input
                title="Confirmación de Acompañante"
                name="plusOne"
                type="text"
                value={
                  user.status === "Pending"
                    ? "Aún no ha respondido"
                    : user.plusOne
                    ? "Aceptó"
                    : "Rechazó"
                }
                disabled={true}
              />
            )}

            <Textarea
              title="Nombre"
              name="name"
              type="text"
              required={true}
              value={user.name}
              disab
              setValue={handleChange}
            />
          </div>

          <div className="col-span-full">
            <div className="col-span-full mt-3 flex justify-center text-center">
              {errorUpdate && (
                <Alert title="Ocurrió un error" text={errorUpdate} />
              )}
            </div>
            <div className="col-span-full flex justify-center text-center">
              <Button
                type="submit"
                className="mt-6 flex justify-center rounded-md p-2 px-4 text-center text-lg font-normal text-white hover:bg-opacity-90"
                fullWidth
              >
                {loadingUpdate ? "Actualizando..." : "Actualizar"}
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default UserEdit;
