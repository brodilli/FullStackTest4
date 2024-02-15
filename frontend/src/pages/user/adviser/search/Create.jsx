import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../../../../actions/productActions";
import { getLoginData } from "../../../../actions/userActions";
import MultiRangeSlider from "../../../../components/multiRangeSlider/MultiRangeSlider";
import { Input, InputSelect } from "../../../../components/elements/Inputs";
import SuccessAlert from "../../../../components/alerts/SuccessAlert";
import Alert from "../../../../components/alerts/Alert";
import { Typography, Switch } from "@material-tailwind/react";
import { useMaterialTailwindController } from "../../../../context";
import { listDevelopments } from "../../../../actions/developmentActions";
import Loader from "../../../../components/Loader";
import { set } from "mongoose";
import { CogIcon } from "@heroicons/react/24/solid";

export function SearchCreate() {
  const [advacedOptions, setAdvacedOptions] = useState({
    developer: "",
    mt2: { min: 50, max: 1500 },
    price: { min: 1000000, max: 60000000 },
    bedrooms: { min: 1, max: 600 },
    bathrooms: { min: 1, max: 10 },
  });
  const [searchSettings, setSearchSettings] = useState({
    number: "",
    development: "",
    type: "",
    onSale: true,
    mt2: { min: advacedOptions.mt2.min, max: advacedOptions.mt2.max },
    price: { min: advacedOptions.price.min, max: advacedOptions.price.max },
    bedrooms: {
      min: advacedOptions.bedrooms.min,
      max: advacedOptions.bedrooms.max,
    },
    bathrooms: {
      min: advacedOptions.bathrooms.min,
      max: advacedOptions.bathrooms.max,
    },
  });
  const [mouseHold, setMouseHold] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [controller, setController] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const adminMarketplaceCreate = useSelector(
    (state) => state.adminMarketplaceCreate
  );
  const {
    loading: loadingCreateMarketplace,
    error: errorCreateMarketplace,
    message: messageCreateMarketplace,
  } = adminMarketplaceCreate;
  const productSearch = useSelector((state) => state.productSearch);
  const {
    loading: loadindProducts,
    error: errorProducts,
    success,
    products,
    filterLimits,
  } = productSearch;
  const developmentsList = useSelector((state) => state.developmentsList);
  const {
    loading: loadindDevelopments,
    error: errorDevelopments,
    success: successDevelopments,
    developments,
    page,
    pages,
  } = developmentsList;

  const handleChange = (e) =>
    setSearchSettings((prevState) => ({
      ...prevState,
      mt2:
        e.target.name === "development"
          ? { min: advacedOptions.mt2.min, max: advacedOptions.mt2.max }
          : { min: prevState.mt2.min, max: prevState.mt2.max },
      price:
        e.target.name === "development"
          ? { min: advacedOptions.price.min, max: advacedOptions.price.max }
          : { min: prevState.price.min, max: prevState.price.max },
      bedrooms:
        e.target.name === "development"
          ? {
              min: advacedOptions.bedrooms.min,
              max: advacedOptions.bedrooms.max,
            }
          : { min: prevState.bedrooms.min, max: prevState.bedrooms.max },
      bathrooms:
        e.target.name === "development"
          ? {
              min: advacedOptions.bathrooms.min,
              max: advacedOptions.bathrooms.max,
            }
          : { min: prevState.bathrooms.min, max: prevState.bathrooms.max },
      [e.target.name.split(".")[0]]:
        e.target.name.split(".").length === 2
          ? {
              ...prevState[e.target.name.split(".")[0]],
              [e.target.name.split(".")[1]]: e.target.value,
            }
          : e.target.value,
    }));
  const handleChangeCheckbox = (e) =>
    setSearchSettings((prevState) => ({
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
    dispatch(searchProducts(searchSettings));
  };
  const resetValues = () => {
    setSearchSettings((prevState) => ({
      ...prevState,
      mt2: { min: filterLimits.minMt2, max: filterLimits.maxMt2 },
      price: { min: filterLimits.minPrice, max: filterLimits.maxPrice },
      bedrooms: {
        min: filterLimits.minBedrooms,
        max: filterLimits.maxBedrooms,
      },
      bathrooms: {
        min: filterLimits.minBathrooms,
        max: filterLimits.maxBathrooms,
      },
    }));
  };

  const redirect = "/login";
  useEffect(() => {
    if (searchSettings.development !== "" && !mouseHold) {
      submitHandler();
    }
    if (!(successDevelopments || errorDevelopments)) {
      dispatch(listDevelopments(true));
    }
  }, [searchSettings, mouseHold, successDevelopments, errorDevelopments]);
  return (
    <div className="bg-slate-50 p-4">
      <h2 className="text-palette-primary text-xl font-bold">
        Buscador de Departamentos y Oficinas.
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        El único campo obligatorio es el <strong>desarrollo</strong>, el resto
        son opcionales.
      </p>
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
          <InputSelect
            title="Desarrollo"
            name="development"
            value={searchSettings.development}
            setValue={handleChange}
          >
            <option disabled value="">
              {" "}
              Seleccione una opcion{" "}
            </option>
            {developments?.map((development) => (
              <option value={development._id} key={development._id}>
                {development.name}
              </option>
            ))}
          </InputSelect>
          <InputSelect
            title="Tipo"
            name="type"
            value={searchSettings.type}
            setValue={handleChange}
          >
            <option disabled value="">
              {" "}
              Seleccione una opcion{" "}
            </option>
            <option value="departamento">Departamento</option>
            <option value="oficina">Oficina</option>
          </InputSelect>
          <Input
            title="Numero de departamento"
            name="number"
            type="text"
            required={true}
            value={searchSettings.number}
            setValue={handleChange}
          />
          <button
            type="button"
            onClick={resetValues}
            className="mt-3 rounded border border-blue-500 bg-transparent py-2 px-4 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white"
          >
            Reiniciar valores
          </button>
        </div>
        {filterLimits ? (
          <div
            className="flex flex-col gap-3"
            onMouseDown={() => setMouseHold(true)}
            onMouseUp={() => setMouseHold(false)}
          >
            <Typography className="text-center text-lg  font-semibold hover:text-gray-800">
              Opciones Adicionales
            </Typography>
            <MultiRangeSlider
              minLimit={
                filterLimits?.minMt2
                  ? filterLimits.minMt2
                  : advacedOptions.mt2.min
              }
              maxLimit={
                filterLimits?.maxMt2
                  ? filterLimits.maxMt2
                  : advacedOptions.mt2.max
              }
              minVal={searchSettings.mt2.min}
              maxVal={searchSettings.mt2.max}
              name={"mt2"}
              label={"m²"}
              handleChange={handleChange}
            />
            <MultiRangeSlider
              minLimit={
                filterLimits?.minPrice
                  ? filterLimits.minPrice
                  : advacedOptions.price.min
              }
              maxLimit={
                filterLimits?.maxPrice
                  ? filterLimits.maxPrice
                  : advacedOptions.price.max
              }
              minVal={searchSettings.price.min}
              maxVal={searchSettings.price.max}
              name={"price"}
              label={"Precio"}
              handleChange={handleChange}
            />
            <MultiRangeSlider
              minLimit={
                filterLimits?.minBedrooms
                  ? filterLimits.minBedrooms
                  : advacedOptions.bedrooms.min
              }
              maxLimit={
                filterLimits?.maxBedrooms
                  ? filterLimits.maxBedrooms
                  : advacedOptions.bedrooms.max
              }
              minVal={searchSettings.bedrooms.min}
              maxVal={searchSettings.bedrooms.max}
              name={"bedrooms"}
              label={"Cuartos"}
              handleChange={handleChange}
            />
            <MultiRangeSlider
              minLimit={
                filterLimits?.minBathrooms
                  ? filterLimits.minBathrooms
                  : advacedOptions.bathrooms.min
              }
              maxLimit={
                filterLimits?.maxBathrooms
                  ? filterLimits.maxBathrooms
                  : advacedOptions.bathrooms.max
              }
              minVal={searchSettings.bathrooms.min}
              maxVal={searchSettings.bathrooms.max}
              name={"bathrooms"}
              label={"Baños"}
              handleChange={handleChange}
            />
            <div className="flex justify-center">
              <Switch
                key={"onSale"}
                id={"onSale"}
                name={"onSale"}
                label="En venta"
                defaultChecked={searchSettings.onSale}
                labelProps={{
                  className: "text-sm font-medium text-black",
                }}
                onChange={handleChangeCheckbox}
              />
            </div>
          </div>
        ) : (
          <>
            {searchSettings.development === "" ? (
              <div className="flex w-full items-center justify-center">
                <div className="w-40 text-gray-500">
                  <CogIcon className="animate-spin-slow" />
                </div>
              </div>
            ) : (
              <Loader />
            )}
          </>
        )}

        <div className="col-span-full">
          <div className="col-span-full mt-3 flex justify-center text-center">
            {errorCreateMarketplace && (
              <Alert
                title="Informacion incompleta"
                text={errorCreateMarketplace}
              />
            )}
          </div>
          {success && (
            <div className="relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-800"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="rounded-full bg-gray-800 py-1 px-3 text-white">
                  Resultados
                </span>
              </div>
            </div>
          )}
          {/*<div className="col-span-full flex justify-center text-center">
            <Button
              type="onSubmit"
              color={sidenavColor}
              className="mt-6 flex justify-center rounded-md p-2 px-4 text-center text-lg font-normal text-white hover:bg-opacity-90"
              fullWidth
            >
              {loadingCreateMarketplace && (
                <img
                  src="/assets/loader.svg"
                  className="my-auto mr-3 h-6 w-6"
                />
              )}
              {loadingCreateMarketplace ? "Buscando..." : "Buscar"}
            </Button>
              </div>*/}
        </div>
      </form>

      <div className="mt-6">
        {loadindProducts ? (
          <Loader />
        ) : errorProducts ? (
          <Alert title="Error" text={errorProducts} />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products?.map((product) => (
              <div
                key={product._id}
                className="overflow-hidden rounded-lg bg-white shadow"
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 rounded-md bg-gray-800 p-2">
                      <img
                        className="h-12 w-12 rounded-md"
                        src={product.imageProperty?.url}
                        alt=""
                      />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-sm font-medium text-gray-500">
                          {product.number}
                        </dt>
                        <dt className="truncate text-sm font-medium text-gray-500">
                          {product.type}
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">
                            {product.status}
                          </div>
                        </dd>
                      </dl>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <button
                        onClick={() => {
                          navigate(`/adviser/planes/${product._id}`);
                        }}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Ver
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchCreate;
