import {
  BanknotesIcon,
  UserPlusIcon,
  UserIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "blue",
    icon: BanknotesIcon,
    title: "Ventas de hoy",
    value: "$53k",
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "al dia anterior",
    },
  },
  {
    color: "pink",
    icon: UserIcon,
    title: "Usuarios",
    value: "2,300",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "a mes anterior",
    },
  },
  {
    color: "green",
    icon: UserPlusIcon,
    title: "Ordenes",
    value: "3,462",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "a dia anterior",
    },
  },
  {
    color: "orange",
    icon: ChartBarIcon,
    title: "Ventas",
    value: "$10,430",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "al dia anterior ",
    },
  },
];

export default statisticsCardsData;
