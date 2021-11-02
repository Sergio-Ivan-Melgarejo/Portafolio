"use strict"
//Importaciones

//LocalStorage
import { body, avatarMenu, avatarCogiguracion, avatarNombre } from "./nav-superior.js"

//Declaraciones


//funciones
const generaNumeroAlAzar = (numero) => {
    let numeroAzar = Math.round(Math.random() * numero) || numero;
    return numeroAzar
}

//Elige al azar un fondo de imagen al entrar si no hay guardados
const cargarDeFondo = () =>{
    let src = localStorage.getItem("imagenDeFondo");
    if ( !src ) {   
        let numeroAzar = generaNumeroAlAzar(8);
        body.style.backgroundImage = `url(./images/imagenes-de-fondo/${(numeroAzar)}.jpg)`
    }
    else {
        body.style.backgroundImage = `url(${src})`
    }
}

//Elige al azar un avatar si no hay guardados
const cargarDeAvatar = () =>{
    let genero = localStorage.getItem("avatarGenero");

    if ( !genero ) {
        let generoAlAzar = generaNumeroAlAzar(2);
        generoAlAzar == 1 ? generoAlAzar = "mujer" : generoAlAzar = "hombre";
        genero = generoAlAzar;
    }

    avatarMenu.setAttribute("src", `./images/avatares/avatar-${genero}__blanco.svg`);
    avatarCogiguracion.setAttribute("src", `./images/avatares/avatar-${genero}__blanco.svg`);
}


// -- ./nav-superior.js --
cargarDeAvatar()
avatarNombre.textContent = localStorage.getItem( "nombreAvatar" ) || "Anonimo001";
cargarDeFondo()



