import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getLoginData } from "../../../../actions/userActions";
import { Input } from "../../../../components/elements/Inputs";
import Alert from "../../../../components/alerts/Alert";
import { PAYMENT_METHOD_ADMIN_UPDATE_RESET } from "../../../../constants/paymentMethodConstants";
import {
  adminUpdatePaymentMethod,
  adminDetailsPaymentMethod,
} from "../../../../actions/paymentMethodActions";

import { Button, Typography } from "@material-tailwind/react";

export function PaymentMethodEdit() {
  const { id } = useParams();
  const [paymentMethod, setPaymentMethod] = useState({
    tipo: "Cash", // Default value
    alias: "",
    clabe: "",
    accountNumber: "",
    holder: "",
    bank: "",
    priority: 0,
    maxAmount: 0,
    maxPercentage: 0,
    paymentDate: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const adminPaymentMethodUpdate = useSelector(
    (state) => state.adminPaymentMethodUpdate
  );
  const { error: errorUpdate, message: messageUpdate } = adminPaymentMethodUpdate;

  const adminPaymentMethodDetails = useSelector(
    (state) => state.adminPaymentMethodDetails
  );
  const { paymentMethodDetails } = adminPaymentMethodDetails;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentMethod((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = () => {
    dispatch(adminUpdatePaymentMethod(id, paymentMethod));
  };

  useEffect(() => {
    if (messageUpdate) {
      dispatch({ type: PAYMENT_METHOD_ADMIN_UPDATE_RESET });
      navigate("/admin/metodosDePago");
    }

    if (!userInfo) {
      dispatch(getLoginData());
    } else if (!paymentMethodDetails || paymentMethodDetails._id !== id) {
      dispatch(adminDetailsPaymentMethod(id));
    } else {
      // Asegurar que los detalles del método de pago coincidan con el estado inicial
      setPaymentMethod({
        tipo: paymentMethodDetails.type || "Cash",
        alias: paymentMethodDetails.alias || "",
        clabe: paymentMethodDetails.clabe || "",
        accountNumber: paymentMethodDetails.accountNumber || "",
        holder: paymentMethodDetails.holder || "",
        bank: paymentMethodDetails.bank || "",
        priority: paymentMethodDetails.priority || 0,
        maxAmount: paymentMethodDetails.maxAmount || 0,
        maxPercentage: paymentMethodDetails.maxPercentage || 0,
        paymentDate: paymentMethodDetails.paymentDate
          ? paymentMethodDetails.paymentDate.split("T")[0] // Formato YYYY-MM-DD
          : "",
      });
    }
  }, [dispatch, userInfo, paymentMethodDetails, id, messageUpdate, navigate]);

  return (
    <div className="bg-slate-50 p-4">
      {errorUpdate && <Alert title="Error" text={errorUpdate} />}
      <h2 className="text-palette-primary text-xl font-bold">
        Editar Método de Pago
      </h2>
      <form
        className="mt-3 grid gap-6 md:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler();
        }}
      >
        {/* Tipo */}
        <div className="col-span-full">
          <label className="block text-sm font-medium">Tipo</label>
          <select
            name="tipo"
            value={paymentMethod.tipo}
            onChange={handleChange}
            className="w-full rounded-md border p-2"
            required
          >
            <option value="Cash">Efectivo</option>
            <option value="Transfer">Transferencia</option>
            <option value="Credit Card">Tarjeta de Crédito</option>
          </select>
        </div>

        {/* Campos dinámicos */}
        {paymentMethod.tipo === "Cash" && (
          <>
            <Input
              title="Monto Máximo"
              name="maxAmount"
              type="number"
              value={paymentMethod.maxAmount}
              setValue={handleChange}
            />
            <Input
              title="Porcentaje Máximo"
              name="maxPercentage"
              type="number"
              value={paymentMethod.maxPercentage}
              setValue={handleChange}
            />
          </>
        )}

        {paymentMethod.tipo === "Transfer" && (
          <>
            <Input title="Alias" name="alias" value={paymentMethod.alias} setValue={handleChange} />
            <Input title="CLABE" name="clabe" value={paymentMethod.clabe} setValue={handleChange} />
            <Input
              title="Número de Cuenta"
              name="accountNumber"
              value={paymentMethod.accountNumber}
              setValue={handleChange}
            />
            <Input
              title="Titular"
              name="holder"
              value={paymentMethod.holder}
              setValue={handleChange}
            />
            <Input title="Banco" name="bank" value={paymentMethod.bank} setValue={handleChange} />
            <Input
              title="Prioridad"
              name="priority"
              type="number"
              value={paymentMethod.priority}
              setValue={handleChange}
            />
            <Input
              title="Fecha de Pago"
              name="paymentDate"
              type="date"
              value={paymentMethod.paymentDate}
              setValue={handleChange}
            />
          </>
        )}

        {paymentMethod.tipo === "Credit Card" && (
          <>
            <Input title="Alias" name="alias" value={paymentMethod.alias} setValue={handleChange} />
            <Input
              title="Número de Cuenta"
              name="accountNumber"
              value={paymentMethod.accountNumber}
              setValue={handleChange}
            />
            <Input
              title="Titular"
              name="holder"
              value={paymentMethod.holder}
              setValue={handleChange}
            />
            <Input title="Banco" name="bank" value={paymentMethod.bank} setValue={handleChange} />
            <Input
              title="Prioridad"
              name="priority"
              type="number"
              value={paymentMethod.priority}
              setValue={handleChange}
            />
          </>
        )}

        {/* Botón de envío */}
        <div className="col-span-full flex justify-center">
          <Button
            type="submit"
            className="mt-6 rounded-md bg-blue-500 p-2 text-lg text-white hover:bg-blue-600"
          >
            Actualizar Método de Pago
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PaymentMethodEdit;
