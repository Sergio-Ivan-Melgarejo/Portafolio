"use strict"

//declaraciones
const header = document.getElementById("header");
const body = document.getElementById("body")

//funciones
//Elige al azar un fondo de imagen al entrar
const cambioDeFondo = () =>{
    let numeroAzar = Math.round(Math.random() * 8) || 8;
    body.style.backgroundImage = `url(./images/imagenes-de-fondo/${numeroAzar}.jpg)`
}

//eventos
addEventListener("DOMContentLoaded", () => { cambioDeFondo() })


//codigo
