// Importaciones de React
import { useState, useEffect } from "react";

// Librerías Externas y Locales
import { getGraphicData } from "../../services/request";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export const Graphic = ({ data }) => {
  // Definimos los estados para mostrar y filtrar datos
  const [graphicData, setGraphicData] = useState([]);
  const [filterYears, setFilterYears] = useState([]);
  const [disorganizedData, setDisorganizedData] = useState([]);

  // Definimos una función para traer la producción específica de la vaca
  async function getDataGraphic() {
    try {
      const res = await getGraphicData(
        document.cookie.replace("token=", ""),
        data.id
      );

      // Extraer años únicos
      const uniqueYears = Array.from(
        new Set(res.data.map((objeto) => objeto.year))
      );

      // Mostrar datos por defecto
      const filteredData = res.data.filter(
        (yearProduct) => yearProduct.year === 2023
      );
      const organizeData = filteredData.map((data) => ({
        name: `Mes: ${String(data.month)}`,
        ...data.products,
      }));
      setGraphicData(organizeData);

      // Almacenamos los años y data desorganizada
      setDisorganizedData(res.data);
      setFilterYears(uniqueYears);
    } catch (error) {
      console.log(error);
    }
  }

  // Traemos la data con un effect en primera instancia
  useEffect(() => {
    getDataGraphic();
  }, [data]);

  // Funcion que nos permite cambiar la data dependiendo del año
  const selectedYear = (year) => {
    const filteredData = disorganizedData.filter(
      (yearProduct) => yearProduct.year === year
    );
    const organizeData = filteredData.map((data) => ({
      name: `Mes: ${String(data.month)}`,
      ...data.products,
    }));
    setGraphicData(organizeData);
  };

  return (
    <>
      <div className="mt-3 flex">
        <div>
          <div className="mb-8 mt-[7px]">
            <p className="text-gray-800 text-2xl font-semibold ml-5">
              Producción de {data.name ? data.name : "Java"}
            </p>
          </div>
          <div className="-m-2 mt-5">
            <BarChart
              width={770}
              height={340}
              data={graphicData}
              margin={{
                top: 5,
                right: 30,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="P1"
                fill="#DC2626"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
              <Bar
                dataKey="P2"
                fill="#EF4444"
                activeBar={<Rectangle fill="gold" stroke="blue" />}
              />
              <Bar
                dataKey="P3"
                fill="#F87171"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
              <Bar
                dataKey="P4"
                fill="#FCA5A5"
                activeBar={<Rectangle fill="gold" stroke="blue" />}
              />
            </BarChart>
          </div>
        </div>
        <div>
          <p className="text-gray-800 text-2xl font-semibold ml-2 mt-2 mb-8">
            Años
          </p>
          <div className="ml-1 w-full max-h-[320px] overflow-scroll">
            {filterYears.map((year, i) => (
              <p
                key={i}
                className="bg-gray-100 p-2 text-center rounded-md mb-1 cursor-pointer hover:bg-gray-200"
                onClick={() => selectedYear(year)}
              >
                {year}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};