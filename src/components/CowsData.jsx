// Importaciones de React
import { useState, useEffect } from "react";

// Librerías Externas y Locales
import { getCowsRequest } from "../services/request";
import DataTable from "react-data-table-component";

// Iconos
import {
    Trash2,
    Pencil
  } from "lucide-react";

export const CowsData = ({ sendDataToParent, updateTableHandler1, updateTableHandler2 }) => {

    // ------------- Proceso para traer los datos de las Vaquitas en la API -------------
    // Definimos los estados para almacenar las Vaquitas
    const [cowData, setCowData] = useState([]);
    // Establecemos los estados para filtrar datos
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState([])
    const [pending, setPending] = useState(true)

    // Traemos los datos de las vaquitas en la API
    useEffect(() => {
        async function getData() {
            try {
                const res = await getCowsRequest(document.cookie.replace('token=', ''))
                setCowData(res.data)
                setPending(false)
                setFilter(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [updateTableHandler1, updateTableHandler2, onSelectedCow]);

    function onSelectedCow(cowCode, action) {
        // Enviamos los datos del elemento seleccionado al padre
        const selectedCow = cowData.find(cow => cow.cow_code === cowCode)
        if (action === 'edit') {
            sendDataToParent(selectedCow, action)
        } else {
            sendDataToParent(selectedCow.id, action)
        }
    }

    // Columnas de la tabla de datos
    const columns = [
        {
            name: 'Código',
            selector:(row)=>row.cow_code,
            sortable: true
        },
        {
            name: 'Nombre',
            selector:(row)=>row.cow_name,
            sortable: true
        },
        {
            name: 'Raza',
            selector:(row)=>row.cow_breed,
            sortable: true
        },
        {
            name: 'Peso',
            selector:(row)=>row.cow_weight,
            sortable: true
        },
        {
            name: 'Partos',
            selector:(row)=>row.cow_childs,
            sortable: true
        },
        {
            name: 'Acción',
            selector:(row)=>(
                <div className="flex gap-[5px]">
                    <button 
                        className="text-white bg-cyan-500 p-[3px] rounded-md hover:bg-cyan-700 duration-75"
                        onClick={() => onSelectedCow(row.cow_code, 'edit')}><Pencil size={15}/></button>
                    <button 
                        className="text-white bg-red-600 p-[3px] rounded-md hover:bg-red-700 duration-75"
                        onClick={() => onSelectedCow(row.cow_code, 'delete')}><Trash2 size={15}/></button>
                </div>
            )
        }
    ]

    // Usamos useEffect para filtrar los datos
    useEffect(() => {
        const result = cowData.filter((cow) => {
            return cow.cow_name.toLowerCase().match(search.toLocaleLowerCase())
        })
        setFilter(result)
    }, [search]);

    // Definimos los estilos del Header de la DataTable
    const tableHeaderStyle = {
        headCells: {
            style: {
                backgroundColor: '#1E293B',
                fontSize: '15px',
                color: '#FFFFFF',
                fontWeight: '600'
            }
        },
        rows: {
            style: {
                minHeight: '50px', // override the row height
            }
        }
    }

  return (
    <div className="max-h-[480px] overflow-scroll rounded-md">			 				
        <DataTable
            customStyles={tableHeaderStyle}
            columns={columns}
            data={filter}
            pagination
            selectableRowsHighlight
            progressPending={pending}
            subHeader
                subHeaderComponent = {
                <div className="flex w-full gap-5 items-center mb-3">
                    <p className="font-Lato text-lg font-semibold text-slate-800">Tabla de Datos</p>
                    <input 
                    type="text"
                    placeholder="Filtar..."
                    value={search}
                    className="text-md font-Lato text-gray-800 bg-white placeholder-gray-500 shadow-sm pl-2 pr-2 border-2 border-gray-200 py-1 focus:outline-none focus:border-slate-500 rounded-lg"
                    onChange={(e)=>setSearch(e.target.value)}/>
                </div>
                }
        />
    </div>	
  )
}
