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
} from "@material-tailwind/react";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import Loader from "../../../../components/Loader";
import Paginate from "../../../../components/Paginate";
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
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState(sort || "name");
  const [sortOrder, setSortOrder] = useState(order || "ascending");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const adminProductsList = useSelector((state) => state.adminProductsList);
  const { loading, error, products, page, pages, success } = adminProductsList;

  useEffect(() => {
    dispatch({ type: PRODUCT_ADMIN_DELETE_RESET });
    dispatch(
      adminListProducts(
        keywordSearch,
        pageNumber,
        pageSize,
        sortField,
        sortOrder
      )
    );
  }, [dispatch, keywordSearch, pageNumber, pageSize, sortField, sortOrder]);

  useEffect(() => {
    if (!loading && !error && !success) {
      dispatch(
        adminListProducts(keyword, pageNumber, pageSize, sortField, sortOrder)
      );
    }
  }, [dispatch, loading, error, success]);

  const submitSort = (field) => {
    const newOrder =
      field === sortField
        ? sortOrder === "descending"
          ? "ascending"
          : "descending"
        : "ascending";
    setSortField(field);
    setSortOrder(newOrder);
    navigate(`/admin/productos/sort/${field}/order/${newOrder}`);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/admin/productos/search/${keywordSearch}`);
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {location.pathname.includes("eliminar") && <Delete />}
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <div className="flex items-center justify-between">
            <Typography variant="h6" color="white">
              Productos
            </Typography>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="rounded-md p-2 text-sm"
                value={keywordSearch}
                onChange={(e) => setKeywordSearch(e.target.value)}
                onKeyDown={handleSearch}
              />
              <Link to="/admin/productos/crear">
                <Button variant="gradient" color="white">
                  Crear Producto
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
                    { field: "image", text: "Imagen" },
                    { field: "name", text: "Nombre" },
                    { field: "type", text: "Tipo" },
                    { field: "appearance", text: "Apariencia" },
                    { field: "category", text: "Categoría" },
                    { field: "code", text: "Código" },
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
                {products?.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b border-blue-gray-50"
                  >
                    {/* Product Image */}
                    <td className="py-3 px-5">
                      <img
                        src={product.image?.url || "/placeholder.png"} // Fallback image if URL is missing
                        alt={product.name}
                        className="h-12 w-12 rounded object-cover shadow-md"
                      />
                    </td>

                    {/* Product Name */}
                    <td className="py-3 px-5">{product.name}</td>

                    {/* Product Type */}
                    <td className="py-3 px-5">{product.type}</td>

                    {/* Product Appearance */}
                    <td className="py-3 px-5">{product.appearance}</td>

                    {/* Product Category */}
                    <td className="py-3 px-5">{product.category}</td>

                    {/* Product Code */}
                    <td className="py-3 px-5">{product.code}</td>

                    {/* Actions */}
                    <td className="flex flex-col py-3 px-5">
                      <Link to={`/admin/productos/${product._id}/editar`}>
                        <Typography
                          as="a"
                          className="text-blue-500 hover:underline"
                        >
                          Editar
                        </Typography>
                      </Link>
                      <Link to={`/admin/productos/${product._id}/eliminar`}>
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
            baseRoute="/admin/productos"
            keyword={keywordSearch}
            sort={sortField}
            order={sortOrder}
          />
        </div>
      )}
    </div>
  );
}

export default ProductList;
