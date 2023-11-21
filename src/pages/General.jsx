// Imagenes
import HeadCow from "../assets/LoginAssets/headcow.png";
import Mountains from "../assets/LoginAssets/mountains.png";
import CowSilhouette from "../assets/LoginAssets/cow-silhouette.png";
import CowsGraze from "../assets/LoginAssets/cows-graze.png";

// Importaciones de React
import { useEffect, useState } from "react";

// Iconos
import { Search, Frown, Milk } from "lucide-react";

// Librerías Externas y Locales
import { getCowsRequest, getProductionRequest } from "../services/request";

export const General = () => {
  // Definimos un estado para almacenar los datos de las vacas
  const [cowsData, setCowsData] = useState([]);
  const [generalProduction, setGeneralProduction] = useState(null);

  // Definimos una función para traer los datos de la producción en la API
  async function getCowsData() {
    try {
      const res = await getCowsRequest(document.cookie.replace("token=", ""));
      const resProduct = await getProductionRequest(
        document.cookie.replace("token=", "")
      );
      setCowsData(res.data);
      setGeneralProduction(resProduct.data);
    } catch (error) {
      console.log(error);
    }
  }

  // Definimos un useEffect para obtener los datos en primera instancia
  useEffect(() => {
    getCowsData();
  }, []);

  const [production, setProduction] = useState(0);
  const [selectedCow, setSelectedCow] = useState(null);
  const onSelectedCow = (objectCow) => {
    setSelectedCow(objectCow);
    const cowProduct = generalProduction.filter(
      (item) => item.id_cow === objectCow.id
    );
    const totalAmount = cowProduct.reduce(
      (accum, object) => accum + object.production,
      0
    );
    setProduction(totalAmount);
  };

  // Definimos el estado y la función para filtrar las vacas por el nombre
  const [filter, setFilter] = useState("");
  const filteredCows = cowsData.filter((cow) =>
    cow.cow_name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <div className="flex">
        <div className="w-[40%] ml-5">
          <p className="text-4xl text-gray-800 font-semibold mt-5 ml-5">
            Información General
          </p>
          <div className="w-full">
            <div className="flex items-center gap-2">
              <p className="ml-5 mt-5 text-2xl font-semibold text-gray-800">
                Seleccionar Vaca
              </p>
              <span className="-mb-6">
                <Search size={20} />
              </span>
            </div>
            <input
              className="ml-5 mt-5 text-md font-Lato text-gray-800 bg-white placeholder-gray-500 pl-2 pr-2 border-2 border-gray-200 w-[85%] py-2 focus:outline-none focus:border-slate-500 rounded-lg shadow-md shadow-gray-200"
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Buscar por nombre"
            />
          </div>
          <div className="ml-5 mt-5 max-h-[400px] overflow-scroll w-[85%]">
            {filteredCows.map((cow, i) => (
              <div
                className="bg-stone-100 rounded-xl flex mb-4 w-full cursor-pointer shadow-lg shadow-gray-200 hover:bg-stone-200 transition-all ease-in-out duration-75"
                key={i}
                onClick={() => onSelectedCow(cow)}
              >
                <span className="ml-2">
                  <img src={HeadCow} alt="HeadCow" className="w-[100px]" />
                </span>
                <div className="mt-3 -ml-4 w-[20%]">
                  <p className="text-md font-semibold text-stone-900">
                    {cow.cow_name}
                  </p>
                  <p className="text-sm -mt-1 text-stone-800">
                    {cow.cow_breed}
                  </p>
                  <p className="text-sm -mt-1 text-stone-800">
                    {cow.cow_weight}
                  </p>
                </div>
                <div className="relative">
                  <span>
                    <img
                      src={Mountains}
                      alt="Mountains"
                      className="w-[220px] -mt-3 -ml-5"
                    />
                  </span>
                  <div className="bg-green-500 rounded-[50%] p-5 absolute top-5 -right-3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[60%] p-8 -ml-10">
          <div>
            {selectedCow == null ? (
              <div className="flex justify-center flex-col items-center">
                <span>
                  <img
                    src={CowsGraze}
                    alt="CowSilhouette"
                    className="w-full opacity-20"
                  />
                </span>
                <p className="text-4xl text-stone-300 mt-10 font-semibold">
                  El Remanso
                </p>
              </div>
            ) : (
              <div>
                <div className="flex mt-3 bg-stone-100 w-full p-5 rounded-xl shadow-lg shadow-gray-200">
                  <div className="ml-5">
                    <p className="text-4xl text-stone-800 font-semibold mb-2">
                      {selectedCow.cow_name}
                    </p>
                    <p className="text-lg font-semibold text-stone-500 -mt-1">
                      Raza: {selectedCow.cow_breed}
                    </p>
                    <p className="text-lg font-semibold text-stone-500 -mt-1">
                      Código: {selectedCow.cow_code}
                    </p>
                    <p className="text-lg font-semibold text-stone-500 -mt-1">
                      Nacimiento: {selectedCow.cow_date}
                    </p>
                    <p className="text-lg font-semibold text-stone-500 -mt-1">
                      Peso: {selectedCow.cow_weight} Kg
                    </p>
                    <p className="text-lg font-semibold text-stone-500 -mt-1">
                      Partos: {selectedCow.cow_childs}
                    </p>
                  </div>
                  <span className="-mt-4 ml-28">
                    <img
                      src={CowSilhouette}
                      alt="CowSilhouette"
                      className="w-[200px]"
                    />
                  </span>
                </div>
                <div className="mt-11 bg-stone-100 w-full p-5 rounded-xl shadow-lg shadow-gray-200">
                  <p className="text-4xl text-stone-800 font-semibold mt-3 ml-5">
                    Producción
                  </p>
                  <div className="p-[60px] flex justify-center">
                    {production == 0 ? (
                      <div className="flex gap-2 items-center">
                        <p className="text-3xl text-stone-600 font-semibold">
                          Sin producción
                        </p>
                        <span className="-mb-1 text-stone-600">
                          <Frown size={30} />
                        </span>
                      </div>
                    ) : (
                      <div className="flex gap-2 items-center">
                        <p className="text-3xl text-stone-600 font-semibold">
                          +<span className="text-stone-800">{production}L</span>{" "}
                          de leche
                        </p>
                        <span className="-mb-1 text-stone-600">
                          <Milk size={30} />
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
