// Imagenes
import Logo from "../assets/LoginAssets/Logo.svg";

// Iconos
import {
  Power,
  LayoutDashboard,
  PackagePlus,
  ScanText,
  Users,
} from "lucide-react";

// Importaciones de React
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

// Componente Principal
export const Layout = () => {
  // Definimos un useState para manejar el estado del sidebar
  const [open, setOpen] = useState(true);

  // Expandir Sidebar
  const handleMouseOver = () => {
    setOpen(true);
  };

  // Contraer Sidebar
  const handleMouseOut = () => {
    setOpen(false);
  };

  // Opciones de navegación
  const options = [
    { title: "Gestionar", icon: <LayoutDashboard size={20} /> },
    { title: "Usuarios", icon: <Users size={20} /> },
    { title: "Producción", icon: <PackagePlus size={20} /> },
    { title: "General", icon: <ScanText size={20} /> },
  ];

  // Inicializamos el "navigate" (router)
  const navigate = useNavigate();

  // Método que permite movernos entre los componentes definidos en el router
  const onHandleSection = ({ target }) => {
    const navigateTo = target.innerText;
    navigate(`/${navigateTo}`);
  };

  return (
    <>
      <main className="flex font-Lato">
        <aside>
          <div
            className={`${
              open ? "w-[260px]" : "w-20"
            } h-screen p-5 pt-8 bg-gray-100 duration-300 relative`}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <div className="flex gap-x-3 items-center w-full">
              <img
                src={Logo}
                alt="Logo"
                className="w-10 cursor-pointer duration-500 bg-orange-600 p-[1px] rounded-md shadow-lg shadow-gray-300"
              />
              <p
                className={`text-gray-500 origin-left text-3xl duration-300 font-semibold ${
                  !open && "scale-0"
                }`}
              >
                El{<span className="text-gray-100">i</span>}Remanso
              </p>
            </div>
            <ul className="pt-6">
              {options.map((menu, index) => (
                <li
                  key={index}
                  className="font-semibold text-gray-700 text-md flex items-center gap-x-4 cursor-pointer p-2 mb-3 hover:bg-gray-300 duration-75 ease-in rounded-md"
                  onClick={onHandleSection}
                >
                  <span className="shadow-md shadow-gray-300 rounded-md p-1">
                    {menu.icon}
                  </span>
                  <span
                    className={`${!open && "scale-0"} origin-left duration-300`}
                  >
                    {menu.title}
                  </span>
                </li>
              ))}
            </ul>
            <ul className="mt-56">
              <li className="font-semibold text-gray-700 text-md flex items-center gap-x-4 cursor-pointer p-2 mb-3 hover:bg-gray-300 duration-75 ease-in rounded-md">
                <span className="shadow-md shadow-gray-300 rounded-md p-1">
                  <Power size={20} />
                </span>
                <span
                  className={`${!open && "scale-0"} origin-left duration-300`}
                >
                  Salir
                </span>
              </li>
            </ul>
          </div>
        </aside>
        <section>
          <Outlet />
        </section>
      </main>
    </>
  );
};
