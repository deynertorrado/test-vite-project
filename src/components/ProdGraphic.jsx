// Importaciones de React
import { useState, useEffect } from "react";

// Librerías Externas y Locales
import { getProductionRequest } from "../services/request";
import { FlameKindling } from "lucide-react";

// Componente Principal
export const ProdGraphic = () => {

  // ------------- Proceso para traer los datos de la Producción en la API -------------
  // Definimos los estados para almacenar los Usuarios
  const [productionData, setProductionData] = useState([]);

  // Definimos una función para traer los datos de la producción en la API
  async function getData() {
    try {
      const res = await getProductionRequest(
        document.cookie.replace("token=", "")
      );
      setProductionData(res.data);
      let uniqueNames = new Set(res.data.map(prod => prod.vacas.cow_name));
      setNameList(Array.from(uniqueNames))
    } catch (error) {
      console.log(error);
    }
  }

  // Definimos un useEffect para obtener los datos en primera instancia
  useEffect(() => {
      getData();
  }, []);

  // Guardamos unicamente los nombres de las vacas con produccion
  const [nameList, setNameList] = useState([])


  return (
    <>
      <div className="text-xl ml-9">En construcción... 🚀</div>
    </>
  )
}
