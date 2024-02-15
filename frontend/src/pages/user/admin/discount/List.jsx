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
//import Empty from "../../../components/Admin/Empty";
//import SearchBox from "../../../components/SearchBox";
import Loader from "../../../../components/Loader";
//import Paginate from "../../../components/Paginate";
import {
  DISCOUNT_ADMIN_LIST_RESET,
  DISCOUNT_ADMIN_DELETE_RESET,
} from "../../../../constants/discountConstants";
import { adminListDiscounts } from "../../../../actions/discountActions";
import Delete from "./Delete";
import Edit from "./Edit";
import Create from "./Create";

export function DiscountList() {
  const keyword = useParams().keyword;
  const pageNumber = useParams().pageNumber || 1;
  const sort = useParams().sort;
  const order = useParams().order;
  const [keywordSearch, setKeywordSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [prevSearch, setPrevSearch] = useState(false);
  const [sortName, setSortName] = useState("");
  const [sortSkuTrep, setSortSkuTrep] = useState("");
  const [sortDiscount, setSortDiscount] = useState("");
  const [sortCountInStock, setSortCountInStock] = useState("");
  //
  const [countView, setCountView] = useState(10);
  const [search, setSearch] = useState("");
  //
  const [viewModal, setViewModal] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const adminDiscountList = useSelector((state) => state.adminDiscountList);
  const {
    loading: loadingDiscounts,
    error: errorDiscounts,
    success,
    discounts,
    page,
    pages,
  } = adminDiscountList;
  const [listArticle, setListArticle] = useState(discounts ? discounts : []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const submitSearch = () => {
    dispatch({ type: DISCOUNT_ADMIN_LIST_RESET });
    setPrevSearch(true);
    if (keywordSearch.trim()) {
      navigate(`/admin/descuentos/search/${keywordSearch}`);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      submitSearch();
    }
  };
  const submitSort = (field) => {
    dispatch({ type: DISCOUNT_ADMIN_LIST_RESET });
    var newSort = "";
    var newOrder = "";
    switch (field) {
      case "name":
        newSort = field;
        newOrder = sortName === "descending" ? "ascending" : "descending";
        setSortDiscount("");
        setSortCountInStock("");
        setSortSkuTrep("");
        setSortName(newOrder);
        break;
      case "skuTrep":
        newSort = field;
        newOrder = sortSkuTrep === "descending" ? "ascending" : "descending";
        setSortDiscount("");
        setSortCountInStock("");
        setSortSkuTrep(newOrder);
        setSortName("");
        break;
      case "discount":
        newSort = field;
        newOrder = sortDiscount === "descending" ? "ascending" : "descending";
        setSortDiscount(newOrder);
        setSortCountInStock("");
        setSortSkuTrep("");
        setSortName("");
        break;
      case "countInStock":
        newSort = field;
        newOrder =
          sortCountInStock === "descending" ? "ascending" : "descending";
        setSortDiscount("");
        setSortCountInStock(newOrder);
        setSortSkuTrep("");
        setSortName("");
        break;
    }
    if (keyword) {
      navigate(
        `/admin/descuentos/search/${keyword}/sort/${newSort}/order/${newOrder}`
      );
    } else {
      navigate(`/admin/descuentos/sort/${newSort}/order/${newOrder}`);
    }
  };
  const newSize = (size) => {
    setPageSize(size);
    dispatch({ type: DISCOUNT_ADMIN_LIST_RESET });
    navigate("/admin/descuentos");
  };

  const redirect = "/login";
  useEffect(() => {
    let newArray = discounts;
    if (search.length > 0) {
      //funcion de busqueda
      newArray = discounts.filter((element) =>
        element.name.toLowerCase().includes(search)
      );
    }
    if (!success && !errorDiscounts) {
      dispatch(adminListDiscounts(keyword, pageNumber, pageSize, sort, order));
    }
    var link = location.pathname.split("/");
    if (link[link.length - 1] === "eliminar") {
      actionOpenDeleteModal();
    } else if (link[link.length - 1] === "crear") {
      actionOpenCreateModal();
    } else if (link[link.length - 1] === "editar") {
      actionOpenEditModal();
    } else {
      setViewModal(false);
      dispatch({
        type: DISCOUNT_ADMIN_DELETE_RESET,
      });
    }
    setListArticle(newArray ? newArray : []);
  }, [countView, search, discounts, id, location, errorDiscounts]);

  const actionOpenDeleteModal = () => {
    setViewModal("delete");
  };
  const actionOpenEditModal = () => {
    setViewModal("edit");
  };
  const actionOpenCreateModal = () => {
    setViewModal("create");
  };
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {viewModal !== false && viewModal === "delete" && (
        <Delete
          closeAction={() => {
            setViewModal(false);
            navigate("/admin/descuentos");
          }}
          id={id}
        />
      )}
      {viewModal !== false && viewModal === "edit" && (
        <Edit
          closeAction={() => {
            setViewModal(false);
            navigate("/admin/descuentos");
          }}
          id={id}
        />
      )}
      {viewModal !== false && viewModal === "create" && (
        <Create
          closeAction={() => {
            setViewModal(false);
            navigate("/admin/descuentos");
          }}
        />
      )}
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <div className="flex items-center">
            <Typography variant="h6" color="white">
              Descuentos
            </Typography>

            <div className="flex w-full flex-wrap items-center justify-end  gap-3">
              <Link to="/admin/descuentos/crear" className="justify-end">
                <Button variant="gradient" color="white">
                  Crear
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
          {loadingDiscounts ? (
            <div className="flex w-full justify-center">
              <Loader />
            </div>
          ) : (
            <>
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {[
                      "Codigo",
                      "Cantidad",
                      "Fecha inicio",
                      "Fecha fin",
                      "Activo",
                      "",
                    ]?.map((el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-5 text-left"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-bold uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {" "}
                  {listArticle?.map(
                    (
                      {
                        _id,
                        code,
                        discountType,
                        quantity,
                        startDate,
                        endDate,
                        active,
                      },
                      key
                    ) => {
                      const className = `py-3 px-5 ${
                        key === listArticle.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                      }`;
                      return (
                        <tr key={key}>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <div>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-semibold"
                                >
                                  {code}
                                </Typography>
                                <Typography className="text-xs font-normal text-blue-gray-500">
                                  {discountType}
                                </Typography>
                              </div>
                            </div>
                          </td>

                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <div>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-semibold"
                                >
                                  {discountType === "FreeShipping"
                                    ? ""
                                    : quantity}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <div>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-semibold"
                                >
                                  {startDate
                                    ? startDate.substring(8, 10) +
                                      "/" +
                                      startDate.substring(5, 7) +
                                      "/" +
                                      startDate.substring(0, 4)
                                    : "--/--/----"}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <div>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-semibold"
                                >
                                  {endDate
                                    ? endDate.substring(8, 10) +
                                      "/" +
                                      endDate.substring(5, 7) +
                                      "/" +
                                      endDate.substring(0, 4)
                                    : "--/--/----"}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={className}>
                            <Chip
                              variant="gradient"
                              color={active ? "green" : "blue-gray"}
                              value={active ? "Activo" : "Desactivado"}
                              className="py-0.5 px-2 text-[11px] font-medium"
                            />
                          </td>
                          <td className={className}>
                            <Link to={`/admin/descuentos/${_id}/editar`}>
                              <Typography
                                as="a"
                                href="#"
                                className="text-xs font-semibold text-blue-gray-600 hover:text-blue-500"
                              >
                                Editar
                              </Typography>
                            </Link>
                            <Link to={`/admin/descuentos/${_id}/eliminar`}>
                              <Typography
                                as="a"
                                className="text-xs font-semibold text-blue-gray-600 hover:text-red-500"
                              >
                                Eliminar
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
    </div>
  );
}

export default DiscountList;
