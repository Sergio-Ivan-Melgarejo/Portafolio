"use stric"

// Importaciones
import { main, comprobarAbiertosMain } from "./main.js";
import { contraerHeader } from "./code-inicio.js";

// Declaraciones

export const body = document.getElementById("body");
// Abrir / cerrar configuracion
const abrirCof = document.getElementById("abrir-cof");
const cerrarCof = document.getElementById("cerrar-cof");
export const navSuperior = document.getElementById("nav-superior");
// Opciones
const opciones = document.getElementById("nav-superior__opciones");
const opcionesUsuario = document.querySelector(".li__usuario");
const opcionesImagenDeFondo = document.querySelector(".li__imagen-de-fondo");
const opcionesTemas = document.querySelector(".li__temas");
const opcionesFuente = document.querySelector(".li__fuente");
// Avatares
export const avatarMenu = document.querySelector(".nav-inferior-imagen");
export const avatarCogiguracion = document.querySelector(".nav-superior__avatar-imagen");
export const nombreUsuarioMenuConf = document.querySelector(".avatar-nombre__span");
const avatarConfirmar = document.querySelector(".fa-check-circle");
export const nombreUsuario = document.getElementById("nombreDeUsuario");
// Imagen de fondo
export const preImagen1 = document.getElementById("IDF1");
export const preImagen2 = document.getElementById("IDF2");
export const preImagen3 = document.getElementById("IDF3");
// src = numero del data que mostrara en los predondos del menu configuracion
let src1 = 0,
    src2 = 1,
    src3 = 2,
    cantidadDeImg = 14;

// Temas
let memorizacion = "";

// Funciones

const guardarDatoLocalStora = (nombreDeDato, dato) => {
    localStorage.setItem(nombreDeDato, dato)
}

const cambiarAvatar = (genero) => {
    let color = localStorage.getItem("tema") || "tema-predeterminado";
    avatarMenu.setAttribute("src",`./imagenes/avatares/avatar-${genero}__${color}.svg`);
    avatarCogiguracion.setAttribute("src",`./imagenes/avatares/avatar-${genero}__${color}.svg`);
}

export const cambiarNombreAvatar = () => {
    // permite editar directamente el nombre de avatar
    nombreUsuarioMenuConf.setAttribute("contenteditable", true);
    nombreUsuarioMenuConf.style = "border-bottom-width : 2px; opacity: 1; padding: .5em 1em; line-height: 2em; margin-left: .5em";
    avatarConfirmar.classList.add("boton-confirmar-editar");
}

const comfirmarNombreAvatar = () => {
    let dato = nombreUsuarioMenuConf.textContent;
    localStorage.setItem("nombreAvatar", dato)
    nombreUsuarioMenuConf.removeAttribute("contenteditable");
    nombreUsuarioMenuConf.removeAttribute("style");
    avatarConfirmar.classList.remove("boton-confirmar-editar");

    if ( dato.length > 15 ) dato = (dato.slice( 0, 15 ) + "...");
    nombreUsuario.textContent = dato;
}

const cambiarImagenDeFondo = (src) => {
    main.style.backgroundImage = `url(${src})`
}

const guardarImagenDeFondo = (src) => {
    localStorage.setItem("imagenDeFondo", src)
}

// Comprueba que no pase el carrucel el numero de imagen que hay y a??ade las src
const configuracionCambiarMiniImagenes = async (direcion) => {

    if (direcion === "der")  {
        src1 = src2;
        src2 = src3;
        src3++ 
    }
    if (direcion === "izq")  {
        src3 = src2; 
        src2 = src1; 
        src1--
    }

    // si pasa la cantidad de imagenes vuelve al principio y viseversa
    if ( src1 < 0 )  src1 = cantidadDeImg -1 ;
    if ( src3 > cantidadDeImg -1 )  src3 = 0 ;

    let preSRC1= `./imagenes/imagenes-de-fondo/${src1}.jpg`;
    let preSRC2 = `./imagenes/imagenes-de-fondo/${src2}.jpg`;
    let preSRC3=  `./imagenes/imagenes-de-fondo/${src3}.jpg`;

    preImagen1.setAttribute("src", preSRC1 )
    preImagen2.setAttribute("src", preSRC2 )
    preImagen3.setAttribute("src", preSRC3 )

    //guarda imagen de fondo del src2
    guardarImagenDeFondo(preSRC2);
    cambiarImagenDeFondo(preSRC2);
}

//guarda el tema elegido en local stora y remueve el ultimo elejido del body
const cambiarTema = ( tema ) => {
    let temaGuardado = localStorage.getItem("tema");

    //0= entra por unica vez, SI SE REPITE LO GUARDADO CON LO CLICKEADO, elimina todo incluso lo almacenado en localStorage
    if ( temaGuardado === tema && memorizacion === "" ) {
        body.classList.replace( tema, "tema-predeterminado" );
        localStorage.setItem( "tema", "tema-predeterminado" );
        memorizacion = "tema-predeterminado";
    } 
    //1= entra por unica vez, SI LO CLICKEADO NO SE REPITE, elimina todo incluso lo almacenado en localStorage
    else if ( temaGuardado && memorizacion === "" ) {
        body.setAttribute( "class" , `body ${tema}` )
        localStorage.setItem( "tema", tema );
        memorizacion = tema;
    } 
    //2 = entra por primera vez a la pagina y unica vez
    else if ( memorizacion === "" ) {
        body.classList.remove( "tema-predeterminado" )
        body.classList.add( tema );
        localStorage.setItem( "tema", tema );
        memorizacion = tema;
    }
    //3 = entra si vuelve a tocar el mismo boton, reseteando y poniendo el tema predeterminado
    else if ( memorizacion === tema ) {
        body.classList.replace( tema, "tema-predeterminado" );
        localStorage.setItem( "tema", "tema-predeterminado" );
        memorizacion = "tema-predeterminado";
    }
    //4 = entra si pasa de tema a otro tema
    else { 
        body.classList.add( tema );
        body.classList.remove( memorizacion );
        localStorage.setItem( "tema", tema );
        memorizacion = tema;
    }
    cambiarTemaDelAvatar();
}

