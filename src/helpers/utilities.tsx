import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import conf from "../pages/api/configuration.json";
import { NextApiRequest, NextApiResponse } from "next";
import connection from "../pages/api/connection";
import axios from "axios";

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

export class utilities{

    isValidData(data: any): boolean {
        // Verificar que todos los campos sean de tipo string
        if (
            typeof data.fecha !== "string" ||
            typeof data.producto !== "string" ||
            typeof data.cantidad !== "string" ||
            typeof data.monto !== "string" ||
            typeof data.id !== "string" ||
            typeof data.total_amount !== "string" ||
            typeof data.discount !== "string" ||
            typeof data.net_amount !== "string" ||
            typeof data.profit_margin !== "string"
        ) {
            return false;
        }
    
        // Verificar que cantidad y id puedan ser parseados a números enteros
        if (isNaN(parseInt(data.cantidad)) || isNaN(parseInt(data.id))) {
            return false;
        }
    
        // Verificar que total_amount, discount, net_amount y profit_margin puedan ser parseados a números decimales
        if (
            isNaN(parseFloat(data.total_amount)) ||
            isNaN(parseFloat(data.discount)) ||
            isNaN(parseFloat(data.net_amount)) ||
            isNaN(parseFloat(data.profit_margin))
        ) {
            return false;
        }
    
        // Verificar que no hay letras en campos que no deberían contenerlas
        const numericFields = ["cantidad", "id", "total_amount", "discount", "net_amount", "profit_margin"];
        for (const field of numericFields) {
            if (/\D/.test(data[field])) {
                return false;
            }
        }
    
        return true;
    }

    
    extractDataFromCSV(): Promise<Data[]> {
        return new Promise((resolve, reject) => {
          const promises: Promise<Data[]>[] = [];
    
          fs.readdir(conf.root_directory, (err, files) => {
            if (err) {
              console.error("Error al leer el directorio:", err);
              reject(err);
              return;
            }
    
            files.forEach((file) => {
              if (path.extname(file).toLowerCase() === ".csv") {
                promises.push(this.processCSVFile(path.join(conf.root_directory, file)));
              }
            });
    
            Promise.all(promises)
              .then((results) => {
                const allResults = results.reduce((acc, curr) => acc.concat(curr), []);
                resolve(allResults);
              })
              .catch((error) => {
                console.error("Error al procesar los archivos CSV:", error);
                reject(error);
              });
          });
        });
      }
    
     processCSVFile(filePath: string): Promise<Data[]> {
        return new Promise((resolve, reject) => {
          const results: Data[] = [];
    
          fs.createReadStream(filePath)
            .pipe(csvParser())
            .on("data", (data: any) => {
              results.push(data as Data);
            })
            .on("end", () => {
              resolve(results);
            })
            .on("error", (error) => {
              reject(error);
            });
        });
      }
    
      async queryGuestDatabases(): Promise<any[]> {
        const promises = conf.guest_databases.map(database => {
            return connection(database.name, database.credentials.username, database.credentials.password)
              .query("SELECT * FROM factura;");
          });
      
        const responses = await Promise.all(promises);
      
        const results = responses.flatMap(response => response[0]); 
          
        return results;
      }


      async getFromEndpoints(): Promise<any[]> {
        if(!conf.data_extraction_endpoints){
            console.log("No hay endpoints para extraer data.");    
        }
        try {
            const responses = await Promise.all(conf.data_extraction_endpoints.map(async (endpoint) => {
                const { data } = await axios.get(endpoint.url);
                return data;
            }));
        
            return responses[0];
        } catch (error) {
            console.error("Error al obtener datos de los endpoints:", error);
            throw error;
        }
    }
}