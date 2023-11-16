// Importaciones de React
import { useState, useEffect } from "react";

// Librerías Externas y Locales
import { getProductionRequest } from "../../services/request";

// Importación de Componentes
import { Graphic } from "./Graphic";

// Iconos
import { BarChart2 } from "lucide-react";

// Componente Principal
export const ProdGraphic = () => {

  // ------------- Proceso para traer los datos de la Producción en la API -------------
  // Definimos un estado para almacenar los datos de las vacas
  const [cowsData, setCowsData] = useState([]);

  // Definimos una función para traer los datos de la producción en la API
  async function getData() {
    try {
      const res = await getProductionRequest(
        document.cookie.replace("token=", "")
      );

      // Guardamos unicamente los atributos que nos interesa
      const cowData = res.data.map(product => ({
        cowId: product.vacas.id,
        cowName: product.vacas.cow_name
      }))

      // Utilizamos un conjunto para eliminar duplicados basándonos en cowId
      const uniqueCowData = Array.from(new Set(cowData.map(item => item.cowId)))
      .map(cowId => cowData.find(item => item.cowId === cowId));

      setCowsData(uniqueCowData)

    } catch (error) {
      console.log(error);
    }
  }

  // Definimos un useEffect para obtener los datos en primera instancia
  useEffect(() => {
      getData();
  }, []);


  const [selectedData, setSelectedData] = useState({})
  const getCowData = (name, id) => {
    setSelectedData({
      name,
      id
    })
  }  
  // Definimos el estado y la función para filtrar las vacas por el nombre
  const [filter, setFilter] = useState('');
  const filteredCows = cowsData.filter(cow =>
    cow.cowName.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <div className="flex font-Lato w-[100%] gap-12">
        <div className="ml-8 mt-4 w-[18%]">
          <div className="mb-5"><p className="text-2xl font-semibold text-gray-800 ml-6">Seleccionar Vaca</p></div>
          <div className="bg-white px-2 py-2 mb-4 border shadow-md shadow-gray-200 rounded-md">
            <input
              type="text"
              placeholder="Buscar por nombre"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-2 py-1 border rounded-md w-full text-md font-Lato text-gray-800 placeholder-gray-500 border-gray-200 focus:outline-none focus:border-emerald-700"
            />
          </div>
          <div className="bg-white shadow-md shadow-gray-200 rounded-md px-2 py-4 max-h-[500px] overflow-scroll">
            {
              filteredCows.map((cow, iter) => (
                <div 
                  key={iter} 
                  className="border mb-1 p-1 rounded-md flex items-center gap-1 cursor-pointer hover:bg-gray-200 transition-all ease-in duration-75"
                  onClick={() => getCowData(cow.cowName, cow.cowId)}>
                  <span className="text-red-700 ml-1"><BarChart2 size={18}/></span>
                  <span>{cow.cowName}</span>  
                </div>
              ))
            }
          </div>
        </div>
        <div className="bg-white p-5 shadow-md shadow-gray-200 rounded-md w-[70%] h-[470px]">
          <Graphic data={selectedData}/>
        </div>
      </div>
    </>
  )
}
