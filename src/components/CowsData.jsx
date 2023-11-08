// Importaciones de React
import { useState, useEffect } from "react";

// Librerías Externas y Locales
import { getCowsRequest } from "../services/request";
import * as XLSX from "xlsx";
import DataTable from "react-data-table-component";

// Iconos
import { Trash2, Pencil, Download } from "lucide-react";

// Componente Complementario
export const CowsData = ({
  sendDataToParent,
  activateEffect,
  resetActivateEffect,
  logged
}) => {
  // ------------- Proceso para traer los datos de las Vaquitas en la API -------------
  // Definimos los estados para almacenar las Vaquitas
  const [cowData, setCowData] = useState([]);

  // ------------- Establecemos los estados para filtrar datos -------------
  // Buscar datos
  const [search, setSearch] = useState("");
  // Datos filtrados
  const [filter, setFilter] = useState([]);
  // Carga de Datos
  const [pending, setPending] = useState(true);

  // Definimos una función para traer los datos de las vaquitas en la API
  async function getData() {
    try {
      const res = await getCowsRequest(document.cookie.replace("token=", ""));
      setCowData(res.data);
      setFilter(res.data);
      setPending(false);
    } catch (error) {
      console.log(error);
    }
  }

  // Definimos un useEffect para obtener los datos en primera instancia
  useEffect(() => {
      setTimeout(() => {
        getData()
      }, 5000);
  }, [logged])
  
  // Definimos un useEffect para actualizar los datos dependiendo del Activate y Reset
  useEffect(() => {
      getData()
      resetActivateEffect(false)
  }, [activateEffect, resetActivateEffect]);

  // Definimos una función para mandar los datos al padre dependiendo de la acción a realizar
  function onSelectedCow(cowCode, action) {
    // Enviamos los datos del elemento seleccionado al componente padre
    const selectedCow = cowData.find((cow) => cow.cow_code === cowCode);
    if (action === "edit") {
      sendDataToParent(selectedCow, action);
    } else {
      sendDataToParent(selectedCow.id, action);
    }
  }

  // Columnas del DataTable
  const columns = [
    {
      name: "Código",
      selector: (row) => row.cow_code,
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row) => row.cow_name,
      sortable: true,
    },
    {
      name: "Raza",
      selector: (row) => row.cow_breed,
      sortable: true,
    },
    {
      name: "Peso",
      selector: (row) => row.cow_weight,
      sortable: true,
    },
    {
      name: "Partos",
      selector: (row) => row.cow_childs,
      sortable: true,
    },
    {
      name: "Acción",
      selector: (row) => (
        <div className="flex gap-[5px]">
          <button
            className="text-white bg-cyan-500 p-[3px] rounded-md hover:bg-cyan-700 duration-75"
            onClick={() => onSelectedCow(row.cow_code, "edit")}
          >
            <Pencil size={15} />
          </button>
          <button
            className="text-white bg-red-600 p-[3px] rounded-md hover:bg-red-700 duration-75"
            onClick={() => onSelectedCow(row.cow_code, "delete")}
          >
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ];

  // Usamos useEffect para filtrar los datos
  useEffect(() => {
    const result = cowData.filter((cow) => {
      return cow.cow_name.toLowerCase().match(search.toLocaleLowerCase());
    });
    setFilter(result);
  }, [search]);

  // Definimos los estilos del Header de la DataTable
  const tableHeaderStyle = {
    headCells: {
      style: {
        backgroundColor: "#c05621",
        fontSize: "15px",
        color: "#FFFFFF",
        fontWeight: "600",
      },
    },
    rows: {
      style: {
        minHeight: "50px", // override the row height
      },
    },
  };

  // Configuramos la paginación de la DataTable en español
  const paginationComponentOptions = {
      rowsPerPageText: 'Filas por página',
      rangeSeparatorText: 'de',
      selectAllRowsItem: true,
      selectAllRowsItemText: 'Todos',
  };

  // Función que permite exportar los registros en formato XLSX
  const converToXLSX = () => {
    const ws = XLSX.utils.json_to_sheet(cowData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const fileName = 'cowsData.xlsx';
    XLSX.writeFile(wb, fileName)
  }

  return (
    <div className="max-h-[480px] overflow-scroll rounded-md">
      <DataTable
        customStyles={tableHeaderStyle}
        columns={columns}
        data={filter}
        pagination
        // selectableRowsHighlight
        progressPending={pending}
        paginationComponentOptions={paginationComponentOptions}
        fixedHeader={true}
        fixedHeaderScrollHeight="360px"
        subHeader
        subHeaderComponent={
          <div className="flex w-full items-center mb-3 justify-between">
            <p className="font-Lato text-lg font-semibold text-slate-800">
              Tabla de Datos
            </p>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Buscar"
                value={search}
                className="text-md font-Lato text-gray-800 bg-white placeholder-gray-500 pl-2 pr-2 border-2 border-slate-200 py-1 focus:outline-none focus:border-slate-400 rounded-md"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button 
                className="ml-4 text-gray-400 p-1 rounded-md hover:bg-slate-200 duration-100"
                onClick={converToXLSX}>
                <Download size={18}/>
              </button>
            </div>
          </div>
        }
      />
    </div>
  );
};
