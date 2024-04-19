import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import conf from "./configuration.json";
import { NextApiRequest, NextApiResponse } from "next";
import connection from "./connection";
import { utilities } from "@/helpers/utilities";

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!fs.existsSync(conf.root_directory)) {
    fs.mkdirSync(conf.root_directory);
  }

  const { extract_from, send, data }: {
    extract_from: string;
    send: boolean;
    data: Data[];
  } = req.body;

  const util = new utilities();

  if (!send) {
    let results = [];
    switch (extract_from) {
      case "ALL":
            // Ejecutar todas las operaciones asincrónicas en paralelo
            const [csvData, guestDatabases, endpointsData] = await Promise.all([
                util.extractDataFromCSV(),
                util.queryGuestDatabases(),
                util.getFromEndpoints()
            ]);

            results.push(...csvData, ...guestDatabases, ...endpointsData);

            res.json(results);
        break;

      case "databases":
            util.queryGuestDatabases().then(response=>{
                res.json(response);
            })
        break;

      case "endpoints":
            util.getFromEndpoints()
            .then(response=>{
                res.json(response);
            })
        break;

      case "csv":
        try {
          const results = await util.extractDataFromCSV();
          res.json(results);
        } catch (error) {
          console.error("Error al extraer datos del CSV:", error);
          res.status(500).json({ error: "Error interno del servidor" });
        }
        break;
    }
  }

  if (data) {
    const db = connection(
        conf.host_database.name,
        conf.host_database.credentials.username,
        conf.host_database.credentials.password
    );

    try {
      data.forEach((element) => {
        const query = `INSERT INTO factura (fecha, producto, cantidad, monto, id, total_amount, discount, net_amount, profit_margin) VALUES ('${element.fecha}', '${element.producto}', ${parseInt(element.cantidad)}, ${parseFloat(element.monto)}, ${parseInt(element.id)}, ${parseFloat(element.total_amount)}, ${parseFloat(element.discount)}, ${parseFloat(element.net_amount)}, ${parseFloat(element.profit_margin)});`;
        // Ejecutar la consulta
        db.query(query)
            .then((result) => {
                console.log("Datos insertados correctamente en la base de datos.");
            })
            .catch((error) => {
                console.error("Error al insertar datos en la base de datos:", error);
            });
      });

      res.json({
        error: false
      })
    } catch (error) {
      res.json({
        error: true
      })
    }
}

}
