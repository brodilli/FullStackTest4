import {
  UserGroupIcon,
  ClipboardDocumentListIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { AdviserList, AdviserCreate, AdviserEdit } from "./pages/user/admin";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    userType: "Adviser",
    layout: "adviser",
    pages: [],
  },

  {
    title: "CRUD",
    userType: "Admin",
    layout: "admin",
    pages: [
      {
        icon: <UserGroupIcon {...icon} />,
        name: "Proveedores",
        path: "/Proveedores",
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
    ],
  },
];

export default routes;