//si no hay genero elejido toma el generado al azar
const cambiarTemaDelAvatar = () => {
    let genero = localStorage.getItem( "avatarGenero" );
    let color = localStorage.getItem( "tema" );

    if ( !genero ) {
        genero = avatarMenu.getAttribute( "src" ).indexOf("mujer");
        genero == -1 ? genero = "hombre" : genero = "mujer";
    }

    avatarMenu.setAttribute("src",`./imagenes/avatares/avatar-${genero}__${color}.svg`);
    avatarCogiguracion.setAttribute("src",`./imagenes/avatares/avatar-${genero}__${color}.svg`);
}

const cambiarFuente = (evento) => {
    let fuente = evento.getAttribute("class").split(" ")[1];
    switch( fuente ) {
        case "fuente__muy-peque??o":
            fuente = "8px"
            break
        case "fuente__peque??o":
            fuente = "12px"
            break
        case "fuente__mediano":
            fuente = "16px"
            break
        case "fuente__grande":
            fuente = "20px"
            break
        case "fuente__muy-grande":
            fuente = "24px"
            break
    }
    body.style.fontSize = fuente;
    localStorage.setItem("fuente", fuente)
}

//Event
addEventListener("DOMContentLoaded", () => {

    abrirCof.addEventListener("click", () => {
        navSuperior.classList.remove("cerrados");

        contraerHeader()
    });

    cerrarCof.addEventListener("click", () => {
        navSuperior.classList.add("cerrados");

        comprobarAbiertosMain()
    });

    //opciones
    opciones.addEventListener("click", (e) => {
        let evento = e.target;

        //opciones
        if ( evento.classList.contains("fa-user") ) {
            opcionesUsuario.classList.toggle("cerrados");
            opcionesImagenDeFondo.classList.add("cerrados");
            opcionesTemas.classList.add("cerrados");
            opcionesFuente.classList.add("cerrados");
        }
        if ( evento.classList.contains("fa-images") ) {
            opcionesImagenDeFondo.classList.toggle("cerrados");
            opcionesUsuario.classList.add("cerrados");
            opcionesTemas.classList.add("cerrados");
            opcionesFuente.classList.add("cerrados");
        }
        if ( evento.classList.contains("fa-text-height") ) {
            opcionesFuente.classList.toggle("cerrados"); 
            opcionesUsuario.classList.add("cerrados");
            opcionesTemas.classList.add("cerrados");
            opcionesImagenDeFondo.classList.add("cerrados"); 
        }
        if ( evento.classList.contains("fa-palette") ) {
            opcionesTemas.classList.toggle("cerrados"); 
            opcionesImagenDeFondo.classList.add("cerrados");
            opcionesUsuario.classList.add("cerrados");
            opcionesFuente.classList.add("cerrados");
        }

        //sub opcion usuario
        if ( evento.classList.contains("fa-user-edit")) {
            cambiarNombreAvatar();
        }
        else if ( evento.classList.contains("fa-venus") ) {
            guardarDatoLocalStora("avatarGenero","mujer");
            cambiarAvatar("mujer");
        }
        else if ( evento.classList.contains("fa-mars") ) {
            guardarDatoLocalStora("avatarGenero","hombre");
            cambiarAvatar("hombre");  
        } 

        //sub opcion imagen de fondo
        if ( evento.classList.contains("nav-superior__imagen-de-fondo") ) {
            if ( evento.getAttribute("id") === "IDF1" ) configuracionCambiarMiniImagenes("izq")
            if ( evento.getAttribute("id") === "IDF2" ) configuracionCambiarMiniImagenes()
            if ( evento.getAttribute("id") === "IDF3" ) configuracionCambiarMiniImagenes("der")
        }
        else if ( evento.classList.contains("imagenes-de-fondo__flecha-izq") ) {
            configuracionCambiarMiniImagenes("der");
        }
        else if ( evento.classList.contains("imagenes-de-fondo__flecha-der") ) {
            configuracionCambiarMiniImagenes("izq");
        }

        //tema noche
        if ( evento.classList.contains("fa-moon") ) {
            cambiarTema("tema-noche");
        }

        //tema lectura
        if ( evento.classList.contains("fa-book-open") ) {
            cambiarTema("tema-lectura");
        }

        //sub opcion fuentes
        if ( evento.classList.contains("fuente__fuentes") ) {
            cambiarFuente(evento);
        }

        //sub opcion temas
        if ( evento.classList.contains("temas__boton") ) {
            let color = evento.getAttribute("class").split(" ")[1];
            cambiarTema(color);
        }
    });

    avatarConfirmar.addEventListener("click", () => {
        comfirmarNombreAvatar()
    });  
})