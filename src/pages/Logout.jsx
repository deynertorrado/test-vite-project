// Imagenes
import Logo from "../assets/LoginAssets/Logo.svg";
import OrangeCow from "../assets/LoginAssets/OrangeCow.png";

// Importaciones de React
import { useLocation, useNavigate } from "react-router-dom";

// Iconos
import { Codesandbox, DoorOpen } from "lucide-react";

// Componente Principal
export const Logout = () => {
  // Recibimos el atributo de "state" y usamos "navigate"
  // Estos nos permiten validar si el usuario ha estado en el sistema con anterioridad
  const { state } = useLocation();
  const navigate = useNavigate();
  let username = state.username;

  // Este método nos retorna al "Login"
  const onLogin = () => {
    navigate("/");
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white font-sans">
        <div className="bg-center h-screen">
          <img
            className="w-screen h-screen object-cover"
            src={OrangeCow}
            alt="OrganeCow"
          />
        </div>
        <div className="flex justify-items-center justify-center absolute">
          <div className="bg-white flex flex-col justify-center items-center rounded-md shadow-2xl py-2 px-2 shadow-black">
            <div className="mt-4">
              <img src={Logo} alt="Logo" className="w-[140px]" />
            </div>
            <div className="px-5 py-1 text-orange-950 flex flex-col justify-center w-full">
              <div className="text-2xl font-semibold text-center flex items-center justify-center gap-2">
                <h1 className="flex items-center">
                  <Codesandbox />
                  Dashboard
                </h1>
                <span className="font-bold">El Remanso</span>
              </div>
              <p className="text-lg italic font-semibold">
                ¡Gracias por haber utilizado nuestra plataforma!
              </p>
              <p className="text-md text-center italic text-slate-900 font-semibold">
                @{username}
              </p>
            </div>
            <button
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-semibold rounded-md text-md px-7 py-2.5 text-center mb-6 mt-3 flex items-center justify-center gap-2"
              onClick={onLogin}
            >
              <span class="capitalize font-semibold">Ingresar</span>
              <span>
                <DoorOpen size={20} strokeWidth={2} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
