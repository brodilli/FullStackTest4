import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";
import { AiOutlineWarning } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLoginData } from "../../../../actions/userActions";
import {
  adminDeletePaymentMethod,
  adminDetailsPaymentMethod,
} from "../../../../actions/paymentMethodActions";
import Loader from "../../../../components/Loader";

export function PaymentMethodDelete() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminPaymentMethodDetails = useSelector(
    (state) => state.adminPaymentMethodDetails
  );
  const {
    loading: loadingDetails,
    error: errorDetails,
    paymentMethodDetails,
  } = adminPaymentMethodDetails;

  const adminPaymentMethodDelete = useSelector(
    (state) => state.adminPaymentMethodDelete
  );
  const { loading: loadingDelete, message } = adminPaymentMethodDelete;

  useEffect(() => {
    if ((id && !paymentMethodDetails) || (id && paymentMethodDetails._id !== id)) {
      dispatch(adminDetailsPaymentMethod(id));
    }
    if (message) {
      navigate("/admin/metodosDePago");
    }
  }, [dispatch, paymentMethodDetails, message, id, navigate]);

  const submitHandler = () => {
    dispatch(adminDeletePaymentMethod(id));
  };

  const closeHandler = () => {
    navigate("/admin/metodosDePago");
  };

  return (
    <div className="fixed top-0 left-0 z-50 flex min-h-screen w-full items-center justify-center bg-black/30">
      {loadingDetails ? (
        <Loader />
      ) : (
        <div className="relative max-h-[90%] w-11/12 overflow-hidden rounded-md bg-white shadow lg:w-1/2 2xl:w-2/6">
          <div className="flex w-full items-center justify-between rounded-t-md bg-blue-gray-800 p-2 px-4 text-white">
            <h2 className="text-2xl">Eliminar Método de Pago</h2>
            <button
              type="button"
              onClick={closeHandler}
              className="text-2xl font-bold hover:text-red-600"
            >
              <MdClose />
            </button>
          </div>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              submitHandler();
            }}
          >
            <div className="flex flex-col justify-center gap-3">
              <div className="my-3 flex justify-center">
                <AiOutlineWarning className="h-24 w-24 fill-red-600" />
              </div>
              <div className="my-3 flex justify-center text-lg font-semibold">
                ¿Seguro que deseas eliminar este Método de Pago?
              </div>

              {/* Mostrar Imagen si existe */}
              {paymentMethodDetails?.image?.url && (
                <div className="flex justify-center">
                  <img
                    className="h-24 w-24 rounded object-cover"
                    src={paymentMethodDetails?.image?.url}
                    alt="Payment Method"
                  />
                </div>
              )}

              {/* Alias */}
              <div className="flex w-full justify-center px-6 text-2xl">
                <div className="flex h-12 w-1/2 justify-end">
                  <p className="my-auto">Alias:</p>
                </div>
                <div className="mx-3 flex w-1/2 justify-center">
                  <input
                    className="mx-2 w-full rounded-md border-2 p-2 text-center font-bold outline-none focus:border-blue-500"
                    defaultValue={paymentMethodDetails?.alias}
                    disabled
                  />
                </div>
              </div>

              {/* Tipo */}
              <div className="flex w-full justify-center px-6 text-2xl">
                <div className="flex h-12 w-1/2 justify-end">
                  <p className="my-auto">Tipo:</p>
                </div>
                <div className="mx-3 flex w-1/2 justify-center">
                  <input
                    className="mx-2 w-full rounded-md border-2 p-2 text-center font-bold outline-none focus:border-blue-500"
                    defaultValue={paymentMethodDetails?.type}
                    disabled
                  />
                </div>
              </div>

              {/* Banco */}
              <div className="flex w-full justify-center px-6 text-2xl">
                <div className="flex h-12 w-1/2 justify-end">
                  <p className="my-auto">Banco:</p>
                </div>
                <div className="mx-3 flex w-1/2 justify-center">
                  <input
                    className="mx-2 w-full rounded-md border-2 p-2 text-center font-bold outline-none focus:border-blue-500"
                    defaultValue={paymentMethodDetails?.bank || "N/A"}
                    disabled
                  />
                </div>
              </div>

              {/* Botón Eliminar */}
              <div className="mt-6 flex justify-center text-center">
                <button
                  className="mb-6 flex rounded-full bg-red-300 p-2 px-4 text-lg text-gray-700 hover:bg-red-900 hover:text-white hover:shadow-2xl"
                  type="submit"
                >
                  {loadingDelete && (
                    <img
                      src="/assets/loader.svg"
                      className="my-auto mr-3 h-6 w-6"
                      alt="Cargando..."
                    />
                  )}
                  {loadingDelete ? "Eliminando..." : "Eliminar"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default PaymentMethodDelete;

