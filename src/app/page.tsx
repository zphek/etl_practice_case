"use client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface Data{
  fecha: string,
  producto: string,
  cantidad: string,
  monto: string,
  id: string,
  total_amount: string,
  discount: string,
  net_amount: string,
  profit_margin: string
}


export default function Home() {
  const [data, setData] = useState<Data[]>([])

  const notify = (notiType: number) => {
    if(notiType == 1){
        return toast.success("The register was successfully created!",  {
            position: "top-center"
        });
    } else {
        return toast.error("The register was not created.",  {
            position: "top-center"
        });
    }
}

  async function handleClick(option: string){
    const response:[] = await axios({
      method: "post",
      url: "http://localhost:3000/api/data",
      data: {
        extract_from: option
      }
    })

    let {data}:any = response;
    if(data){
      console.log(data);
      setData(data);
    }
  }

  function handleSave() {
    if (data.length === 0) {
      notify(2); // Notificar si no hay datos para guardar
      return;
    }
  
    axios({
      method: "post",
      url: "http://localhost:3000/api/data",
      data: {
        data: data // Enviar los datos en la estructura esperada por el backend
      }
    })
      .then(response => {
        console.log(response);
        notify(1); // Notificar el éxito
        setData([]); // Limpiar los datos después de guardar exitosamente
      })
      .catch(err => {
        console.error(err); // Registrar cualquier error en la consola
        notify(2); // Notificar si hay un error al guardar
      });
  }
  
  return (
    <main className="p-10 px-72 flex flex-col">
  <h2 className="text-2xl font-bold">EXTRACT FROM</h2>
  <div className="flex gap-x-4 mt-5 transition-all">
    <button className="px-5 py-3 font-bold bg-slate-300 rounded-md hover:bg-slate-100" onClick={()=> handleClick("endpoints") }>ENDPOINTS</button>
    <button className="px-5 py-3 font-bold bg-slate-300 rounded-md hover:bg-slate-100" onClick={()=> handleClick("databases") }>DATABASES</button>
    <button className="px-5 py-3 font-bold bg-slate-300 rounded-md hover:bg-slate-100" onClick={()=> handleClick("csv") }>CSV FILES</button>
    <button className="px-5 py-3 font-bold bg-slate-300 rounded-md hover:bg-slate-100" onClick={()=> handleClick("ALL") }>ALL SOURCES</button>
  </div>

  <h2 className="text-2xl font-bold mt-10">DATA</h2>

  {/* Aquí se forma la tabla */}
  <table className="mt-5 max-h-[100px] overflow-y-auto">
  <thead>
    <tr>
      <th>Fecha</th>
      <th>Producto</th>
      <th>Cantidad</th>
      <th>Monto</th>
      <th>ID</th>
      <th>Total Amount</th>
      <th>Discount</th>
      <th>Net Amount</th>
      <th>Profit Margin</th>
    </tr>
  </thead>
  <tbody>
    {/* Mapeo de los elementos de data para formar filas de tabla */}
    {data.map((item, index) => (
      <tr key={index}>
        <td className="border px-4 py-2">{item.fecha}</td>
        <td className="border px-4 py-2">{item.producto}</td>
        <td className="border px-4 py-2">{item.cantidad}</td>
        <td className="border px-4 py-2">{item.monto}</td>
        <td className="border px-4 py-2">{item.id}</td>
        <td className="border px-4 py-2">{item.total_amount}</td>
        <td className="border px-4 py-2">{item.discount}</td>
        <td className="border px-4 py-2">{item.net_amount}</td>
        <td className="border px-4 py-2">{item.profit_margin}</td>
        <td className="border px-4 py-2">
          <button
            className="bg-red-500 text-white px-3 py-1 rounded-md font-semibold"
            onClick={() => {
              const newData = [...data];
              newData.splice(index, 1); // Remove the item at index
              setData(newData); // Update the state
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>


  <button className="bg-blue-500 py-5 text-white rounded-lg font-bold text-xl mt-5" onClick={handleSave}>SAVE EXTRACTED DATA</button>
   <ToastContainer/>
</main>

  );
}
