"use client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

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
  <table className="mt-5">
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
    <tbody className="max-h-[100px] overflow-y-auto">
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
              </tr>
            ))}
    </tbody>
  </table>

  <button className="bg-blue-500 py-5 text-white rounded-lg font-bold text-xl mt-5">SAVE EXTRACTED DATA</button>
</main>

  );
}
