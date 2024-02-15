import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  adminDetailsMarketplace,
  adminUpdateMarketplace,
} from "../../../../actions/marketplaceActions";
import { getLoginData } from "../../../../actions/userActions";
import { adminListDevelopments } from "../../../../actions/developmentActions";
import { XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  InputFile,
  Input,
  CheckBox,
  InputSelect,
  Textarea,
  ComboBox,
} from "../../../../components/elements/Inputs";
import SuccessAlert from "../../../../components/alerts/SuccessAlert";
import Alert from "../../../../components/alerts/Alert";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Switch,
} from "@material-tailwind/react";
import { useMaterialTailwindController } from "../../../../context";
import Loader from "../../../../components/Loader";

export function MarketplaceEdit() {
  const [marketplace, setMarketplace] = useState({
    name: "",
    desarrollo: "",
    para: "",
    apartado: {
      porcentaje: 0.1,
      tiempoSiguiente: 1,
    },
    enganche: {
      porcentaje: 0.19,
      tiempoSiguiente: 1,
    },
    mensualidades: {
      porcentaje: 0.6,
      cantidadMeses: 12,
      tiempoSiguiente: 1,
    },
    liquidacion: {
      porcentaje: 0.2,
    },
    descuento: 0,
  });
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [controller, setController] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const adminMarketplaceDetails = useSelector(
    (state) => state.adminMarketplaceDetails
  );
  const {
    loading: loadingDetails,
    error: errorDetails,
    marketplaceDetails,
  } = adminMarketplaceDetails;
  const adminMarketplaceUpdate = useSelector(
    (state) => state.adminMarketplaceUpdate
  );
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    messageUpdate,
  } = adminMarketplaceUpdate;
  const adminDevelopmentsList = useSelector(
    (state) => state.adminDevelopmentsList
  );
  const {
    loading: loadindDevelopments,
    error: errorDevelopments,
    success,
    developments,
    page,
    pages,
  } = adminDevelopmentsList;

  const handleChange = (e) =>
    setMarketplace((prevState) => ({
      ...prevState,
      [e.target.name.split(".")[0]]:
        e.target.name.split(".").length === 2
          ? {
              ...prevState[e.target.name.split(".")[0]],
              [e.target.name.split(".")[1]]: e.target.value,
            }
          : e.target.value,
    }));
  const handleChangeCheckbox = (e) =>
    setMarketplace((prevState) => ({
      ...prevState,
      [e.target.name.split(".")[0]]:
        e.target.name.split(".").length === 2
          ? {
              ...prevState[e.target.name.split(".")[0]],
              [e.target.name.split(".")[1]]: e.target.checked,
            }
          : e.target.checked,
    }));

  const submitHandler = () => {
    dispatch(adminUpdateMarketplace(id, marketplace));
  };
  const redirect = "/login";
  useEffect(() => {
    if (messageUpdate) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
    if (!userInfo) {
      dispatch(getLoginData());
    } else if (userInfo.userType !== "Admin") {
      navigate(redirect);
    } else if (id && (!marketplaceDetails || marketplaceDetails._id !== id)) {
      dispatch(adminListDevelopments());
      dispatch(adminDetailsMarketplace(id));
    }
    if (marketplaceDetails) {
      setMarketplace(marketplaceDetails);
    }
  }, [userInfo, messageUpdate, marketplaceDetails]);
  return (
    <div className="bg-slate-50 p-4">
      <h2 className="text-palette-primary text-xl font-bold">
        Editar Plan de pago
      </h2>
      {loadingDetails || loadingUpdate ? (
        <div className="flex h-[80vh] w-full items-center justify-center">
          <Loader />
        </div>
      ) : (
        <form
          className="mt-3 grid gap-6 md:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            submitHandler();
          }}
        >
          <div className="flex flex-col gap-3">
            <Typography className="text-lg font-semibold  hover:text-gray-800">
              Dato general
            </Typography>
            <Input
              title="Nombre"
              name="name"
              type="text"
              required={true}
              value={marketplace.name}
              setValue={handleChange}
            />
            <InputSelect
              title="Desarrollo"
              name="desarrollo"
              value={marketplace.desarrollo}
              setValue={handleChange}
            >
              <option disabled value="">
                {" "}
                -- Seleccione una opcion --{" "}
              </option>
              {developments?.map((development) => (
                <option value={development._id} key={development._id}>
                  {development.nombre}
                </option>
              ))}
            </InputSelect>
            <InputSelect
              title="Para"
              name="para"
              value={marketplace.para}
              setValue={handleChange}
            >
              <option disabled value="">
                {" "}
                -- Seleccione una opcion --{" "}
              </option>
              <option value="departamento">Departamento</option>
              <option value="oficina">Oficina</option>
            </InputSelect>
            <Typography className="text-lg font-semibold  hover:text-gray-800">
              Apartado
            </Typography>
            <Input
              title="Porcentaje"
              name="apartado.porcentaje"
              type="number"
              required={true}
              value={marketplace.apartado?.porcentaje}
              setValue={handleChange}
            />

            <Input
              title="Meses a empezar a pagar siguiente apartado"
              name="apartado.tiempoSiguiente"
              type="number"
              required={true}
              value={marketplace.apartado?.tiempoSiguiente}
              setValue={handleChange}
            />
            <Typography className="text-lg font-semibold  hover:text-gray-800">
              Enganche
            </Typography>
            <Input
              title="Porcentaje"
              name="enganche.porcentaje"
              type="number"
              required={true}
              value={marketplace.enganche?.porcentaje}
              setValue={handleChange}
            />

            <Input
              title="Meses a empezar a pagar siguiente apartado"
              name="enganche.tiempoSiguiente"
              type="number"
              required={true}
              value={marketplace.enganche?.tiempoSiguiente}
              setValue={handleChange}
            />
            <Typography className="text-lg font-semibold  hover:text-gray-800">
              Mensualidades
            </Typography>
            <Input
              title="Porcentaje"
              name="mensualidades.porcentaje"
              type="number"
              required={true}
              value={marketplace.mensualidades?.porcentaje}
              setValue={handleChange}
            />
            <Input
              title="Cantidad de meses"
              name="mensualidades.cantidadMeses"
              type="number"
              required={true}
              value={marketplace.mensualidades?.cantidadMeses}
              setValue={handleChange}
            />

            <Input
              title="Meses a empezar a pagar siguiente apartado"
              name="mensualidades.tiempoSiguiente"
              type="number"
              required={true}
              value={marketplace.mensualidades?.tiempoSiguiente}
              setValue={handleChange}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Typography className="text-lg font-semibold  hover:text-gray-800">
              Liquidacion
            </Typography>
            <Input
              title="Porcentaje"
              name="liquidacion.porcentaje"
              type="number"
              required={true}
              value={marketplace.liquidacion?.porcentaje}
              setValue={handleChange}
            />
            <Typography className="text-lg font-semibold  hover:text-gray-800">
              Descuento
            </Typography>
            <Input
              title="Descuento"
              name="descuento"
              type="number"
              required={true}
              value={marketplace.descuento}
              setValue={handleChange}
            />
          </div>

          <div className="col-span-full">
            <div className="col-span-full mt-3 flex justify-center text-center">
              {errorUpdate && (
                <Alert title="Informacion incompleta" text={errorUpdate} />
              )}
            </div>
            <div className="col-span-full flex justify-center text-center">
              <Button
                type="onSubmit"
                color={sidenavColor}
                className="mt-6 flex justify-center rounded-md p-2 px-4 text-center text-lg font-normal text-white hover:bg-opacity-90"
                fullWidth
              >
                {loadingUpdate && (
                  <img
                    src="/assets/loader.svg"
                    className="my-auto mr-3 h-6 w-6"
                  />
                )}
                {loadingUpdate ? "Modificando..." : "Modificar"}
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default MarketplaceEdit;
