import {
  UserGroupIcon,
  PlusCircleIcon,
  BuildingStorefrontIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/solid";
import {
  UserEdit,
  LookupList,
  ProductCreate,
  ProductEdit,
  ProductList,
  UserCreate,
  UserList,
  PaymentMethodCreate,
  PaymentMethodList,
  PaymentMethodEdit,
} from "./pages/user/admin";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    userType: "User",
    layout: "user",
    pages: [],
  },

  {
    title: "Admin",
    userType: "Admin",
    layout: "admin",
    pages: [
      {
        icon: <UserGroupIcon {...icon} />,
        name: "Usuarios",
        path: "/usuarios",
        isList: true,
        element: <UserList />,
        subpages: [
          {
            icon: <PlusCircleIcon {...icon} />,
            name: "Crear",
            path: "/crear",
            element: <UserCreate />,
          },
          {
            icon: <UserGroupIcon {...icon} />,
            name: "Editar",
            path: "/:id/editar",
            element: <UserEdit />,
            hide: true,
          },
          {
            icon: <UserGroupIcon {...icon} />,
            name: "Eliminar",
            path: "/:id/eliminar",
            element: <UserList />,
            hide: true,
          },
        ],
      },
      {
        icon: <BuildingStorefrontIcon {...icon} />,
        name: "Metodos de Pago",
        path: "/metodosDePago",
        isList: true,
        element: <PaymentMethodList />,
        subpages: [
          {
            icon: <PlusCircleIcon {...icon} />,
            name: "Crear",
            path: "/crear",
            element: <PaymentMethodCreate />,
          },
          {
            icon: <BuildingStorefrontIcon {...icon} />,
            name: "Editar",
            path: "/:id/editar",
            element: <PaymentMethodEdit />,
            hide: true,
          },
          {
            icon: <BuildingStorefrontIcon {...icon} />,
            name: "Eliminar",
            path: "/:id/eliminar",
            element: <PaymentMethodList />,
            hide: true,
          },

        ],
      },
      {
        icon: <BuildingOfficeIcon {...icon} />,
        name: "Producto",
        path: "/productos",
        isList: true,
        element: <ProductList />,
        subpages: [
          {
            icon: <PlusCircleIcon {...icon} />,
            name: "Crear",
            path: "/crear",
            element: <ProductCreate />,
          },
          {
            icon: <BuildingStorefrontIcon {...icon} />,
            name: "Editar",
            path: "/:id/editar",
            element: <ProductEdit />,
            hide: true,
          },
          {
            icon: <BuildingStorefrontIcon {...icon} />,
            name: "Eliminar",
            path: "/:id/eliminar",
            element: <ProductList />,
            hide: true,
          },
        ],
      },
    ],
  },
  {
    title: "Utils",
    userType: "Admin",
    layout: "admin",
    pages: [
      /*{
        icon: <BuildingStorefrontIcon {...icon} />,
        name: "Lookups",
        path: "/lookups",
        element: <LookupList />,
        isList: true,
        hiddenSub: true,
        subpages: [
          {
            name: "Crear",
            path: "/crear",
            element: <LookupList />,
            hide: true,
          },
          {
            name: "Editar",
            path: "/:id/editar",
            element: <LookupList />,
            hide: true,
          },
          {
            name: "Eliminar",
            path: "/:id/eliminar",
            element: <LookupList />,
            hide: true,
          },
        ],
      },*/
    ],
  },
];

export default routes;
