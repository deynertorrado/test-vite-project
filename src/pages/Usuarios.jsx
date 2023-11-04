// Importaciones de React
import { useState } from "react";
import { useLocation } from "react-router-dom";

// Iconos
import {
  EyeOff,
  Eye
} from "lucide-react";

export const Usuarios = () => {
  
  // ------------- Proceso para tomar los datos -------------
  // Estado Inicial del "userForm"
  const userForm = {
    userName: '',
    user: '',
    userType: '',
    userPassword: ''
  }

  // Manejo de estado del "userForm"
  const [formState, setFormState] = useState(userForm);

  // Obtenemos los valores de los atributos del "userForm"
  const { userName, user, userType, userPassword } = formState

  // Función que nos permite setear los inputs del "userForm"
  const resetFormState = () => {
    setFormState(userForm)
  }

  // Obtenemos los valores de los inputs del "userForm"
  const onInputChange = ({target}) => {
    const { name, value } = target;
    setFormState({
        ...formState,
        [name]: value,
    });
  }

  

  // Definimo un state y una función para visualizar o ocultar la contraseña
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  return (
    <>
      <p className="text-4xl text-gray-800 font-semibold mt-4 ml-8">Usuarios</p>
      <div className="flex w-full gap-4">
        <div className="mt-3 ml-4 p-4 w-[35%]">
          <p className="text-xl text-gray-800 font-semibold mb-3">Agregar nuevo usuario</p>
          <form className="w-full bg-white shadow-xl rounded-md py-5 px-7">
            <div className="flex gap-5 text-gray-800">
              <div className="mb-2">
                <label htmlFor="userName" className="block mb-2 text-md font-bold">Nombre:</label>
                <input 
                    type="text" 
                    name="userName" 
                    className="text-md font-Lato text-gray-800 bg-white placeholder-gray-500 pl-2 pr-2 border-2 border-gray-200 w-full py-2 focus:outline-none focus:border-slate-500 rounded-lg" 
                    placeholder="Nombre"
                    onChange={onInputChange}
                    value={userName}
                    required></input>
              </div>
              <div className="mb-2">
                <label htmlFor="user" className="block mb-2 text-md font-bold">Usuario:</label>
                <input 
                    type="text" 
                    name="user" 
                    className="text-md font-Lato text-gray-800 bg-white placeholder-gray-500 pl-2 pr-2 border-2 border-gray-200 w-full py-2 focus:outline-none focus:border-slate-500 rounded-lg" 
                    placeholder="Usuario"
                    onChange={onInputChange}
                    value={user}
                    required></input>
              </div>
            </div>
            <div className="mb-2">
              <label htmlFor="userType" className="block mb-2 text-md font-bold">Tipo:</label>
              <select 
                  name="userType" 
                  className="text-md font-Lato text-gray-800 bg-white placeholder-gray-500 pl-2 pr-2 border-2 border-gray-200 w-full py-2 focus:outline-none focus:border-slate-500 rounded-lg"
                  onInput={onInputChange}
                  value={userType}
                  required>
                  <option value="">Selecciona un tipo...</option>
                  <option value="Normal">Normal</option>
                  <option value="Administrativo">Administrativo</option>
              </select>
            </div>
            <div className="mb-2">
              <label htmlFor="userPassword" className="block mb-2 text-md font-bold">Contraseña:</label>
              <div className="flex">
                <input 
                    type={showPassword ? "text" : "password"} 
                    name="userPassword" 
                    className="text-md font-Lato text-gray-800 bg-white placeholder-gray-500 pl-2 pr-2 border-2 border-gray-200 w-full py-2 focus:outline-none focus:border-slate-500 rounded-lg rounded-tr-none rounded-br-none" 
                    placeholder="Contraseña"
                    onChange={onInputChange}
                    value={userPassword}
                    required></input>
                <button 
                  onClick={toggleShowPassword} 
                  className="px-3 bg-gray-200 rounded-tr-lg rounded-br-lg"
                  type="button">
                  {
                    (!showPassword) ? <EyeOff size={18}/>
                    : <Eye size={18}/>
                  }
                </button>
              </div>
            </div>
          </form>
          <div className="mt-6 ml-4">
            <button 
                type="submit" 
                className="font-semibold shadow-lg focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 rounded-lg text-md px-6 py-3 mr-2 mb-2"
                >Guardar
            </button>
            <button 
                type="submit" 
                className="font-semibold shadow-lg text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-md px-6 py-3 mb-1 focus:outline-none"
                >Limpiar
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
