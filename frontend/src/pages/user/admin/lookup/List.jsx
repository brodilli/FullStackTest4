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
import {
  EllipsisVerticalIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
//import Empty from "../../../components/Admin/Empty";
//import SearchBox from "../../../components/SearchBox";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import Loader from "../../../../components/Loader";
import Paginate from "../../../../components/Paginate";
import {
  LOOKUP_ADMIN_LIST_RESET,
  LOOKUP_ADMIN_DELETE_RESET,
} from "../../../../constants/lookupConstants";
import { adminListLookups } from "../../../../actions/lookupActions";
import Delete from "./Delete";
import Edit from "./Edit";
import Create from "./Create";

export function LookupList() {
  const keyword = useParams().keyword;
  const pageNumber = useParams().pageNumber || 1;
  const sort = useParams().sort;
  const order = useParams().order;
  const [keywordSearch, setKeywordSearch] = useState("");
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
  const adminLookupList = useSelector((state) => state.adminLookupList);
  const {
    loading: loadingLookups,
    error: errorLookups,
    success,
    lookups,
    page,
    pages,
  } = adminLookupList;
  const [listArticle, setListArticle] = useState(lookups ? lookups : []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const submitSearch = () => {
    dispatch({ type: LOOKUP_ADMIN_LIST_RESET });
    setPrevSearch(true);
    if (keywordSearch.trim()) {
      navigate(`/admin/lookups/search/${keywordSearch}`);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      submitSearch();
    }
  };
  const submitSort = (field) => {
    dispatch({ type: LOOKUP_ADMIN_LIST_RESET });
    const newSort = field;
    const newOrder =
      field === sortField
        ? sortOrder === "descending"
          ? "ascending"
          : "descending"
        : "ascending";
    setSortField(newSort);
    setSortOrder(newOrder);
    if (keyword) {
      navigate(
        `/admin/lookups/search/${keyword}/sort/${newSort}/order/${newOrder}`
      );
    } else {
      navigate(`/admin/lookups/sort/${newSort}/order/${newOrder}`);
    }
  };
  const newSize = (size) => {
    setPageSize(size);
    dispatch({ type: LOOKUP_ADMIN_LIST_RESET });
    navigate("/admin/lookups");
  };

  const redirect = "/login";
  useEffect(() => {
    let newArray = lookups;
    if (search.length > 0) {
      //funcion de busqueda
      newArray = lookups.filter((element) =>
        element.name.toLowerCase().includes(search)
      );
    }
    if (!success && !errorLookups) {
      dispatch(adminListLookups(keyword, pageNumber, pageSize, sort, order));
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
        type: LOOKUP_ADMIN_DELETE_RESET,
      });
    }
    setListArticle(newArray ? newArray : []);
  }, [countView, search, lookups, id, location]);

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
            navigate("/admin/lookups");
          }}
          id={id}
        />
      )}
      {viewModal !== false && viewModal === "edit" && (
        <Edit
          closeAction={() => {
            setViewModal(false);
            navigate("/admin/lookups");
          }}
          id={id}
        />
      )}
      {viewModal !== false && viewModal === "create" && (
        <Create
          closeAction={() => {
            setViewModal(false);
            navigate("/admin/lookups");
          }}
        />
      )}
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <div className="flex items-center">
            <Typography variant="h6" color="white">
              Lookups
            </Typography>

            <div className="flex w-full flex-wrap items-center justify-end  gap-3">
              <Link to="/admin/lookups/crear" className="justify-end">
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
          {loadingLookups ? (
            <div className="flex w-full justify-center">
              <Loader />
            </div>
          ) : (
            <>
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {[
                      { field: "number", text: "#" },
                      { field: "code", text: "Codigo" },
                      { field: "meaning", text: "Significado" },
                      { field: "description", text: "Description" },
                      { field: "isAttributeGroup", text: "Grupo" },
                      { field: null, text: "Acciones" },
                    ]?.map((el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-5 text-left"
                        onClick={() => submitSort(el.field)}
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
                  {" "}
                  {listArticle?.map(
                    (
                      { _id, code, meaning, description, isAttributeGroup },
                      key
                    ) => {
                      const className = `py-3 px-5 ${
                        key === listArticle.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                      }`;
                      return (
                        <tr key={code}>
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
                                  {code}
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
                                  {meaning}
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
                                  {description}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <div>
                                {isAttributeGroup ? (
                                  <CheckBadgeIcon
                                    className="ml-2 h-5 w-5 text-green-500"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          </td>

                          <td className={className}>
                            <Link to={`/admin/lookups/${_id}/editar`}>
                              <Typography
                                as="a"
                                href="#"
                                className="text-xs font-semibold text-blue-gray-600 hover:text-blue-500"
                              >
                                Editar
                              </Typography>
                            </Link>
                            <Link to={`/admin/lookups/${_id}/eliminar`}>
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
      <div className="flex w-full justify-center">
        {pages > 1 && (
          <Paginate
            page={page}
            pages={pages}
            baseRoute="/admin/lookups"
            keyword={keywordSearch}
            sort={sort}
            order={order}
            constant={LOOKUP_ADMIN_LIST_RESET}
          />
        )}
      </div>
    </div>
  );
}

export default LookupList;
