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
  PARCEL_ADMIN_LIST_RESET,
  PARCEL_ADMIN_DELETE_RESET,
} from "../../../../constants/parcelConstants";
import { adminListParcels } from "../../../../actions/parcelActions";
import Delete from "./Delete";
import Edit from "./Edit";
import Create from "./Create";

export function ParcelList() {
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
  const adminParcelList = useSelector((state) => state.adminParcelList);
  const {
    loading: loadingParcels,
    error: errorParcels,
    success,
    parcels,
    page,
    pages,
  } = adminParcelList;
  const [listArticle, setListArticle] = useState(parcels ? parcels : []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const submitSearch = () => {
    dispatch({ type: PARCEL_ADMIN_LIST_RESET });
    setPrevSearch(true);
    if (keywordSearch.trim()) {
      navigate(`/admin/paqueterias/search/${keywordSearch}`);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      submitSearch();
    }
  };
  const submitSort = (field) => {
    dispatch({ type: PARCEL_ADMIN_LIST_RESET });
    var newSort = "";
    var newOrder = "";
    switch (field) {
      case "name":
        newSort = field;
        newOrder = sortName === "descending" ? "ascending" : "descending";
        setSortBrand("");
        setSortCountInStock("");
        setSortSkuTrep("");
        setSortName(newOrder);
        break;
      case "skuTrep":
        newSort = field;
        newOrder = sortSkuTrep === "descending" ? "ascending" : "descending";
        setSortBrand("");
        setSortCountInStock("");
        setSortSkuTrep(newOrder);
        setSortName("");
        break;
      case "brand":
        newSort = field;
        newOrder = sortBrand === "descending" ? "ascending" : "descending";
        setSortBrand(newOrder);
        setSortCountInStock("");
        setSortSkuTrep("");
        setSortName("");
        break;
      case "countInStock":
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
        `/admin/paqueterias/search/${keyword}/sort/${newSort}/order/${newOrder}`
      );
    } else {
      navigate(`/admin/paqueterias/sort/${newSort}/order/${newOrder}`);
    }
  };
  const newSize = (size) => {
    setPageSize(size);
    dispatch({ type: PARCEL_ADMIN_LIST_RESET });
    navigate("/admin/paqueterias");
  };

  const redirect = "/login";
  useEffect(() => {
    let newArray = parcels;
    if (search.length > 0) {
      //funcion de busqueda
      newArray = parcels.filter((element) =>
        element.name.toLowerCase().includes(search)
      );
    }
    if (!success && !errorParcels) {
      dispatch(adminListParcels(keyword, pageNumber, pageSize, sort, order));
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
        type: PARCEL_ADMIN_DELETE_RESET,
      });
    }
    setListArticle(newArray ? newArray : []);
  }, [countView, search, parcels, id, location, errorParcels]);

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
            navigate("/admin/paqueterias");
          }}
          id={id}
        />
      )}
      {viewModal !== false && viewModal === "edit" && (
        <Edit
          closeAction={() => {
            setViewModal(false);
            navigate("/admin/paqueterias");
          }}
          id={id}
        />
      )}
      {viewModal !== false && viewModal === "create" && (
        <Create
          closeAction={() => {
            setViewModal(false);
            navigate("/admin/paqueterias");
          }}
        />
      )}
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <div className="flex items-center">
            <Typography variant="h6" color="white">
              Paqueterias
            </Typography>

            <div className="flex w-full flex-wrap items-center justify-end  gap-3">
              <Link to="/admin/paqueterias/crear" className="justify-end">
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
          {loadingParcels ? (
            <div className="flex w-full justify-center">
              <Loader />
            </div>
          ) : (
            <>
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["#", "Nombre", ""]?.map((el) => (
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
                  {listArticle?.map(({ _id, name }, key) => {
                    const className = `py-3 px-5 ${
                      key === listArticle.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;
                    return (
                      <tr key={name}>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {key + 1}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {name}
                              </Typography>
                            </div>
                          </div>
                        </td>

                        <td className={className}>
                          <Link to={`/admin/paqueterias/${_id}/editar`}>
                            <Typography
                              as="a"
                              href="#"
                              className="text-xs font-semibold text-blue-gray-600 hover:text-blue-500"
                            >
                              Editar
                            </Typography>
                          </Link>
                          <Link to={`/admin/paqueterias/${_id}/eliminar`}>
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
                  })}
                </tbody>
              </table>
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default ParcelList;
