// Importaciones de React
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Librerías Externas y Locales
import {
  postUserRequest,
  putUserRequest,
  deleteUserRequest,
} from "../services/request";
import Swal from "sweetalert2";

// Importación de Componentes
import { UsersData } from "../components/users/UsersData";

// Iconos
import { EyeOff, Eye } from "lucide-react";

export const Users = () => {
  const { state } = useLocation();
  let currentlyUser = state.userName;
  let UserType = state.userType;

  const [disableForm, setDisableForm] = useState(false);
  useEffect(() => {
    if (UserType === "Normal") {
      setDisableForm(true);
    }
  }, []);

  // ------------- Proceso para tomar los datos -------------
  // Estado Inicial del "userForm"
  const userForm = {
    userName: "",
    user: "",
    userType: "",
    userPassword: "",
  };

  // Manejo de estado del "userForm"
  const [formState, setFormState] = useState(userForm);

  // Obtenemos los valores de los atributos del "userForm"
  const { userName, user, userType, userPassword } = formState;

  // Función que nos permite setear los inputs del "userForm"
  const resetFormState = () => {
    setFormState(userForm);
  };

  // Obtenemos los valores de los inputs del "userForm"
  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Definimos un state para actualizar los datos de la tabla del componente hijo
  const [activateEffect, setActivateEffect] = useState(false);
  const resetActivateEffect = () => {
    setActivateEffect(false);
  };

  // ------------ Proceso para enviar, validar y almacenar los datos -------------
  // Enviamos los datos del "userForm" a la API para validarlos y guardar un nuevo Usuario
  const onSubmitForm = async (e) => {
    if (disableForm) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `¡No puedes realizar esta acción!`,
        showConfirmButton: false,
        timerProgressBar: 1000,
        timer: 1000,
        customClass: {
          popup: "popup-class",
          title: "title-class",
        },
      });
    } else {
      e.preventDefault();
      const verifyInputs = Object.values(formState).every(
        (value) => value !== ""
      );
      if (verifyInputs) {
        const res = await postUserRequest(
          formState,
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
    }
  };

  // ------------- Proceso para actualizar los datos -------------
  // Definimos un state para mostrar los elementos de edición
  const [editar, setEditar] = useState(false);

  // Definimos un state para tomar el código del elemento a editar
  const [selectedUserID, setSelectedUserID] = useState(null);

  // Definimos un método para traer los datos del elemento a editar desde el hijo
  const getSonData = (data, action, user) => {
    // Si los datos vienen con la acción de "edit" enviamos los datos del
    // elemento seleccionado a los respectivos inputs
    if (action === "edit") {
      setFormState({
        userName: data.name,
        user: data.username,
        userType: data.type,
        userPassword: data.password,
      });
      // Mostramos los elementos de edición
      setSelectedUserID(data.id);
      setEditar(true);
    } else {
      // En caso contrario se procede a eliminar los datos, pasamos "user"
      // para verificar que no se elimine el usuario actual
      onDeleteData(data, user);
    }
  };

  // Enviamos los datos del "userForm" a la API para validarlos y actualizar el Usuario
  const onEditData = (e) => {
    if (disableForm) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `¡No puedes realizar esta acción!`,
        showConfirmButton: false,
        timerProgressBar: 1000,
        timer: 1000,
        customClass: {
          popup: "popup-class",
          title: "title-class",
        },
      });
    } else {
      async function putData() {
        const data = { ...formState, userId: selectedUserID };
        const res = await putUserRequest(
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
    }
  };

  // Cancelar actualizacion de datos
  const onCancelUpdate = () => {
    setEditar(false);
    resetFormState();
  };

  // ------------- Proceso para eliminar datos -------------
  const onDeleteData = (userID, user) => {
    if (disableForm) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `¡No puedes realizar esta acción!`,
        showConfirmButton: false,
        timerProgressBar: 1000,
        timer: 1000,
        customClass: {
          popup: "popup-class",
          title: "title-class",
        },
      });
    } else {
      // Verificamos si el usuario a eliminar es el mismo que el usuario actual, en ese
      // rechazamos la ejecución de la función y mandamos una advertencia
      if (currentlyUser == user) {
        Swal.fire({
          title: "¡Error!",
          text: "¡No puedes realizar esta acción!",
          icon: "error",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          customClass: {
            popup: "popup-class",
            title: "title-class",
          },
        });
      } else {
        async function deleteData() {
          const res = await deleteUserRequest(
            userID,
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
      }
    }
  };

  // Definimo un state y una función para visualizar o ocultar la contraseña
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <p className="text-4xl text-gray-800 font-semibold mt-4 ml-8">Usuarios</p>
      <div className="flex w-full gap-4">
        <div className="mt-3 ml-4 p-4 w-[35%]">
          <p className="text-xl text-gray-800 font-semibold mb-3">
            Agregar nuevo usuario
          </p>
          <form className="w-full bg-white shadow-md shadow-gray-200 rounded-md py-5 px-7">
            <fieldset disabled={disableForm}>
              <div className="flex gap-5 text-gray-800">
                <div className="mb-2">
                  <label
                    htmlFor="userName"
                    className="block mb-2 text-md font-bold"
                  >
                    Nombre:
                  </label>
                  <input
                    type="text"
                    name="userName"
                    className="text-md font-Lato text-gray-800 bg-white placeholder-gray-500 pl-2 pr-2 border-2 border-gray-200 w-full py-2 focus:outline-none focus:border-slate-500 rounded-lg"
                    placeholder="Nombre"
                    onChange={onInputChange}
                    value={userName}
                    required
                  ></input>
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="user"
                    className="block mb-2 text-md font-bold"
                  >
                    Usuario:
                  </label>
                  <input
                    type="text"
                    name="user"
                    className="text-md font-Lato text-gray-800 bg-white placeholder-gray-500 pl-2 pr-2 border-2 border-gray-200 w-full py-2 focus:outline-none focus:border-slate-500 rounded-lg"
                    placeholder="Usuario"
                    onChange={onInputChange}
                    value={user}
                    required
                  ></input>
                </div>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="userType"
                  className="block mb-2 text-md font-bold"
                >
                  Tipo:
                </label>
                <select
                  name="userType"
                  className="text-md font-Lato text-gray-800 bg-white placeholder-gray-500 pl-2 pr-2 border-2 border-gray-200 w-full py-2 focus:outline-none focus:border-slate-500 rounded-lg"
                  onInput={onInputChange}
                  value={userType}
                  required
                >
                  <option value="">-- Selecciona un tipo --</option>
                  <option value="Normal">Normal</option>
                  <option value="Administrativo">Administrativo</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="userPassword"
                  className="block mb-2 text-md font-bold"
                >
                  Contraseña:
                </label>
                <div className="flex">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="userPassword"
                    className="text-md font-Lato text-gray-800 bg-white placeholder-gray-500 pl-2 pr-2 border-2 border-gray-200 w-full py-2 focus:outline-none focus:border-slate-500 rounded-lg rounded-tr-none rounded-br-none"
                    placeholder="Contraseña"
                    onChange={onInputChange}
                    value={userPassword}
                    required
                  ></input>
                  <button
                    onClick={toggleShowPassword}
                    className="px-3 bg-gray-200 rounded-tr-lg rounded-br-lg"
                    type="button"
                  >
                    {!showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </fieldset>
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
        <div className="w-[60%] bg-white max-h-[500px] shadow-md shadow-gray-200 rounded-md py-5 px-6">
          <UsersData
            sendDataToParent={getSonData}
            activateEffect={activateEffect}
            resetActivateEffect={resetActivateEffect}
            disable={disableForm}
          />
        </div>
      </div>
    </>
  );
};
