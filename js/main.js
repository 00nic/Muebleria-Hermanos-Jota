import { catalogo, cargarCatalogo } from "./catalogo.js";

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
    }catch(error){
        console.error("Error",error);
    }
}

document.addEventListener('DOMContentLoaded', iniciarAplicacion);