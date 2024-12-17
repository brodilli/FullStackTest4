import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import Loader from "../../../../components/Loader";
import Paginate from "../../../../components/Paginate";
import {
  PAYMENT_METHOD_ADMIN_DELETE_RESET,
} from "../../../../constants/paymentMethodConstants";
import { adminListPaymentMethods } from "../../../../actions/paymentMethodActions";
import Delete from "./Delete";

export function PaymentMethodList() {
  const keyword = useParams().keyword;
  const pageNumber = useParams().pageNumber || 1;
  const sort = useParams().sort;
  const order = useParams().order;
  const [keywordSearch, setKeywordSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState(sort || "alias");
  const [sortOrder, setSortOrder] = useState(order || "ascending");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const adminPaymentMethodsList = useSelector(
    (state) => state.adminPaymentMethodsList
  );
  const { loading, error, paymentMethods, page, pages } = adminPaymentMethodsList;

  useEffect(() => {
    dispatch({ type: PAYMENT_METHOD_ADMIN_DELETE_RESET });
    dispatch(
      adminListPaymentMethods(
        keywordSearch,
        pageNumber,
        pageSize,
        sortField,
        sortOrder
      )
    );
  }, [dispatch, keywordSearch, pageNumber, pageSize, sortField, sortOrder]);

  const submitSort = (field) => {
    const newOrder =
      field === sortField
        ? sortOrder === "descending"
          ? "ascending"
          : "descending"
        : "ascending";
    setSortField(field);
    setSortOrder(newOrder);
    navigate(`/admin/metodosDePago/sort/${field}/order/${newOrder}`);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/admin/metodosDePago/search/${keywordSearch}`);
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {location.pathname.includes("eliminar") && <Delete />}
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <div className="flex items-center justify-between">
            <Typography variant="h6" color="white">
              Métodos de Pago
            </Typography>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Buscar métodos..."
                className="rounded-md p-2 text-sm"
                value={keywordSearch}
                onChange={(e) => setKeywordSearch(e.target.value)}
                onKeyDown={handleSearch}
              />
              <Link to="/admin/metodosDePago/crear">
                <Button variant="gradient" color="white">
                  Crear Método
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-auto px-0 pt-0 pb-2">
          {loading ? (
            <Loader />
          ) : (
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {[
                    { field: "alias", text: "Alias" },
                    { field: "holder", text: "Titular" },
                    { field: "bank", text: "Banco" },
                    { field: "tipo", text: "Tipo" },
                    { field: "priority", text: "Prioridad" },
                    { field: "maxAmount", text: "Monto Máximo" },
                    { field: "maxPercentage", text: "Porcentaje Máximo" },
                    { field: "paymentDate", text: "Fecha de Pago" },
                    { field: null, text: "Acciones" },
                  ].map((el) => (
                    <th
                      key={el.text}
                      onClick={() => el.field && submitSort(el.field)}
                      className="cursor-pointer border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="flex text-xs font-bold uppercase text-blue-gray-400"
                      >
                        {el.text}
                        {sortField === el.field && (
                          <>
                            {sortOrder === "ascending" ? (
                              <ArrowUpIcon className="ml-2 h-4 w-4" />
                            ) : (
                              <ArrowDownIcon className="ml-2 h-4 w-4" />
                            )}
                          </>
                        )}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paymentMethods?.map((paymentMethod) => (
                  <tr
                    key={paymentMethod._id}
                    className="border-b border-blue-gray-50"
                  >
                    <td className="py-3 px-5">{paymentMethod.alias}</td>
                    <td className="py-3 px-5">{paymentMethod.holder}</td>
                    <td className="py-3 px-5">{paymentMethod.bank}</td>
                    <td className="py-3 px-5">{paymentMethod.tipo}</td>
                    <td className="py-3 px-5">{paymentMethod.priority}</td>
                    <td className="py-3 px-5">{paymentMethod.maxAmount}</td>
                    <td className="py-3 px-5">{paymentMethod.maxPercentage}%</td>
                    <td className="py-3 px-5">
                      {new Date(paymentMethod.paymentDate).toLocaleDateString()}
                    </td>
                    {/* Actions */}
                    <td className="flex flex-col py-3 px-5">
                      <Link
                        to={`/admin/metodosDePago/${paymentMethod._id}/editar`}
                      >
                        <Typography
                          as="a"
                          className="text-blue-500 hover:underline"
                        >
                          Editar
                        </Typography>
                      </Link>
                      <Link
                        to={`/admin/metodosDePago/${paymentMethod._id}/eliminar`}
                      >
                        <Typography
                          as="a"
                          className="text-red-500 hover:underline"
                        >
                          Eliminar
                        </Typography>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardBody>
      </Card>
      {pages > 1 && (
        <div className="flex justify-center">
          <Paginate
            page={page}
            pages={pages}
            baseRoute="/admin/metodosDePago"
            keyword={keywordSearch}
            sort={sortField}
            order={sortOrder}
          />
        </div>
      )}
    </div>
  );
}

export default PaymentMethodList;
