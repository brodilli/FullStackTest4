import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminDetailsUser, adminUpdateUser } from "../../../../actions/userActions";
import { getLoginData } from "../../../../actions/userActions";

import { Input, CheckBox } from "../../../../components/elements/Inputs";
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
    userType: "",
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

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const adminUserDetails = useSelector((state) => state.adminUserDetails);
  const { loading: loadingDetails, error: errorDetails, userDetails } = adminUserDetails;

  const adminUserUpdate = useSelector((state) => state.adminUserUpdate);
  const { loading: loadingUpdate, error: errorUpdate, messageUpdate } = adminUserUpdate;

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

  const submitHandler = () => {
    dispatch(adminUpdateUser(id, user));
  };

  useEffect(() => {
    if (messageUpdate) {
      navigate("/admin/users");
    } else if (!userDetails || userDetails._id !== id) {
      dispatch(adminDetailsUser(id));
    } else {
      setUser({
        name: userDetails.name || "",
        lastName: userDetails.lastName || "",
        email: userDetails.email || "",
        phone: userDetails.phone || "",
        tradename: userDetails.tradename || "",
        userType: userDetails.userType || "Client",
        shippingAddress: userDetails.shippingAddress || {},
        requiresInvoice: userDetails.requiresInvoice || false,
        useShippingAsBilling: userDetails.useShippingAsBilling || true,
        billing: userDetails.billing || {},
        credit: userDetails.credit || { enabled: false, creditLimit: "", creditUsed: "" },
      });
    }
  }, [dispatch, id, userDetails, messageUpdate]);

  return (
    <div className="bg-slate-50 p-4">
      <h2 className="text-palette-primary text-xl font-bold">Editar Usuario</h2>
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
          {/* Información General */}
          <div className="flex flex-col gap-3">
            <Typography className="text-lg font-semibold">Información General</Typography>
            <Input title="Nombre" name="name" value={user.name} setValue={handleChange} />
            <Input title="Apellido" name="lastName" value={user.lastName} setValue={handleChange} />
            <Input title="Correo Electrónico" name="email" value={user.email} setValue={handleChange} />
            <PhoneInput country="mx" value={user.phone} onChange={(value) => setUser((prev) => ({ ...prev, phone: value }))} inputStyle={{ width: "100%" }} />
            <Input title="Alias" name="tradename" value={user.tradename} setValue={handleChange} />

            <div>
              <label className="text-sm font-medium text-gray-700">Tipo de Usuario</label>
              <select name="userType" value={user.userType} onChange={handleChange} className="w-full p-2 rounded-md">
                <option value="Client">Cliente</option>
                <option value="Admin">Administrador</option>
                <option value="Supplier">Proveedor</option>
              </select>
            </div>
          </div>

          {/* Dirección de Envío */}
          <div className="flex flex-col gap-3">
            <Typography className="text-lg font-semibold">Dirección de Envío</Typography>
            <Input title="Calle" value={user.shippingAddress.street} setValue={(e) => handleNestedChange(e, "shippingAddress", "street")} />
            <Input title="Número" value={user.shippingAddress.number} setValue={(e) => handleNestedChange(e, "shippingAddress", "number")} />
            <Input title="Colonia" value={user.shippingAddress.neighborhood} setValue={(e) => handleNestedChange(e, "shippingAddress", "neighborhood")} />
            <Input title="Código Postal" value={user.shippingAddress.postalCode} setValue={(e) => handleNestedChange(e, "shippingAddress", "postalCode")} />
          </div>

          {/* Facturación */}
          <div className="flex flex-col gap-3">
            <Typography className="text-lg font-semibold">Facturación</Typography>
            <CheckBox title="¿Requiere Factura?" name="requiresInvoice" value={user.requiresInvoice} setValue={handleCheckboxChange} />
            <CheckBox title="Usar la misma dirección de envío" checked={user.useShippingAsBilling} setValue={(e) => toggleBillingAddress(e.target.checked)} />
            {!user.useShippingAsBilling && user.requiresInvoice && (
              <>
                <Input title="RFC" value={user.billing.taxId} setValue={(e) => handleNestedChange(e, "billing", "taxId")} />
                <Input title="Razón Social" value={user.billing.businessName} setValue={(e) => handleNestedChange(e, "billing", "businessName")} />
              </>
            )}
          </div>

          {/* Crédito */}
          <div>
            <Typography className="text-lg font-semibold">Crédito</Typography>
            <CheckBox title="Habilitar Crédito" name="credit.enabled" value={user.credit.enabled} setValue={handleCheckboxChange} />
            {user.credit.enabled && (
              <>
                <Input title="Límite de Crédito" value={user.credit.creditLimit} setValue={(e) => handleNestedChange(e, "credit", "creditLimit")} />
                <Input title="Crédito Usado" value={user.credit.creditUsed} setValue={(e) => handleNestedChange(e, "credit", "creditUsed")} />
              </>
            )}
          </div>

          <div className="col-span-full flex justify-center">
            <Button type="submit" className="bg-blue-500 text-white rounded-md p-2">
              {loadingUpdate ? "Actualizando..." : "Actualizar"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default UserEdit;
