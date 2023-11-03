// Imagenes
import Logo from "../assets/LoginAssets/Logo.svg";

// Iconos
import {
  Power,
  LayoutDashboard,
  PackagePlus,
  ScanText,
  Users,
  UserSquare2,
} from "lucide-react";

// Importaciones de React
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// Componente Principal
export const Layout = () => {
  // Definimos un useState para manejar el estado del sidebar
  const [open, setOpen] = useState(false);

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
    { title: "Produccion", icon: <PackagePlus size={20} /> },
    { title: "General", icon: <ScanText size={20} /> },
  ];

  // ------------------------ Autenticación ------------------------
  // Recibimos los atributos de "state" y usamos "navigate"
  // Estos nos permiten validar si el usuario ha iniciado sesión correctamente
  const navigate = useNavigate();
  const { state } = useLocation();
  let username = state == null ? "Unknow" : state.username;

  // Hacemos uso de useEffect para validar al autenticación del usuario
  useEffect(() => {
    if (state == null) {
      // En caso de que el usuario no esté autenticado lo redirigimos al Login
      navigate("/");
    } else {
      navigate("/Home/Gestionar", {
        state: {
          username: username,
          logged: true
        },
      });
    }
  }, []);

  // Método que permite movernos entre los componentes definidos en el router
  const onHandleSection = ({ target }) => {
    const navigateTo = target.innerText;
    navigate(`/Home/${navigateTo}`, {
      state: {
        username: username,
        logged: true
      },
    });
  };

  return (
    <>
      <main className="flex font-Lato">
        <aside className="fixed">
          <div
            className={`${
              open ? "w-[260px]" : "w-20"
            } h-screen p-5 pt-8 bg-slate-800 duration-200 relative`}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <div className="flex gap-x-3 items-center w-full">
              <img
                src={Logo}
                alt="Logo"
                className="w-10 cursor-pointer bg-orange-600 p-[1px] rounded-md shadow-lg shadow-black"
              />
              <p
                className={`text-white origin-left text-3xl duration-200 font-semibold ${
                  !open && "scale-0"
                }`}
              >
                El{<span className="text-slate-800">i</span>}Remanso
              </p>
            </div>
            <ul className="pt-6">
              {options.map((menu, index) => (
                <li
                  key={index}
                  className="font-semibold text-white text-md flex items-center gap-x-4 cursor-pointer p-1 mb-3 hover:bg-slate-900 duration-75 ease-in rounded-md"
                  onClick={onHandleSection}
                >
                  <span className="shadow-md shadow-gray-900 rounded-md p-2">
                    {menu.icon}
                  </span>
                  <span
                    className={`${!open && "scale-0"} origin-left duration-200`}
                  >
                    {menu.title}
                  </span>
                </li>
              ))}
            </ul>
            <ul className="mt-[180px]">
              <li className="font-semibold text-white text-md flex items-center gap-x-4 cursor-default p-1 mb-3 hover:bg-slate-900 duration-75 ease-in rounded-md">
                <span className="shadow-md shadow-gray-900 bg-emerald-600 rounded-md p-2">
                  <UserSquare2 size={20} />
                </span>
                <span
                  className={`${
                    !open && "scale-0"
                  } origin-left duration-200 capitalize`}
                >
                  {username}
                </span>
              </li>
            </ul>
            <ul className="mt-1">
              <li className="ffont-semibold text-white text-md flex items-center gap-x-4 cursor-pointer p-1 mb-3 hover:bg-slate-900 duration-75 ease-in rounded-md">
                <span className="shadow-md shadow-gray-900 bg-red-500 rounded-md p-2">
                  <Power size={20} />
                </span>
                <span
                  className={`${!open && "scale-0"} origin-left duration-200`}
                >
                  Salir
                </span>
              </li>
            </ul>
          </div>
        </aside>
        <section className="ml-20 bg-gray-100 w-full h-screen">
          <Outlet />
        </section>
      </main>
    </>
  );
};
