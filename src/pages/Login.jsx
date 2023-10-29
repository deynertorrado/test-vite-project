// Imagenes
import Logo from '../assets/LoginAssets/Logo.svg';
import OrangeCow from '../assets/LoginAssets/OrangeCow.png';

// Iconos
import { UserCircle2, Codesandbox, KeyRound, ArrowRightCircle } from 'lucide-react';

// Importaciones de React
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Componente Principal
export const Login = () => {

    // Inicializamos el "navigate" (router)
    const navigate = useNavigate();

    // ---------- Proceso para tomar los datos e Iniciar Sesión ----------
    // Estado Inicial del "loginUser"
    const loginForm = {
        username: '',
        password: ''
    }

    // Manejo de estado del "loginUser"
    const [formState, setFormState] = useState(loginForm);

    // Obtenemos los valores de los input del "LoginForm"
    const onInputChange = ({target}) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value,
        });
    }

    // Obtenemos los valores de los atributos del "LoginForm"
    const { username, password } = formState

    // Función que me permite setear los input del "LoginForm"
    const resetLoginState = () => {
        setFormState(loginForm)
    }

    // Método que permite dirigirnos al "Home"
    const onSubmitForm = () => {
        navigate('/home')
    }

    return (
        <>
            <div class="min-h-screen flex flex-col items-center justify-center bg-white font-sans">
                <div className="bg-center h-screen">
                    <img className="w-screen h-screen object-cover" src={OrangeCow} alt="Orange-Cow"/>
                </div>
                <div class="flex flex-col bg-white shadow-2xl shadow-black py-12 px-10 absolute rounded-md">
                    <div>
                        <div className="flex justify-center mb-1">
                            <img src={Logo} alt="Logo" className="h-[150px] w-[250px]"/>
                        </div>
                        <div className="flex items-center justify-center gap-1 px-5 py-1 text-orange-800 mb-2">
                            <Codesandbox size={22} strokeWidth={2}/>
                            <h1 className="text-2xl font-bold text-center">Dashboard</h1>
                        </div>
                        <form>
                            <div class="flex flex-col mb-6">
                                <label htmlFor="username" class="mb-1 text-md text-gray-600 font-semibold">Usuario:</label>
                                <div class="relative">
                                    <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                        <UserCircle2 size={22} strokeWidth={2}/>
                                    </div>
                                    <input 
                                        type="text" 
                                        name="username" 
                                        class="text-md font-semibold text-gray-800 bg-gray-100 placeholder-gray-500 pl-10 pr-4 border border-gray-400 w-full py-2 focus:outline-none focus:border-red-500 rounded-md" 
                                        placeholder="@Usuario"
                                        required
                                        value={username}
                                        onChange={onInputChange}/>
                                </div>
                            </div>
                            <div class="flex flex-col mb-6">
                                <label htmlFor="password" class="mb-1 text-md text-gray-600 font-semibold">Contraseña:</label>
                                <div class="relative">
                                    <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                        <KeyRound size={20} strokeWidth={2}/>
                                    </div>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        class="text-md font-semibold text-gray-800 bg-gray-100 placeholder-gray-500 pl-10 pr-4 border border-gray-400 w-full py-2 focus:outline-none focus:border-red-500 rounded-md" 
                                        placeholder="************"
                                        required
                                        value={password}
                                        onChange={onInputChange}/>
                                </div>
                            </div>

                            <div class="flex w-full">
                                <button 
                                    type="submit" 
                                    class="flex items-center justify-center gap-1 focus:outline-none text-white text-sm sm:text-base bg-red-700 hover:bg-red-800 py-2 w-full transition duration-150 ease-in rounded-md"
                                    onClick={onSubmitForm}>
                                    <span class="capitalize font-semibold">Ingresar</span>
                                    <span>
                                        <ArrowRightCircle size={20} strokeWidth={2}/>
                                    </span>
                                </button> 
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
