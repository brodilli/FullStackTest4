import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
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
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
//import Empty from "../../../components/Admin/Empty";
//import SearchBox from "../../../components/SearchBox";
import Loader from "../../../../components/Loader";
//import Paginate from "../../../components/Paginate";
import {
  DEVELOPMENT_ADMIN_DELETE_RESET,
  DEVELOPMENT_ADMIN_LIST_RESET,
} from "../../../../constants/developmentConstants";
import { adminListDevelopments } from "../../../../actions/developmentActions";
import Delete from "./Delete";

export function DesarrollosList() {
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
  const [sortBrand, setSortBrand] = useState("");
  const [sortCountInStock, setSortCountInStock] = useState("");
  //
  const [countView, setCountView] = useState(10);
  const [search, setSearch] = useState("");
  //
  const [viewModal, setViewModal] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const adminDevelopmentsList = useSelector(
    (state) => state.adminDevelopmentsList
  );
  const {
    loading: loadindDevelopments,
    error: errorDevelopments,
    success,
    developments,
    page,
    pages,
  } = adminDevelopmentsList;
  const [listArticle, setListArticle] = useState(
    developments ? developments : []
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const submitSearch = () => {
    dispatch({ type: DEVELOPMENT_ADMIN_LIST_RESET });
    setPrevSearch(true);
    if (keywordSearch.trim()) {
      navigate(`/admin/desarrollos/search/${keywordSearch}`);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      submitSearch();
    }
  };
  const submitSort = (field) => {
    dispatch({ type: DEVELOPMENT_ADMIN_LIST_RESET });
    var newSort = "";
    var newOrder = "";
    switch (field) {
      case "nombre":
        newSort = field;
        newOrder = sortName === "descending" ? "ascending" : "descending";
        setSortBrand("");
        setSortCountInStock("");
        setSortSkuTrep("");
        setSortName(newOrder);
        break;
      case "direccion":
        newSort = field;
        newOrder = sortSkuTrep === "descending" ? "ascending" : "descending";
        setSortBrand("");
        setSortCountInStock("");
        setSortSkuTrep(newOrder);
        setSortName("");
        break;
      case "niveles":
        newSort = field;
        newOrder = sortBrand === "descending" ? "ascending" : "descending";
        setSortBrand(newOrder);
        setSortCountInStock("");
        setSortSkuTrep("");
        setSortName("");
        break;
      case "disponibilidad":
        newSort = field;
        newOrder =
          sortCountInStock === "descending" ? "ascending" : "descending";
        setSortBrand("");
        setSortCountInStock(newOrder);
        setSortSkuTrep("");
        setSortName("");
        break;
    }
    if (keyword) {
      navigate(
        `/admin/desarrollos/search/${keyword}/sort/${newSort}/order/${newOrder}`
      );
    } else {
      navigate(`/admin/desarrollos/sort/${newSort}/order/${newOrder}`);
    }
  };
  const newSize = (size) => {
    setPageSize(size);
    dispatch({ type: DEVELOPMENT_ADMIN_LIST_RESET });
    navigate("/admin/desarrollos");
  };

  const redirect = "/login";
  useEffect(() => {
    let newArray = developments;
    if (search.length > 0) {
      //funcion de busqueda
      newArray = developments.filter((element) =>
        element.name.toLowerCase().includes(search)
      );
    }
    if (!success && !errorDevelopments) {
      dispatch(
        adminListDevelopments(keyword, pageNumber, pageSize, sort, order)
      );
    }
    if (id) {
      var link = document.location.href.split("/");
      if (link[link.length - 1] === "eliminar") {
        actionOpenDeleteModal();
      }
    } else {
      setViewModal(false);
      dispatch({
        type: DEVELOPMENT_ADMIN_DELETE_RESET,
      });
    }

    setListArticle(newArray);
  }, [countView, search, developments, id]);

  const actionOpenDeleteModal = () => {
    setViewModal("delete");
  };
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {viewModal !== false && viewModal === "delete" && (
        <Delete closeAction={() => setViewModal(false)} id={id} />
      )}
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <div className="flex items-center">
            <Typography variant="h6" color="white">
              Desarrollos
            </Typography>

            <div className="flex w-full flex-wrap items-center justify-end  gap-3">
              <Link to="/admin/desarrollos/crear" className="justify-end">
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
          {loadindDevelopments ? (
            <div className="flex w-full justify-center">
              <Loader />
            </div>
          ) : (
            <>
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {[
                      "Nombre",
                      "Dirección",
                      "Niveles",
                      "Disponibilidad",
                      "Status",
                      "Acciones",
                    ].map((el) => (
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
                  {listArticle?.map(
                    (
                      {
                        _id,
                        images,
                        nombre,
                        fiscalAddress,
                        levels,
                        onSale,
                        status,
                      },
                      key
                    ) => {
                      const className = `py-3 px-5 ${
                        key === listArticle.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                      }`;
                      return (
                        <tr key={nombre}>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <Avatar
                                src={images[0]?.url}
                                alt={nombre}
                                size="s
                                m"
                              />
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {nombre}
                              </Typography>
                            </div>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {fiscalAddress.address}
                            </Typography>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {fiscalAddress.district}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {levels}
                            </Typography>
                          </td>

                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {onSale ? "En venta" : "No disponible"}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {status}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Link to={`/admin/desarrollos/${_id}/editar`}>
                              <Typography
                                as="a"
                                href="#"
                                className="text-xs font-semibold text-blue-gray-600 hover:text-blue-500"
                              >
                                Editar
                              </Typography>
                            </Link>
                            <Link to={`/admin/desarrollos/${_id}/eliminar`}>
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

export default DesarrollosList;
