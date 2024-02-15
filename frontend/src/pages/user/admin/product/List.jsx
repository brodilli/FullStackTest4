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
  PRODUCT_ADMIN_DELETE_RESET,
  PRODUCT_ADMIN_LIST_RESET,
} from "../../../../constants/productConstants";
import { adminListProducts } from "../../../../actions/productActions";
import Delete from "./Delete";

export function ProductList() {
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
  const adminProductList = useSelector((state) => state.adminProductList);
  const {
    loading: loadingProducts,
    error: errorProducts,
    success,
    products,
    page,
    pages,
  } = adminProductList;
  const [listArticle, setListArticle] = useState(products ? products : []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const submitSearch = () => {
    dispatch({ type: PRODUCT_ADMIN_LIST_RESET });
    setPrevSearch(true);
    if (keywordSearch.trim()) {
      navigate(`/admin/productos/search/${keywordSearch}`);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      submitSearch();
    }
  };
  const submitSort = (field) => {
    dispatch({ type: PRODUCT_ADMIN_LIST_RESET });
    var newSort = "";
    var newOrder = "";
    switch (field) {
      case "numero":
        newSort = field;
        newOrder = sortName === "descending" ? "ascending" : "descending";
        setSortBrand("");
        setSortCountInStock("");
        setSortSkuTrep("");
        setSortName(newOrder);
        break;
      case "recamaras":
        newSort = field;
        newOrder = sortSkuTrep === "descending" ? "ascending" : "descending";
        setSortBrand("");
        setSortCountInStock("");
        setSortSkuTrep(newOrder);
        setSortName("");
        break;
      case "mt2":
        newSort = field;
        newOrder = sortBrand === "descending" ? "ascending" : "descending";
        setSortBrand(newOrder);
        setSortCountInStock("");
        setSortSkuTrep("");
        setSortName("");
        break;
      case "precio+de+lista":
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
        `/admin/productos/search/${keyword}/sort/${newSort}/order/${newOrder}`
      );
    } else {
      navigate(`/admin/productos/sort/${newSort}/order/${newOrder}`);
    }
  };
  const newSize = (size) => {
    setPageSize(size);
    dispatch({ type: PRODUCT_ADMIN_LIST_RESET });
    navigate("/admin/productos");
  };

  const redirect = "/login";
  useEffect(() => {
    let newArray = products;
    if (search.length > 0) {
      //funcion de busqueda
      newArray = products.filter((element) =>
        element.name.toLowerCase().includes(search)
      );
    }
    if (!success && !errorProducts) {
      dispatch(adminListProducts(keyword, pageNumber, pageSize, sort, order));
    }
    if (id) {
      var link = document.location.href.split("/");
      if (link[link.length - 1] === "eliminar") {
        actionOpenDeleteModal();
      }
    } else {
      setViewModal(false);
      dispatch({
        type: PRODUCT_ADMIN_DELETE_RESET,
      });
    }

    setListArticle(newArray);
  }, [countView, search, products, id]);

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
              Productos
            </Typography>

            <div className="flex w-full flex-wrap items-center justify-end  gap-3">
              <Link to="/admin/productos/crear" className="justify-end">
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
          {loadingProducts ? (
            <div className="flex w-full justify-center">
              <Loader />
            </div>
          ) : (
            <>
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["Numero", "Rec/Baños", "MT2", "Precio", "Status", ""].map(
                      (el) => (
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
                      )
                    )}
                  </tr>
                </thead>

                <tbody>
                  {listArticle?.map(
                    (
                      {
                        _id,
                        imageProperty,
                        architecturalPlaque,
                        floorPlan,
                        number,
                        type,
                        bedrooms,
                        bathrooms,
                        mt2,
                        price,
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
                        <tr key={number}>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <div>
                                {floorPlan && floorPlan.url && (
                                  <Tooltip content={"Imagen del piso"}>
                                    <Avatar
                                      src={floorPlan.url}
                                      alt={"floorPlan"}
                                      size="lg"
                                      variant="circular"
                                      className={`cursor-pointer border-2 border-white ${
                                        key === 0 ? "" : "-ml-2.5"
                                      }`}
                                    />
                                  </Tooltip>
                                )}
                                {architecturalPlaque &&
                                  architecturalPlaque.url && (
                                    <Tooltip content={"Placa Arquitectónica"}>
                                      <Avatar
                                        src={architecturalPlaque.url}
                                        alt={"architecturalPlaque"}
                                        size="lg"
                                        variant="circular"
                                        className={`cursor-pointer border-2 border-white ${
                                          key === 0 ? "" : "-ml-2.5"
                                        }`}
                                      />
                                    </Tooltip>
                                  )}
                                {imageProperty && imageProperty.url && (
                                  <Tooltip content={"Imagen del inmueble"}>
                                    <Avatar
                                      src={imageProperty.url}
                                      alt={"imageProperty"}
                                      size="lg"
                                      variant="circular"
                                      className={`cursor-pointer border-2 border-white ${
                                        key === 0 ? "" : "-ml-2.5"
                                      }`}
                                    />
                                  </Tooltip>
                                )}
                              </div>
                              <div className="">
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                  {number}
                                </Typography>
                                <Typography className="text-xs text-blue-gray-600">
                                  {type}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {bedrooms}
                            </Typography>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {bathrooms}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {mt2}
                            </Typography>
                          </td>

                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {price}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {status}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Link to={`/admin/productos/${_id}/editar`}>
                              <Typography
                                as="a"
                                href="#"
                                className="text-xs font-semibold text-blue-gray-600 hover:text-blue-500"
                              >
                                Editar
                              </Typography>
                            </Link>
                            <Link to={`/admin/productos/${_id}/eliminar`}>
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

export default ProductList;
