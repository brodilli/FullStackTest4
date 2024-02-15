export const platformSettingsData = [
  {
    title: "Email",
    options: [
      {
        checked: true,
        label: "Email cuando se haga una orden",
      },
      {
        checked: false,
        label: "Email cuando proveedor termine",
      },
      {
        checked: true,
        label: "Email con cancelacion de proveedor",
      },
    ],
  },
  {
    title: "Notficaciones",
    options: [
      {
        checked: false,
        label: "Actualizacion de Proveedor",
      },
      {
        checked: true,
        label: "Actualizacion de status Orden",
      },
      {
        checked: false,
        label: "Actualizacion Reportes",
      },
    ],
  },
];

export default platformSettingsData;
