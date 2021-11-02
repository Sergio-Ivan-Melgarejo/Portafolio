"use stric"

export const body = document.getElementById("body");
const abrirCof = document.getElementById("abrir-cof");
const navSuperior = document.getElementById("nav-superior");
const cerrarCof = document.getElementById("cerrar-menu-sup");

//opciones
const opciones = document.getElementById("nav-superior__opciones");
const opcionesUsuario = document.querySelector(".li__usuario");
const opcionesImagenDeFondo = document.querySelector(".li__imagen-de-fondo");
const opcionesTemas = document.querySelector(".li__temas");
const opcionesFuente = document.querySelector(".li__fuente");
//avatares
export const avatarMenu = document.querySelector(".nav-inferior-imagen");
export const avatarCogiguracion = document.querySelector(".nav-superior__avatar-imagen");
export const avatarNombre = document.querySelector(".avatar-nombre__span");
const avatarConfirmar = document.querySelector(".fa-check-circle");
// -- Data/Imagenes-de-fondo.json --
let dataIDF = false;

//Funciones

const guardarDatoLocalStora = (nombreDeDato, dato) => {
    localStorage.setItem(nombreDeDato, dato)
}

export const cambiarAvatar = (genero) => {
    avatarMenu.setAttribute("src",`./images/avatares/avatar-${genero}__blanco.svg`);
    avatarCogiguracion.setAttribute("src",`./images/avatares/avatar-${genero}__blanco.svg`);
}

const cambiarNombreAvatar = () => {
    //permite editar directamente el nombre de avatar
    avatarNombre.setAttribute("contenteditable", true);
    avatarNombre.style = "border-bottom-width : 2px; opacity: 1; ";
    avatarConfirmar.style.display = "block";
}

const comfirmarNombreAvatar = () => {
    let dato = avatarNombre.textContent;
    localStorage.setItem("nombreAvatar", dato)
    avatarNombre.removeAttribute("contenteditable");
    avatarNombre.style = "border-bottom-width : 0px; opacity: .7; ";
    avatarConfirmar.removeAttribute("style");
}

const cambiarImagenDeFondo = (evento) => {
    let src = "./" + evento.getAttribute("src");
    body.style.backgroundImage = `url(${src})`
    localStorage.setItem("imagenDeFondo", src)
}

/* obeter ./Data/Imagenes-de-fondo */
const obtenerIDF = () => {
    return fetch("./Data/Imagenes-de-fondo.json")
    .then( res  => {
        return res.json()
    })
    .then( res => {
        res;
    })
}

const configuracionCambiarMiniImagenes = async (direcion) => {
    if ( !dataIDF ) {
        dataIDF = await obtenerIDF();
    }       
    else {

    }
}

//Event

abrirCof.addEventListener( "click", () => {
    navSuperior.style.animation = "abrirNavSup 2s forwards";
})

cerrarCof.addEventListener( "click", () => {
    navSuperior.style.animation = "cerrarNavSup 2s forwards";
})

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
        opcionesImagenDeFondo.classList.toggle("cerrados") 
        opcionesUsuario.classList.add("cerrados");
        opcionesTemas.classList.add("cerrados");
        opcionesFuente.classList.add("cerrados");
    }
    if ( evento.classList.contains("fa-text-height") ) {
        opcionesFuente.classList.toggle("cerrados") 
        opcionesUsuario.classList.add("cerrados");
        opcionesTemas.classList.add("cerrados");
        opcionesImagenDeFondo.classList.add("cerrados"); 
    }
    if ( evento.classList.contains("fa-palette") ) {
        opcionesTemas.classList.toggle("cerrados") 
        opcionesImagenDeFondo.classList.add("cerrados");
        opcionesUsuario.classList.add("cerrados");
        opcionesFuente.classList.add("cerrados");
    }

    //sub opcion usuario
    if ( evento.classList.contains("fa-user-edit") ) {
        cambiarNombreAvatar()
    }
    else if ( evento.classList.contains("fa-venus") ) {
        guardarDatoLocalStora("avatarGenero","mujer");
        cambiarAvatar("mujer")
    }
    else if ( evento.classList.contains("fa-mars") ) {
        guardarDatoLocalStora("avatarGenero","hombre");
        cambiarAvatar("hombre")  
    } 

    //sub opcion imagen de fondo
    if ( evento.classList.contains("nav-superior__imagen-de-fondo") ) {
        cambiarImagenDeFondo(evento)
    }
    else if ( evento.classList.contains("imagenes-de-fondo__flecha-izq") ) {
        configuracionCambiarMiniImagenes("izq")
    }
    else if ( evento.classList.contains("imagenes-de-fondo__flecha-der") ) {
        configuracionCambiarMiniImagenes("der")
    }

    //sub opcion fuentes
    //sub opcion temas

})

avatarConfirmar.addEventListener("click", () => {
    comfirmarNombreAvatar()
})
