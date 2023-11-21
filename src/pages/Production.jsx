// Importaciones de React
import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

// Iconos
import { CopyPlus, BarChart } from "lucide-react";

// Componente Principal
export const Production = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  let name = state.name;
  let userName = state.userName;
  let userType = state.userType;

  // Definimos un effect para dejar la vista de "Agregar" como predeterminada
  useEffect(() => {
    navigate(`/Inicio/Produccion/Agregar`, {
      state: {
        name: name,
        userName: userName,
        userType: userType,
      },
    });
  }, []);

  // Función que nos permite cambiar entre las secciones de la vista Producción
  const onHandleSection = (section) => {
    navigate(`/Inicio/Produccion/${section}`, {
      state: {
        name: name,
        userName: userName,
        userType: userType,
      },
    });
  };

  return (
    <>
      <div className="flex mt-4 ml-8 gap-2 items-center">
        <p className="text-4xl text-gray-800 font-semibold mt-4">
          Producción Lechera
        </p>
        <div className="mt-4 ml-8 flex">
          <ul className="flex cursor-pointer items-center">
            <li
              className="flex items-center py-2 px-4 w-full justify-center border-b-2 hover:bg-gray-300 hover:border-gray-400 duration-100"
              onClick={() => onHandleSection("Agregar")}
            >
              <span>
                <CopyPlus size={16} />
              </span>
              <span className="text-lg ml-2">Agregar</span>
            </li>
            <li
              className="flex items-center py-2 px-4 w-full justify-center border-b-2 hover:bg-gray-300 hover:border-gray-400 duration-100"
              onClick={() => onHandleSection("Grafica")}
            >
              <span>
                <BarChart size={16} />
              </span>
              <span className="text-lg ml-2">Gráfica</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-5">
        <Outlet />
      </div>
    </>
  );
};
