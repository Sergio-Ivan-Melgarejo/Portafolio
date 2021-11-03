"use stric"

//General
export const body = document.getElementById("body");
//Abrir / cerrar configuracion
const abrirCof = document.getElementById("abrir-cof");
const navSuperior = document.getElementById("nav-superior");
const cerrarCof = document.getElementById("cerrar-menu-sup");
//Opciones
const opciones = document.getElementById("nav-superior__opciones");
const opcionesUsuario = document.querySelector(".li__usuario");
const opcionesImagenDeFondo = document.querySelector(".li__imagen-de-fondo");
const opcionesTemas = document.querySelector(".li__temas");
const opcionesFuente = document.querySelector(".li__fuente");
//Avatares
export const avatarMenu = document.querySelector(".nav-inferior-imagen");
export const avatarCogiguracion = document.querySelector(".nav-superior__avatar-imagen");
export const avatarNombre = document.querySelector(".avatar-nombre__span");
const avatarConfirmar = document.querySelector(".fa-check-circle");
//Imagen de fondo
export const preImagen1 = document.getElementById("IDF1");
export const preImagen2 = document.getElementById("IDF2");
export const preImagen3 = document.getElementById("IDF3");
// -- Data/Imagenes-de-fondo.json --
let dataJsonIDF = false;
//serc = numero del data que mostrara en los predondos del menu configuracion
let src1 , src2, src3;

//Funciones

const guardarDatoLocalStora = (nombreDeDato, dato) => {
    localStorage.setItem(nombreDeDato, dato)
}

const cambiarAvatar = (genero) => {
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

const cambiarImagenDeFondo = (src) => {
    body.style.backgroundImage = `url(${src})`
}

const guardarImagenDeFondo = (src) => {
    localStorage.setItem("imagenDeFondo", src)
}

/* obeter src de ./Data/Imagenes-de-fondo */
export const obtenerJsonIDF = async () => {
    return fetch("./Data/Imagenes-de-fondo.json")
    .then( res  => {
        return res.json()
    })
    .then( res => {
        return res;  
    })
}

//Comprueba que no pase el carrucel el numero de imagen que hay y añade las src
const configuracionCambiarMiniImagenes = async (direcion) => {
    //obtiene el numero actual cargado del local stora directo del html una vez sola
    if ( !dataJsonIDF ) {
        src2 = parseInt(preImagen2.getAttribute("src").slice(-5,-4)) -1 ;
        src1 = src2 - 1 ;
        src3 = src2 + 1 ;
    }

    //obtiene obtiene las src una vez sola
    if ( !dataJsonIDF ) {
        dataJsonIDF = await obtenerJsonIDF();
    }       

    //si pasa la cantidad de imagenes vuelve al principio y viseversa
    if ( src1 < 0 )  src1 = dataJsonIDF.length - 1 ;
    if ( src3 > dataJsonIDF.length - 1)  src3 = 0 ;

    (direcion === "der") ? ( src1 = src2, src2 = src3, src3++ ) : ( src3 = src2, src2 = src1, src1-- );
    
    //hay dos por que si empieza con el ultimo y da a cambiar para adelante ocurre un error
    if ( src1 < 0 )  src1 = dataJsonIDF.length - 1 ;
    if ( src3 > dataJsonIDF.length - 1)  src3 = 0 ;

    let preSRC1= dataJsonIDF[ src1 ].src;
    let preSRC2 = dataJsonIDF[ src2 ].src;
    let preSRC3= dataJsonIDF[ src3 ].src;

    preImagen1.setAttribute("src", preSRC1 )
    preImagen2.setAttribute("src", preSRC2 )
    preImagen3.setAttribute("src", preSRC3 )

    //guarda imagen de fondo del src2
    guardarImagenDeFondo(preSRC2);
    cambiarImagenDeFondo(preSRC2);
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
        if ( evento.getAttribute("id") === "IDF1") configuracionCambiarMiniImagenes("izq")
        if ( evento.getAttribute("id") === "IDF3") configuracionCambiarMiniImagenes("der")
    }
    else if ( evento.classList.contains("imagenes-de-fondo__flecha-izq") ) {
        configuracionCambiarMiniImagenes("der")
    }
    else if ( evento.classList.contains("imagenes-de-fondo__flecha-der") ) {
        configuracionCambiarMiniImagenes("izq")
    }

    //tema noche

    if ( evento.classList.contains("fa-moon") ) {
        cambiarAvatarTema("tema-noche")
    }

    //tema noche

    if ( evento.classList.contains("fa-book-open") ) {
        cambiarAvatarTema("tema-lectura")
    }
    //sub opcion fuentes
    //sub opcion temas

})

avatarConfirmar.addEventListener("click", () => {
    comfirmarNombreAvatar()
})

const cambiarAvatarTema = (tema) => {
    let remover = body.classList.toggle(tema);
    if ( remover ) { 
        localStorage.setItem("tema", tema)
    }
    else{
        localStorage.setItem("tema", "predeterminado")
    }
}
