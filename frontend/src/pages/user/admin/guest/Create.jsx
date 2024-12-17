
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminCreateGuest } from "../../../../actions/guestActions";
import { getLoginData } from "../../../../actions/userActions";

import { Input, CheckBox } from "../../../../components/elements/Inputs";
import Alert from "../../../../components/alerts/Alert";
import { GUEST_ADMIN_CREATE_RESET } from "../../../../constants/guestConstants";
import { Button, Typography } from "@material-tailwind/react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export function UserCreate() {
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    tradename: "",
    userType: "Client",
    shippingAddress: {
      street: "",
      number: "",
      neighborhood: "",
      postalCode: "",
      city: "",
      state: "",
      country: "",
    },
    requiresInvoice: false,
    useShippingAsBilling: true,
    billing: {
      taxId: "",
      businessName: "",
      fiscalAddress: {
        street: "",
        number: "",
        neighborhood: "",
        postalCode: "",
        city: "",
        state: "",
        country: "",
      },
    },
    credit: {
      enabled: false,
      creditLimit: "",
      creditUsed: "",
    },
  });
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const adminGuestCreate = useSelector((state) => state.adminGuestCreate);
  const { loading: loadingCreateUser, error: errorCreateUser, message: messageCreateUser } = adminGuestCreate;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleNestedChange = (e, group, field) => {
    const { value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [group]: { ...prevState[group], [field]: value },
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: checked }));
  };

  const toggleBillingAddress = (checked) => {
    setUser((prevState) => ({
      ...prevState,
      useShippingAsBilling: checked,
      billing: {
        ...prevState.billing,
        fiscalAddress: checked ? { ...prevState.shippingAddress } : {},
      },
    }));
  };

  const generatePassword = () => {
    const randomPassword = Math.random().toString(36).slice(-8);
    setPassword(randomPassword);
  };

  const submitHandler = () => {
    dispatch(adminCreateGuest(user, password));
  };

  useEffect(() => {
    if (messageCreateUser) {
      dispatch({ type: GUEST_ADMIN_CREATE_RESET });
      navigate("/admin/invitados");
    }
    if (!userInfo) {
      dispatch(getLoginData());
    }
  }, [userInfo, messageCreateUser]);

  return (
    <div className="bg-slate-50 p-4">
      <h2 className="text-palette-primary text-xl font-bold">Agregar Usuario</h2>
      <form
        className="mt-3 grid gap-6 md:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler();
        }}
      >
        {/* Información General */}
        <div className="flex flex-col gap-3">
          <Typography className="text-lg font-semibold">Información General</Typography>
          <Input title="Nombre" name="name" value={user.name} setValue={handleChange} />
          <Input title="Apellido" name="lastName" value={user.lastName} setValue={handleChange} />
          <Input title="Correo Electrónico" name="email" value={user.email} setValue={handleChange} />
          <PhoneInput country="mx" value={user.phone} onChange={(value) => setUser((prev) => ({ ...prev, phone: value }))} inputStyle={{ width: "100%" }} />
          <Input title="Alias" name="tradename" value={user.tradename} setValue={handleChange} />

         {/* Generador de Contraseña */}
<Input
  title="Contraseña"
  name="password"
  value={password}
  setValue={(e) => setPassword(e.target.value)}
/>
<Button
  type="button"
  onClick={generatePassword}
  className="w-1/2 bg-blue-500 text-white rounded"
>
  Generar Contraseña
</Button>

          {/* Tipo de Usuario */}
          <div>
            <label className="text-sm font-medium text-gray-700">Tipo de Usuario</label>
            <select
              name="userType"
              value={user.userType}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:ring focus:ring-blue-500"
            >
              <option value="Client">Cliente</option>
              <option value="Admin">Administrador</option>
              <option value="Supplier">Proveedor</option>
            </select>
          </div>

          {/* Crédito */}
          <Typography className="text-lg font-semibold">Crédito</Typography>
          <CheckBox title="Habilitar Crédito" name="credit.enabled" value={user.credit.enabled} setValue={handleCheckboxChange} />
          {user.credit.enabled && (
            <>
              <Input title="Límite de Crédito" value={user.credit.creditLimit} setValue={(e) => handleNestedChange(e, "credit", "creditLimit")} />
              <Input title="Crédito Usado" value={user.credit.creditUsed} setValue={(e) => handleNestedChange(e, "credit", "creditUsed")} />
            </>
          )}
        </div>

        {/* Dirección de Envío */}
        <div className="flex flex-col gap-3">
          <Typography className="text-lg font-semibold">Dirección de Envío</Typography>
          <Input title="Calle" value={user.shippingAddress.street} setValue={(e) => handleNestedChange(e, "shippingAddress", "street")} />
          <Input title="Número" value={user.shippingAddress.number} setValue={(e) => handleNestedChange(e, "shippingAddress", "number")} />
          <Input title="Colonia" value={user.shippingAddress.neighborhood} setValue={(e) => handleNestedChange(e, "shippingAddress", "neighborhood")} />
          <Input title="Código Postal" value={user.shippingAddress.postalCode} setValue={(e) => handleNestedChange(e, "shippingAddress", "postalCode")} />
            {/* Facturación */}
     
            <Typography className="text-lg font-semibold">Facturación</Typography>
          <CheckBox title="¿Requiere Factura?" name="requiresInvoice" value={user.requiresInvoice} setValue={handleCheckboxChange} />
          {user.requiresInvoice && (
            <>
              <CheckBox title="Usar la misma dirección de envío" checked={user.useShippingAsBilling} setValue={(e) => toggleBillingAddress(e.target.checked)} />
              {!user.useShippingAsBilling && (
                <>
                  <Input title="RFC" value={user.billing.taxId} setValue={(e) => handleNestedChange(e, "billing", "taxId")} />
                  <Input title="Razón Social" value={user.billing.businessName} setValue={(e) => handleNestedChange(e, "billing", "businessName")} />
                  <Input title="Calle" value={user.billing.fiscalAddress.street} setValue={(e) => handleNestedChange(e, "billing.fiscalAddress", "street")} />
                  <Input title="Número" value={user.billing.fiscalAddress.number} setValue={(e) => handleNestedChange(e, "billing.fiscalAddress", "number")} />
                  <Input title="Colonia" value={user.billing.fiscalAddress.neighborhood} setValue={(e) => handleNestedChange(e, "billing.fiscalAddress", "neighborhood")} />
                  <Input title="Código Postal" value={user.billing.fiscalAddress.postalCode} setValue={(e) => handleNestedChange(e, "billing.fiscalAddress", "postalCode")} />
                </>
              )}
            </>
          )}
        </div>

        {/* Botón de envío */}
        <div className="col-span-full flex justify-center">
          <Button type="submit" className="mt-6 rounded-md p-2 text-lg text-white bg-blue-500">
            {loadingCreateUser ? "Creando..." : "Crear"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UserCreate;
