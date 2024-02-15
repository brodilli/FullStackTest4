import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
//import Empty from "../../../components/Admin/Empty";
import SearchBox from "../../../../components/SearchBox";
import Paginate from "../../../../components/Paginate";
import Loader from "../../../../components/Loader";
import { ORDER_LIST_RESET } from "../../../../constants/orderConstants";
import { listOrders } from "../../../../actions/orderActions";
import Export from "./Export";

export function OrderList() {
  const keyword = useParams().keyword;
  const pageNumber = useParams().pageNumber || 1;
  const sort = useParams().sort;
  const order = useParams().order;
  const [keywordSearch, setKeywordSearch] = useState(keyword ? keyword : "");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [prevSearch, setPrevSearch] = useState(false);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  //
  const [countView, setCountView] = useState(10);
  const [search, setSearch] = useState("");
  //
  const [viewModal, setViewModal] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const orderList = useSelector((state) => state.orderList);
  const {
    loading: loadingOrders,
    error: errorOrders,
    success,
    orders,
    page,
    pages,
  } = orderList;
  const [listArticle, setListArticle] = useState(orders ? orders : []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const submitSearch = () => {
    dispatch({ type: ORDER_LIST_RESET });
    setPrevSearch(true);
    if (keywordSearch.trim()) {
      navigate(`/proveedor/ordenes/search/${keywordSearch}`);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      submitSearch();
    }
  };
  const submitSort = (field) => {
    dispatch({ type: ORDER_LIST_RESET });
    const newSort = field;
    const newOrder =
      field === sortField
        ? sortOrder === "descending"
          ? "ascending"
          : "descending"
        : "ascending";
    setSortField(newSort);
    setSortOrder(newOrder);
    if (keywordSearch) {
      navigate(
        `/proveedor/ordenes/search/${keywordSearch}/sort/${newSort}/order/${newOrder}`
      );
    } else {
      navigate(`/proveedor/ordenes/sort/${newSort}/order/${newOrder}`);
    }
  };
  const newSize = (size) => {
    setPageSize(size);
    dispatch({ type: ORDER_LIST_RESET });
    navigate("/proveedor/ordenes");
  };

  const redirect = "/login";
  useEffect(() => {
    let newArray = orders;
    if (search.length > 0) {
      //funcion de busqueda
      newArray = orders.filter((element) =>
        element.name.toLowerCase().includes(search)
      );
    }
    if (sort && order) {
      setSortField(sort);
      setSortOrder(order);
    }
    setKeywordSearch(keyword ? keyword : "");
    if (!success && !errorOrders) {
      dispatch(listOrders(keywordSearch, pageNumber, pageSize, sort, order));
    }

    setListArticle(newArray);
    var link = document.location.href.split("/");
    if (link[link.length - 1] === "exportar") {
      actionOpenExportModal();
    } else {
      setViewModal(false);
    }
  }, [countView, search, orders, location]);
  const actionOpenExportModal = () => {
    setViewModal("export");
  };
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {viewModal !== false && viewModal === "export" && (
        <Export closeAction={() => setViewModal(false)} />
      )}
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <div className="flex items-center">
            <Typography variant="h6" color="white">
              Ordenes
            </Typography>

            <div className="flex w-full flex-wrap items-center justify-end  gap-3">
              <SearchBox
                keywordSearch={keywordSearch}
                setKeywordSearch={setKeywordSearch}
                handleKeyDown={handleKeyDown}
                searchObject="orden"
                emptyRoute="/proveedor/ordenes"
                userType="Supplier"
                prevSearch={prevSearch}
                setPrevSearch={setPrevSearch}
                constant={ORDER_LIST_RESET}
              />
              <Link to="/proveedor/ordenes/exportar" className="justify-end">
                <Button
                  variant="gradient"
                  color="white"
                  className="hover:bg-blue-800 hover:text-white"
                >
                  Exportar
                </Button>
              </Link>
              <span>Mostrar:</span>
              <select
                name="pageSize"
                id="pageSize"
                className="h-8 w-12 rounded-md p-1 text-xs text-black shadow-sm"
                value={pageSize}
                onChange={(e) => newSize(e.target.value)}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          {loadingOrders ? (
            <div className="flex w-full justify-center">
              <Loader />
            </div>
          ) : (
            <>
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {[
                      { field: "orderId", text: "ID" },
                      { field: "supplier", text: "Proveedor" },
                      { field: "marketplace", text: "Marketplace" },
                      { field: "parcel", text: "Paqueteria" },
                      { field: "total", text: "Total" },
                      { field: "createdAt", text: "Fecha" },
                      { field: "status", text: "Status" },
                      "",
                    ].map((el) => (
                      <th
                        key={el.text}
                        className="border-b border-blue-gray-50 py-3 px-5 text-left"
                        onClick={(e) => submitSort(el.field)}
                      >
                        <Typography
                          variant="small"
                          className="flex text-[11px] font-bold uppercase text-blue-gray-400"
                        >
                          {el.text}
                          {sortField === el.field && (
                            <>
                              {sortOrder === "ascending" && (
                                <ArrowUpIcon
                                  className="ml-4 h-3 w-3"
                                  aria-hidden="true"
                                />
                              )}
                              {sortOrder === "descending" && (
                                <ArrowDownIcon
                                  className="ml-4 h-3 w-3"
                                  aria-hidden="true"
                                />
                              )}
                            </>
                          )}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {listArticle?.map(
                    (
                      {
                        _id,
                        orderId,
                        supplier,
                        marketplace,
                        parcel,
                        status,
                        total,
                        createdAt,
                      },
                      key
                    ) => {
                      const className = `py-3 px-5 ${
                        key === listArticle.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                      }`;
                      return (
                        <tr key={orderId}>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <div>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-semibold"
                                >
                                  {orderId}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {supplier.name}
                            </Typography>
                          </td>

                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {marketplace.name}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {parcel.name}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {total}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {new Date(createdAt).toLocaleString("es-MX", {
                                timeZone: "America/Mexico_City",
                              })}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Chip
                              variant="gradient"
                              color={
                                status === "Enviado"
                                  ? "green"
                                  : status === "En proceso"
                                  ? "blue"
                                  : status === "Cancelado" ||
                                    status === "Rechazado por proveedor"
                                  ? "red"
                                  : status === "Devolución"
                                  ? "orange"
                                  : "blue-gray"
                              }
                              value={status}
                              className="py-0.5 px-2 text-[11px] font-medium"
                            />
                          </td>
                          <td className={className}>
                            <Link to={`/proveedor/ordenes/${_id}/status`}>
                              <Typography
                                as="a"
                                href="#"
                                className="text-xs font-semibold text-blue-gray-600 hover:text-blue-500"
                              >
                                Ver
                              </Typography>
                            </Link>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </>
          )}
        </CardBody>
      </Card>
      {pages > 1 && (
        <Paginate
          page={page}
          pages={pages}
          baseRoute="/proveedor/ordenes"
          keyword={keywordSearch}
          sort={sort}
          order={order}
          constant={ORDER_LIST_RESET}
        />
      )}
    </div>
  );
}

export default OrderList;
