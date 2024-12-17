import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { AiOutlineWarning } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLoginData } from "../../../../actions/userActions";
import {
  adminCreateLookup,
  adminListGroupsLookups,
} from "../../../../actions/lookupActions";
import SuccessAlert from "../../../../components/alerts/SuccessAlert";
import {
  Input,
  Textarea,
  InputSelect,
} from "../../../../components/elements/Inputs";
import { useMaterialTailwindController } from "../../../../context";
import { LOOKUP_ADMIN_CREATE_RESET } from "../../../../constants/lookupConstants";
import { Switch } from "@material-tailwind/react";

export function LookupCreate({ closeAction }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const adminLookupCreate = useSelector((state) => state.adminLookupCreate);
  const {
    loading: loadingCreateLookup,
    error: errorCreateLookup,
    message: messageLookup,
  } = adminLookupCreate;
  const adminLookupGroupList = useSelector(
    (state) => state.adminLookupGroupList
  );
  const {
    loading: loadingGroupList,
    error: errorGroupList,
    groups,
    success: successGroupList,
  } = adminLookupGroupList;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [controller, setController] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;

  const [newLookup, setNewLookup] = useState({
    code: "",
    meaning: "",
    description: "",
    isAttributeGroup: false,
    attributeGroup: "",
    active: true,
  });
  const [showSuccessLookup, setShowSuccessLookup] = useState(false);
  const [keepCreating, setKeepCreating] = useState(false);

  const submitLookupHandler = () => {
    dispatch(adminCreateLookup(newLookup));
  };
  const handleCheckboxChange = (e) => {
    setNewLookup((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.checked,
    }));
  };
  const handleLookupChange = (e) => {
    setNewLookup(e.target.value);
  };
  const handleChange = (e) =>
    setNewLookup((prevState) => ({
      ...prevState,
      [e.target.name.split(".")[0]]:
        e.target.name.split(".").length === 2
          ? {
              ...prevState[e.target.name.split(".")[0]],
              [e.target.name.split(".")[1]]: e.target.value,
            }
          : e.target.value,
    }));
  useEffect(() => {
    if (messageLookup) {
      setShowSuccessLookup(true);
      setTimeout(() => {
        dispatch({ type: LOOKUP_ADMIN_CREATE_RESET });
        if (!keepCreating) {
          navigate("/admin/lookups");
        }
        setNewLookup("");
        setShowSuccessLookup(false);
      }, 1000);
    }
    if (!successGroupList && !errorGroupList && !loadingGroupList) {
      dispatch(adminListGroupsLookups());
    }
    if (!userInfo) {
      dispatch(getLoginData());
    } else if (userInfo.userType !== "Admin") {
      navigate("/login");
    }
  }, [userInfo, messageLookup, successGroupList]);
  return (
    <>
      <div className="fixed top-0 left-0 z-50 flex min-h-screen w-full items-center justify-center bg-black/30">
        <div className="relative max-h-[90%]  w-11/12 overflow-hidden rounded-md bg-white shadow lg:w-1/2 2xl:w-2/6">
          <div className="flex w-full items-center justify-between rounded-t-md bg-blue-gray-800 p-2 px-4 text-white">
            <h2 className="text-2xl  text-white">Crear Lookup</h2>
            <button
              type="button"
              onClick={closeAction}
              className="text-2xl font-bold hover:text-red-600"
            >
              <MdClose />
            </button>
          </div>
          <form
            className="flex flex-col gap-3 bg-white p-4"
            onSubmit={(e) => {
              e.preventDefault();
              submitLookupHandler();
            }}
          >
            {showSuccessLookup && <SuccessAlert title="Categoria creada" />}
            <div className="justify-stat flex">
              <Switch
                key={"isAttributeGroup"}
                id={"isAttributeGroup"}
                name={"isAttributeGroup"}
                label="Es grupo de attributos"
                value={newLookup.isAttributeGroup}
                labelProps={{
                  className: "text-sm font-medium text-black",
                }}
                onChange={handleCheckboxChange}
              />
            </div>
            <Input
              title="Codigo"
              name="code"
              type="text"
              required={true}
              value={newLookup.code}
              setValue={handleChange}
            />
            <Input
              title="Significado"
              name="meaning"
              type="text"
              required={true}
              value={newLookup.meaning}
              setValue={handleChange}
            />
            <Textarea
              title="Descripcion"
              name="description"
              type="text"
              required={true}
              value={newLookup.description}
              setValue={handleChange}
            />
            {
              /* Only render when isAttributeGroup === false */
              !newLookup.isAttributeGroup && (
                <InputSelect
                  title="Grupo de atributos"
                  name="attributeGroup"
                  value={newLookup.attributeGroup}
                  setValue={handleChange}
                >
                  {groups && groups.length > 0 ? (
                    groups.map((group) => (
                      <option key={group._id} value={group._id}>
                        {group.code} - {group.meaning}
                      </option>
                    ))
                  ) : (
                    <option value="">No hay grupos de atributos</option>
                  )}
                </InputSelect>
              )
            }
            <div className="flex justify-center">
              <Switch
                key={"keepCreating"}
                id={"keepCreating"}
                label="Seguir creando"
                defaultChecked={false}
                labelProps={{
                  className: "text-sm font-medium text-black",
                }}
                onChange={(e) => setKeepCreating(e.target.checked)}
              />
            </div>
            <div className="col-span-full text-center">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  submitLookupHandler();
                }}
                className={
                  "bg-" +
                  (sidenavColor ? sidenavColor : "black") +
                  "-500 flex w-full justify-center rounded-md p-2 px-4 text-center text-lg  text-white hover:bg-opacity-90"
                }
              >
                {loadingCreateLookup && (
                  <img
                    src="/assets/loader.svg"
                    className="my-auto mr-3 h-6 w-6"
                  />
                )}
                {loadingCreateLookup ? "Creando..." : "Crear"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LookupCreate;
