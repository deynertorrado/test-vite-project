// Importaciones de React
import { useState } from "react";
import { useLocation } from "react-router-dom";

// Librerías Externas y Locales
import { postCowsRequest, putCowsRequest, deleteCowsRequest } from "../services/request";
import Swal from "sweetalert2";

// Importación de Componentes
import { CowsData } from "../components/CowsData"

// Componente Principal
export const Gestionar = () => {

  const { state } = useLocation();
  let logged = state.logged;

  // ------------- Proceso para tomar los datos -------------
  // Estado Inicial del "cowForm"
  const cowForm = {
    cowCode: '',
    cowName: '',
    cowBreed: '',
    cowDate: '',
    cowWeight: '',
    cowChilds: '',
  }

  // Manejo de estado del "cowForm"
  const [formState, setFormState] = useState(cowForm);

  // Obtenemos los valores de los atributos del "cowForm"
  const { cowCode, cowName, cowBreed, cowDate, cowWeight, cowChilds } = formState

  // Función que nos permite setear los inputs del "cowForm"
  const resetFormState = () => {
    setFormState(cowForm)
  }

  // Obtenemos los valores de los inputs del "cowForm"
  const onInputChange = ({target}) => {
    const { name, value } = target;
    setFormState({
        ...formState,
        [name]: value,
    });
  }

  // ------------ Proceso para enviar, validar y almacenar los datos -------------
  // Enviamos los datos del "cowForm" a la API para validarlos y guardar una nueva Vaquita
  const onSubmitForm = async (e) => {
    e.preventDefault()
    const verifyInputs = Object.values(formState).every(value  => value !== '')
    if (verifyInputs) {
      const res = await postCowsRequest(formState, document.cookie.replace('token=', ''))
      const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      })
      if (res.status == 200) {
        toast.fire({
          icon: 'success',
          title: '¡Se ha agregado correctamente!',
          customClass: {
            popup: "popup-class",
            title: "title-class",
          },
        })
        // Actualizamos los datos de la tabla
        setActivateEffect(true)
      } else {
        toast.fire({
          icon: 'error',
          title: '¡Ocurrió un error!',
          customClass: {
            popup: "popup-class",
            title: "title-class",
          },
        })
      }
    } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '¡Los campos no están llenos!',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: "popup-class",
            title: "title-class",
          },
      })
    }
    resetFormState()
  }

  // ------------- Proceso para actualizar los datos -------------
  // Definimos un state para mostrar los elementos de edición
  const [editar, setEditar] = useState(false)

  // Definimos un state para tomar el código del elemento a editar
  const [selectedCowID, setSelectedCowID] = useState(null)
  
  // Definimos un state para actualizar los datos de la tabla del componente hijo
  const [activateEffect, setActivateEffect] = useState(false)
  const resetActivateEffect = () => {
    setActivateEffect(false)
  }

  // Definimos un método para traer los datos del elemento a editar desde el hijo
  const getSonData = (data, action) => {
    // Si los datos vienen con la acción de "edit" enviamos los datos del 
    // elemento seleccionado a los respectivos inputs
    if (action === 'edit') {
        setFormState({
          cowCode: data.cow_code,
          cowName: data.cow_name,
          cowBreed: data.cow_breed,
          cowDate: data.cow_date,
          cowWeight: data.cow_weight,
          cowChilds: data.cow_childs,
      })
      // Mostramos los elementos de edición
      setSelectedCowID(data.id)
      setEditar(true)
    } else {
      // En caso contrario se procede a eliminar los datos
      onDeleteData(data)
    }
  }

  // Enviamos los datos del "cowForm" a la API para validarlos y actualizar la Vaquita
  const onEditData = (e) => {
    async function putData() {
      const data = {...formState, cowID: selectedCowID}
      const res = await putCowsRequest(data, document.cookie.replace('token=', ''))
      const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      })
      if (res.status == 200) {
        toast.fire({
          icon: 'success',
          title: '¡Se ha actualizado correctamente!',
          customClass: {
            popup: "popup-class",
            title: "title-class",
          },
        })
        // Actualizamos los datos de la tabla
        setActivateEffect(true)
      } else {
        toast.fire({
          icon: 'error',
          title: '¡Ocurrió un error!',
          customClass: {
            popup: "popup-class",
            title: "title-class",
          },
        })
      }
    }
    e.preventDefault()
    const verifyInputs = Object.values(formState).every(value  => value !== '')
    if (verifyInputs) {
      Swal.fire({
        title: '¿Deseas actualizar los datos?',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Actualizar',
        customClass: {
          popup: "popup-class",
          title: "title-class",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          putData()
          setEditar(false)
        } else {
          resetFormState()
          setEditar(false)
        }
      })
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '¡Los campos no están llenos!',
        showConfirmButton: false,
        timerProgressBar: 1500,
        timer: 1500,
        customClass: {
          popup: "popup-class",
          title: "title-class",
        },
      })
    }
    resetFormState()
  }

  // Cancelar actualizacion de datos
  const onCancelUpdate = () => {
    setEditar(false)
    resetFormState()
  }

  // ------------- Proceso para eliminar datos -------------
  const onDeleteData = (cowID) => {
    async function deleteData() {
      const res = await deleteCowsRequest(cowID, document.cookie.replace('token=', ''))
      const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      })
      if (res.status == 200) {
        toast.fire({
          icon: 'success',
          title: '¡Se ha eliminado correctamente!',
          customClass: {
            popup: "popup-class",
            title: "title-class",
          },
        })
        // Actualizamos los datos de la tabla
        setActivateEffect(true)
      } else {
        toast.fire({
          icon: 'error',
          title: '¡Ocurrió un error!',
          customClass: {
            popup: "popup-class",
            title: "title-class",
          },
        })
      }
    }
    Swal.fire({
      title: '¿Estás segur@?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      customClass: {
        popup: "popup-class",
        title: "title-class",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteData()
      }
    })
  }

  return (
    <>
      <p className="text-4xl text-gray-800 font-semibold mt-4 ml-8">Gestionar</p>
      <div className="flex w-full gap-4">
        <div className="mt-3 ml-4 p-4 w-[35%]">
          <p className="text-xl text-gray-800 font-semibold mb-3">Agregar nueva vaca</p>
          <form className="w-full bg-white shadow-xl rounded-md py-5 px-7">
            <div className="flex gap-5 text-gray-800">
              <div className="mb-2">
                <label htmlFor="cowName" className="block mb-2 text-md font-bold">Nombre:</label>
                <input 
                    type="text" 
                    name="cowName" 
                    className="text-md font-Lato text-gray-800 bg-white placeholder-gray-500 pl-2 pr-2 border-2 border-gray-200 w-full py-2 focus:outline-none focus:border-slate-500 rounded-lg" 
                    placeholder="Nombre"
                    value={cowName}
                    onChange={onInputChange}
                    required></input>
              </div>
              <div className="mb-2">
                <label htmlFor="cowCode" className="block mb-2 text-md font-bold">Código:</label>
                <input 
                    type="text" 
                    name="cowCode" 
                    className="text-md font-Lato text-gray-800 bg-white placeholder-gray-500 pl-2 pr-2 border-2 border-gray-200 w-full py-2 focus:outline-none focus:border-slate-500 rounded-lg" 
                    placeholder="Código"
                    value={cowCode}
                    onChange={onInputChange}
                    required></input>
              </div>
            </div>
            <div className="mb-2">
              <label htmlFor="cowBreed" className="block mb-2 text-md font-bold">Raza:</label>
              <select 
                  name="cowBreed" 
                  className="text-md font-Lato text-gray-800 bg-white placeholder-gray-500 pl-2 pr-2 border-2 border-gray-200 w-full py-2 focus:outline-none focus:border-slate-500 rounded-lg"
                  required
                  value={cowBreed}
                  onChange={onInputChange}>
                  <option value="">Selecciona una raza...</option>
                  <option value="GYR">GYR</option>
                  <option value="Mestiza">Mestiza</option>
                  <option value="Carora">Carora</option>
                  <option value="Guzera">Guzera</option>
              </select>
            </div> 
            <div className="mb-2">
              <label htmlFor="cowDate" className="block mb-2 text-md font-bold">Fecha de Nacimiento:</label>
              <input 
                  type="date" 
                  name="cowDate" 
                  className="text-md font-Lato text-gray-800 bg-white placeholder-gray-500 pl-2 pr-2 border-2 border-gray-200 w-full py-2 focus:outline-none focus:border-slate-500 rounded-lg" 
                  placeholder=""
                  value={cowDate}
                  onChange={onInputChange} 
                  required></input>
            </div>
            <div className="mb-2">
              <div className="flex gap-5">
                <div>
                  <label htmlFor="cowWeight" className="block mb-2 text-md font-bold">Peso</label>
                  <input 
                      type="number" 
                      name="cowWeight" 
                      className="text-md font-Lato text-gray-800 bg-white placeholder-gray-500 pl-2 pr-2 border-2 border-gray-200 w-full py-2 focus:outline-none focus:border-slate-500 rounded-lg" 
                      placeholder="Kg"
                      value={cowWeight}
                      onChange={onInputChange}
                      required></input>
                </div>
                <div>
                  <label htmlFor="cowChilds" className="block mb-2 text-md font-bold">Partos</label>
                  <input 
                      type="number" 
                      name="cowChilds" 
                      className="text-md font-Lato text-gray-800 bg-white placeholder-gray-500 pl-2 pr-2 border-2 border-gray-200 w-full py-2 focus:outline-none focus:border-slate-500 rounded-lg" 
                      placeholder=""
                      value={cowChilds}
                      onChange={onInputChange} 
                      required></input>
                </div>
              </div>
            </div>
          </form>
          <div className="mt-6 ml-4">
            {
              (editar) ?
                <>
                  <button 
                    type="submit" 
                    className="font-semibold shadow-lg text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-lg text-md px-6 py-3 mr-2 mb-2"
                    onClick={onEditData}>Actualizar
                  </button>
                  <button 
                    type="submit" 
                    className="font-semibold shadow-lg focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-lg text-md px-6 py-3 mr-2 mb-2"
                    onClick={onCancelUpdate}>Cancelar
                  </button>
                </>
              : 
                <>
                  <button 
                      type="submit" 
                      className="font-semibold shadow-lg focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 rounded-lg text-md px-6 py-3 mr-2 mb-2"
                      onClick={onSubmitForm}>Guardar
                  </button>
                  <button 
                      type="submit" 
                      className="font-semibold shadow-lg text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-md px-6 py-3 mb-1 focus:outline-none"
                      onClick={resetFormState}>Limpiar
                  </button>
                </>
            }
          </div>
        </div>
        <div className="w-[60%] bg-white max-h-[500px] shadow-xl rounded-md py-5 px-6">
          <CowsData sendDataToParent={getSonData} activateEffect={activateEffect} resetActivateEffect={resetActivateEffect} logged={logged}/>
        </div>
      </div>
    </>
  )
}
