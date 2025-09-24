import { catalogo} from "./arrayCatalogo.js";
import { cargarCatalogo, filtrarCatalogo } from "./catalogoProductos.js";

function cargaAsincronica(){
    return new Promise((completado) =>{
        console.log("Simulando carga asincronica");

        setTimeout(() =>{
            console.log("Carga completada!");
            completado(); 
        },3000);
    });
}

async function iniciarAplicacion(){
    console.log("Iniciando");

    try{
        await cargaAsincronica(); 
        cargarCatalogo(); 
        console.log("Catalogo renderizado | ", catalogo.length, ":productos");

        const buscador = document.getElementById("buscador");
                buscador.addEventListener("input", (event) => {
                    filtrarCatalogo(event.target.value);
                });

    }catch(error){
        console.error("Error",error);
    }
}

document.addEventListener('DOMContentLoaded', iniciarAplicacion);