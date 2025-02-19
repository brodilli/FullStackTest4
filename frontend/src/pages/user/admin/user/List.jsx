import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import Loader from "../../../../components/Loader";
import {
  USER_ADMIN_DELETE_RESET,
  USER_ADMIN_LIST_RESET,
} from "../../../../constants/userConstants";
import { adminListUsers } from "../../../../actions/userActions";
import Delete from "./Delete";

export function UserList() {
  const keyword = useParams().keyword;
  const pageNumber = useParams().pageNumber || 1;
  const sort = useParams().sort;
  const order = useParams().order;
  const [keywordSearch, setKeywordSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [viewModal, setViewModal] = useState(false);

  const adminUserList = useSelector((state) => state.adminUserList);
  const {
    loading: loadingUsers,
    error: errorUsers,
    users,
    page,
    pages,
  } = adminUserList;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const submitSearch = () => {
    dispatch({ type: USER_ADMIN_LIST_RESET });
    if (keywordSearch.trim()) {
      navigate(`/admin/users/search/${keywordSearch}`);
    } else {
      navigate(`/admin/users`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      submitSearch();
    }
  };

  const submitSort = (field) => {
    dispatch({ type: USER_ADMIN_LIST_RESET });
    const newOrder = order === "ascending" ? "descending" : "ascending";
    if (keyword) {
      navigate(`/admin/users/search/${keyword}/sort/${field}/order/${newOrder}`);
    } else {
      navigate(`/admin/users/sort/${field}/order/${newOrder}`);
    }
  };

  const newSize = (size) => {
    setPageSize(size);
    dispatch({ type: USER_ADMIN_LIST_RESET });
    navigate("/admin/users");
  };

  const actionOpenDeleteModal = () => {
    setViewModal("delete");
  };

  useEffect(() => {
    if (!errorUsers) {
      dispatch(adminListUsers(keyword, pageNumber, pageSize, sort, order));
    }
    if (id) {
      const link = document.location.href.split("/");
      if (link[link.length - 1] === "eliminar") {
        actionOpenDeleteModal();
      }
    } else {
      setViewModal(false);
      dispatch({ type: USER_ADMIN_DELETE_RESET });
    }
  }, [keyword, pageNumber, pageSize, sort, order, id]);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {viewModal && viewModal === "delete" && (
        <Delete closeAction={() => setViewModal(false)} id={id} />
      )}
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <div className="flex items-center">
            <Typography variant="h6" color="white">
              Usuarios
            </Typography>
            <div className="flex w-full flex-wrap items-center justify-end gap-3">
              <Link to="/admin/usuarios/crear" className="justify-end">
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
          {loadingUsers ? (
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
                      "Apellido",
                      "Correo Electrónico",
                      "Tipo de Usuario",
                      "Teléfono",
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
                  {users?.map(
                    ({ _id, name, lastName, email, phone, userType }, key) => {
                      const className = `py-3 px-5 ${
                        key === users.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                      }`;
                      return (
                        <tr key={_id}>
                          <td className={className}>
                            <Typography variant="small" className="font-semibold">
                              {name}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography variant="small" className="font-semibold">
                              {lastName}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography variant="small" className="font-semibold">
                              {email}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography variant="small" className="font-semibold">
                              {userType}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography variant="small" className="font-semibold">
                              {phone}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Link to={`/admin/usuarios/${_id}/editar`}>
                              <Typography className="text-blue-gray-600 hover:text-blue-500">
                                Editar
                              </Typography>
                            </Link>
                            <Link to={`/admin/usuarios/${_id}/eliminar`}>
                              <Typography className="text-red-500 hover:text-red-700">
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

export default UserList;
