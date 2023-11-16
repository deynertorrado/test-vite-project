// Importaciones de React
import { useEffect, useState } from "react";

// Librerías Externas y Locales
import {
  postProductionRequest,
  putProductionRequest,
  deleteProductionRequest,
  getCowsRequest,
} from "../../services/request";
import Swal from "sweetalert2";

// Importación de Componentes
import { ProdData } from "./ProdData";

// Componente Principal
export const ProdComponent = () => {
  // ------------- Proceso para tomar los datos -------------
  // Estado Inicial del "productionForm"
  const productionForm = {
    date: "",
    production: "",
  };

  // Definimos un state para almacenar el identificador de la vaca
  const [cowId, setCowId] = useState(null);

  // Manejo de estado del "productionForm"
  const [formState, setFormState] = useState(productionForm);

  // Obtenemos los valores de los atributos del "productionForm"
  const { date, production } = formState;

  // Función que nos permite setear los inputs del "productionForm"
  const resetFormState = () => {
    setFormState(productionForm);
    setText("");
  };

  // Obtenemos los valores de los inputs del "productionForm"
  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // -------------- Definimos los elementos para el Autocomplete --------------
  const [options, setOptions] = useState([]);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Definimos un useEffect para obtener los datos en primera instancia
  useEffect(() => {
    async function getData() {
      try {
        const res = await getCowsRequest(document.cookie.replace("token=", ""));
        setOptions(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  // Funcion que toma los valores de input y filtrar datos
  const onChangeHandler = (text) => {
    let matches = [];
    if (text.length > 0) {
      matches = options.filter((cow) => {
        const regex = new RegExp(`${text}`, "gi");
        return cow.cow_name.match(regex);
      });
    }
    console.log("matches", matches);
    setSuggestions(matches);
    setText(text);
  };

  // Función que permite dar sugerencias de búsqueda al consultar los datos
  const onSuggestHandler = (text, id) => {
    setCowId(id);
    setText(text);
    setSuggestions([]);
  };

  // Definimos un state para actualizar los datos de la tabla del componente hijo
  const [activateEffect, setActivateEffect] = useState(false);
  const resetActivateEffect = () => {
    setActivateEffect(false);
  };

  // ------------ Proceso para enviar, validar y almacenar los datos -------------
  // Enviamos los datos del "cowForm" a la API para validarlos y guardar una nueva Vaquita
  const onSubmitForm = async (e) => {
    e.preventDefault();
    const verifyInputs = Object.values(formState).every(
      (value) => value !== ""
    );
    if (verifyInputs) {
      const data = {
        ...formState,
        cowID: cowId,
      };
      const res = await postProductionRequest(
        data,
        document.cookie.replace("token=", "")
      );
      const toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      if (res.status == 200) {
        toast.fire({
          icon: "success",
          title: "¡Se ha agregado correctamente!",
          customClass: {
            popup: "popup-class",
            title: "title-class",
          },
        });
        // Actualizamos los datos de la tabla
        setActivateEffect(true);
      } else {
        toast.fire({
          icon: "error",
          title: "¡Ocurrió un error!",
          customClass: {
            popup: "popup-class",
            title: "title-class",
          },
        });
      }
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "¡Los campos no están llenos!",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "popup-class",
          title: "title-class",
        },
      });
    }
    resetFormState();
  };

  // ------------- Proceso para actualizar los datos -------------
  // Definimos un state para mostrar los elementos de edición
  const [editar, setEditar] = useState(false);

  // Definimos un state para tomar el código del elemento a editar
  const [selectedProductionID, setSelectedProductionID] = useState(null);
  const [selectedCowID, setSelectedCowID] = useState(null);

  // Definimos un método para traer los datos del elemento a editar desde el hijo
  const getSonData = (data, action) => {
    // Si los datos vienen con la acción de "edit" enviamos los datos del
    // elemento seleccionado a los respectivos inputs
    if (action === "edit") {
      setFormState({
        date: data.date,
        production: data.production,
      });
      setText(data.vacas.cow_name);
      // Mostramos los elementos de edición
      setSelectedProductionID(data.id);
      setSelectedCowID(data.id_cow);
      setEditar(true);
    } else {
      // En caso contrario se procede a eliminar los datos
      onDeleteData(data);
    }
  };

  // Enviamos los datos del "productionForm" a la API para validarlos y actualizar la Producción
  const onEditData = (e) => {
    async function putData() {
      const data = {
        ...formState,
        productionId: selectedProductionID,
        cowID: selectedCowID,
      };
      const res = await putProductionRequest(
        data,
        document.cookie.replace("token=", "")
      );
      const toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      if (res.status == 200) {
        toast.fire({
          icon: "success",
          title: "¡Se ha actualizado correctamente!",
          customClass: {
            popup: "popup-class",
            title: "title-class",
          },
        });
        // Actualizamos los datos de la tabla
        setActivateEffect(true);
      } else {
        toast.fire({
          icon: "error",
          title: "¡Ocurrió un error!",
          customClass: {
            popup: "popup-class",
            title: "title-class",
          },
        });
      }
    }
    e.preventDefault();
    const verifyInputs = Object.values(formState).every(
      (value) => value !== ""
    );
    if (verifyInputs) {
      Swal.fire({
        title: "¿Deseas actualizar los datos?",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Actualizar",
        customClass: {
          popup: "popup-class",
          title: "title-class",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          putData();
          setEditar(false);
        } else {
          resetFormState();
          setEditar(false);
        }
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "¡Los campos no están llenos!",
        showConfirmButton: false,
        timerProgressBar: 1500,
        timer: 1500,
        customClass: {
          popup: "popup-class",
          title: "title-class",
        },
      });
    }
    resetFormState();
  };

  // Cancelar actualizacion de datos
  const onCancelUpdate = () => {
    setEditar(false);
    resetFormState();
  };

  // ------------- Proceso para eliminar datos -------------
  const onDeleteData = (productionID) => {
    async function deleteData() {
      const res = await deleteProductionRequest(
        productionID,
        document.cookie.replace("token=", "")
      );
      const toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      if (res.status == 200) {
        toast.fire({
          icon: "success",
          title: "¡Se ha eliminado correctamente!",
          customClass: {
            popup: "popup-class",
            title: "title-class",
          },
        });
        // Actualizamos los datos de la tabla
        setActivateEffect(true);
      } else {
        toast.fire({
          icon: "error",
          title: "¡Ocurrió un error!",
          customClass: {
            popup: "popup-class",
            title: "title-class",
          },
        });
      }
    }
    Swal.fire({
      title: "¿Estás segur@?",
      text: "¡No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "No, cancelar",
      customClass: {
        popup: "popup-class",
        title: "title-class",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteData();
      }
    });
  };

  return (
    <>
      <div className="flex w-full gap-4">
        <div className="ml-4 p-4 w-[35%]">
          <p className="text-xl text-gray-800 font-semibold mb-3 ml-2">
            Agregar Producción
          </p>
          <form className="w-full bg-white shadow-md shadow-gray-200 rounded-md py-5 px-7">
            <div className="mb-2">
              <label htmlFor="cow" className="block mb-2 text-md font-bold">
                Vaca:
              </label>
              <input
                type="text"
                name="cow"
                className="text-md font-Lato text-gray-800 bg-white placeholder-gray-500 pl-2 pr-2 border-2 border-gray-200 w-full py-2 focus:outline-none focus:border-slate-500 rounded-lg"
                placeholder="Buscar vaca"
                value={text}
                onChange={(e) => onChangeHandler(e.target.value)}
                required
              ></input>
              <div className="absolute shadow-lg bg-gray-200 w-[320px]">
                {suggestions &&
                  suggestions.map((suggestions, i) => (
                    <div
                      className="px-3 py-2 cursor-pointer hover:bg-gray-300"
                      onClick={() =>
                        onSuggestHandler(suggestions.cow_name, suggestions.id)
                      }
                      key={i}
                    >
                      {suggestions.cow_name}
                    </div>
                  ))}
              </div>
            </div>
            <div className="mb-2">
              <label htmlFor="date" className="block mb-2 text-md font-bold">
                Fecha de Producción:
              </label>
              <input
                type="date"
                name="date"
                className="text-md font-Lato text-gray-800 bg-white placeholder-gray-500 pl-2 pr-2 border-2 border-gray-200 w-full py-2 focus:outline-none focus:border-slate-500 rounded-lg"
                placeholder=""
                value={date}
                onChange={onInputChange}
                required
              ></input>
            </div>
            <div className="mb-4">
              <label
                htmlFor="production"
                className="block mb-2 text-md font-bold"
              >
                Litros:
              </label>
              <input
                type="number"
                name="production"
                className="text-md font-Lato text-gray-800 bg-white placeholder-gray-500 pl-2 pr-2 border-2 border-gray-200 w-full py-2 focus:outline-none focus:border-slate-500 rounded-lg"
                placeholder="Litros"
                value={production}
                onChange={onInputChange}
                required
              ></input>
            </div>
          </form>
          <div className="mt-6 ml-4">
            {editar ? (
              <>
                <button
                  type="submit"
                  className="font-semibold shadow-lg text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-lg text-md px-6 py-3 mr-2 mb-2"
                  onClick={onEditData}
                >
                  Actualizar
                </button>
                <button
                  type="submit"
                  className="font-semibold shadow-lg focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-lg text-md px-6 py-3 mr-2 mb-2"
                  onClick={onCancelUpdate}
                >
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <button
                  type="submit"
                  className="font-semibold shadow-lg focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 rounded-lg text-md px-6 py-3 mr-2 mb-2"
                  onClick={onSubmitForm}
                >
                  Guardar
                </button>
                <button
                  type="submit"
                  className="font-semibold shadow-lg text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-md px-6 py-3 mb-1 focus:outline-none"
                  onClick={resetFormState}
                >
                  Limpiar
                </button>
              </>
            )}
          </div>
        </div>
        <div className="w-[60%] bg-white max-h-[480px] shadow-md shadow-gray-200 rounded-md py-5 px-6">
          <ProdData
            sendDataToParent={getSonData}
            activateEffect={activateEffect}
            resetActivateEffect={resetActivateEffect}
          />
        </div>
      </div>
    </>
  );
};
