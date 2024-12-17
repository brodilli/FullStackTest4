import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getLoginData } from "../../../../actions/userActions";
import { Input } from "../../../../components/elements/Inputs";
import Alert from "../../../../components/alerts/Alert";
import { PAYMENT_METHOD_ADMIN_CREATE_RESET } from "../../../../constants/paymentMethodConstants";
import { adminCreatePaymentMethod } from "../../../../actions/paymentMethodActions";

import { Button, Typography } from "@material-tailwind/react";

export function PaymentMethodCreate() {
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

  const adminPaymentMethodCreate = useSelector(
    (state) => state.adminPaymentMethodCreate
  );
  const { error: errorCreate, message: messageCreate } =
    adminPaymentMethodCreate;

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentMethod((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = () => {
    dispatch(adminCreatePaymentMethod(paymentMethod));
  };

  useEffect(() => {
    if (messageCreate) {
      dispatch({ type: PAYMENT_METHOD_ADMIN_CREATE_RESET });
      navigate("/admin/metodosDePago");
    }
    if (!userInfo) {
      dispatch(getLoginData());
    }
  }, [dispatch, userInfo, messageCreate, navigate]);

  return (
    <div className="bg-slate-50 p-4">
      {errorCreate && <Alert title="Error" text={errorCreate} />}
      <h2 className="text-palette-primary text-xl font-bold">
        Agregar Método de Pago
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
            <Input
              title="Alias"
              name="alias"
              value={paymentMethod.alias}
              setValue={handleChange}
            />
            <Input
              title="CLABE"
              name="clabe"
              value={paymentMethod.clabe}
              setValue={handleChange}
            />
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
            <Input
              title="Banco"
              name="bank"
              value={paymentMethod.bank}
              setValue={handleChange}
            />
            <Input
              title="Prioridad"
              name="priority"
              type="number"
              value={paymentMethod.priority}
              setValue={handleChange}
            />
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
            <Input
              title="Alias"
              name="alias"
              value={paymentMethod.alias}
              setValue={handleChange}
            />
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
            <Input
              title="Banco"
              name="bank"
              value={paymentMethod.bank}
              setValue={handleChange}
            />
            <Input
              title="Prioridad"
              name="priority"
              type="number"
              value={paymentMethod.priority}
              setValue={handleChange}
            />
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
            <Input
              title="Fecha de Pago"
              name="paymentDate"
              type="date"
              value={paymentMethod.paymentDate}
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
            Crear Método de Pago
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PaymentMethodCreate;
