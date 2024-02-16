import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  MagnifyingGlassIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  BuildingStorefrontIcon,
  BuildingOfficeIcon,
  ReceiptPercentIcon,
  TruckIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  RectangleStackIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  BookmarkIcon,
  PlusCircleIcon,
  CubeTransparentIcon,
  CalendarDaysIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/solid";
import {
  Home,
  Profile,
  Tables,
  Notifications,
  MarketplaceList,
  DesarrollosList,
  DesarrollosCreate,
  DesarrollosEdit,
  ProductList,
  ProductCreate,
  ProductEdit,
  OrderList,
  OrderCreate,
  OrderStatus,
  CategoryList,
  BrandList,
  ParcelList,
  DiscountList,
  MarketplaceCreate,
  MarketplaceEdit,
  AdviserList,
  AdviserCreate,
  AdviserEdit,
} from "./pages/user/admin";
import {
  Search,
  Planes,
  SearchCreate,
  OrderList as OrderListAdviser,
  OrderStatus as OrderStatusAdviser,
} from "./pages/user/adviser";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    userType: "Adviser",
    layout: "adviser",
    pages: [
      {
        icon: <MagnifyingGlassIcon {...icon} />,
        name: "Buscador",
        path: "/search",
        element: <SearchCreate />,
      },
      {
        icon: <PresentationChartLineIcon {...icon} />,
        name: "Planes",
        path: "/planes",
        element: <Planes />,
        hiddenSub: true,
        subpages: [
          {
            icon: <PresentationChartLineIcon {...icon} />,
            name: "Planes",
            path: "/:id",
            element: <Planes />,
            hide: true,
          },
        ],
      },
      {
        icon: <ClipboardDocumentListIcon {...icon} />,
        name: "Ordenes",
        path: "/ordenes",
        element: <OrderListAdviser />,
        hiddenSub: true,
        isList: true,
        subpages: [
          {
            icon: <ClipboardDocumentListIcon {...icon} />,
            name: "Exportar",
            path: "/exportar",
            hide: true,
            element: <OrderListAdviser />,
          },
          {
            icon: <ClipboardDocumentListIcon {...icon} />,
            name: "Editar",
            path: "/:id/status",
            element: <OrderStatusAdviser />,
            hide: true,
          },
        ],
      },
    ],
  },

  {
    title: "CRUD",
    userType: "Admin",
    layout: "admin",
    pages: [
      {
        icon: <BuildingOfficeIcon {...icon} />,
        name: "Desarrollo",
        path: "/desarrollos",
        isList: true,
        element: <DesarrollosList />,
        subpages: [
          {
            icon: <PlusCircleIcon {...icon} />,
            name: "Crear",
            path: "/crear",
            element: <DesarrollosCreate />,
          },
          {
            icon: <BuildingStorefrontIcon {...icon} />,
            name: "Editar",
            path: "/:id/editar",
            element: <DesarrollosEdit />,
            hide: true,
          },
          {
            icon: <BuildingStorefrontIcon {...icon} />,
            name: "Eliminar",
            path: "/:id/eliminar",
            element: <DesarrollosList />,
            hide: true,
          },
        ],
      },
      {
        icon: <CurrencyDollarIcon {...icon} />,
        name: "Plan de Pagos",
        path: "/planDePagos",
        isList: true,
        element: <MarketplaceList />,
        subpages: [
          {
            icon: <PlusCircleIcon {...icon} />,
            name: "Crear",
            path: "/crear",
            element: <MarketplaceCreate />,
          },
          {
            icon: <BuildingStorefrontIcon {...icon} />,
            name: "Editar",
            path: "/:id/editar",
            element: <MarketplaceEdit />,
            hide: true,
          },
          {
            icon: <BuildingStorefrontIcon {...icon} />,
            name: "Eliminar",
            path: "/:id/eliminar",
            element: <MarketplaceList />,
            hide: true,
          },
        ],
      },

      {
        icon: <UserGroupIcon {...icon} />,
        name: "Asesores",
        path: "/asesores",
        isList: true,
        element: <AdviserList />,
        subpages: [
          {
            icon: <PlusCircleIcon {...icon} />,
            name: "Crear",
            path: "/crear",
            element: <AdviserCreate />,
          },
          {
            icon: <UserGroupIcon {...icon} />,
            name: "Editar",
            path: "/:id/editar",
            element: <AdviserEdit />,
            hide: true,
          },
          {
            icon: <UserGroupIcon {...icon} />,
            name: "Eliminar",
            path: "/:id/eliminar",
            element: <AdviserList />,
            hide: true,
          },
        ],
      },
      {
        icon: <ReceiptPercentIcon {...icon} />,
        name: "Descuentos",
        path: "/descuentos",
        element: <DiscountList />,
        hiddenSub: true,
        subpages: [
          {
            name: "Crear",
            path: "/crear",
            element: <DiscountList />,
            hide: true,
          },
          {
            name: "Editar",
            path: "/:id/editar",
            element: <DiscountList />,
            hide: true,
          },
          {
            name: "Eliminar",
            path: "/:id/eliminar",
            element: <DiscountList />,
            hide: true,
          },
        ],
      },
      {
        icon: <ClipboardDocumentListIcon {...icon} />,
        name: "Ordenes",
        path: "/ordenes",
        isList: true,
        element: <OrderList />,
        subpages: [
          {
            icon: <ClipboardDocumentListIcon {...icon} />,
            name: "Exportar",
            path: "/exportar",
            hide: true,
            element: <OrderList />,
          },
          {
            icon: <ClipboardDocumentListIcon {...icon} />,
            name: "Crear",
            path: "/crear",
            element: <OrderCreate />,
          },
          {
            icon: <ClipboardDocumentListIcon {...icon} />,
            name: "Editar",
            path: "/:id/status",
            element: <OrderStatus />,
            hide: true,
          },
          {
            icon: <ClipboardDocumentListIcon {...icon} />,
            name: "Eliminar",
            path: "/:id/eliminar",
            element: <OrderList />,
            hide: true,
          },
        ],
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "Productos",
        path: "/productos",
        isList: true,
        element: <ProductList />,
        subpages: [
          {
            icon: <RectangleStackIcon {...icon} />,
            name: "Crear",
            path: "/crear",
            element: <ProductCreate />,
          },
          {
            icon: <RectangleStackIcon {...icon} />,
            name: "Editar",
            path: "/:id/editar",
            element: <ProductEdit />,
            hide: true,
          },
          {
            icon: <RectangleStackIcon {...icon} />,
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
    title: "Reportes y Analisis",
    userType: "Admin",
    layout: "admin",
    pages: [
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "Reportes",
        path: "/reportes",
      },
    ],
  },

  /*{
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },*/
];

export default routes;
