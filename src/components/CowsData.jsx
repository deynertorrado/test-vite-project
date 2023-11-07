// Importaciones de React
import { useState, useEffect } from "react";

// Librerías Externas y Locales
import { getCowsRequest } from "../services/request";
import DataTable from "react-data-table-component";

// Iconos
import { Trash2, Pencil } from "lucide-react";

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
      }, 1000);
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
          <div className="flex w-full gap-5 items-center mb-3">
            <p className="font-Lato text-lg font-semibold text-slate-800">
              Tabla de Datos
            </p>
            <input
              type="text"
              placeholder="Filtar por nombre"
              value={search}
              className="text-md font-Lato text-gray-800 bg-white placeholder-gray-500 shadow-sm pl-2 pr-2 border-2 border-gray-200 py-1 focus:outline-none focus:border-slate-500 rounded-lg"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        }
      />
    </div>
  );
};
