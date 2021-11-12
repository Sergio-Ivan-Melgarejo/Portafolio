"use strict"

// Declaraciones

const main = document.getElementById("main");
// para cerrar el ultimo abierto
let memorizacion;
// donde pondre los Datos de las paginas a mostrar
let datos = "nada";
const divPaginas = document.querySelector(".main__paginas");
// buscador
const buscadorFrontMentor = document.getElementById("buscador__front-mentor");
const buscadorProjectos = document.getElementById("buscador__projectos");
const buscadorJuegos = document.getElementById("buscador__juegos");
const buscadorProximamente = document.getElementById("buscador__proximamente");
// filtro
// const filtro = document.querySelectorAll("main___filtro-lista")
const datosfiltro = {
    "Front Mentor": {
        "Dificultad": [],
        "Lenguaje": [],
        "Mostrar": "10"
    },
    "Projectos": {
        "Lenguaje": [],
        "Mostrar": "10"
    },
    "Juegos": {
        "Lenguaje": [],
        "Mostrar": "10"
    },
    "Proximamente": {
        "Lenguaje": [],
        "Mostrar": "10"
    }
};

// Funciones

// primer parametro es el padre que los contiene atodos, segundo opcional del buscador, tercero opcional del filtro
const mostrarPaginas = ( eventoPadre, resBuscador = false) => {
    // para dar mensaje de 0 cerultado o no hay datos subidos todabia
    let todosLosFiltro = "no aplicados";

    // obtiene dato para editar
    let datoAMostrar = datos;

    // la cantidad de pagina que mostrara
    let mostrarDeA ;

    // si esta resBuscador aplica y reordena / si hay algo en el buscador tambien (evita bug cuando pasa pagina)
    if ( resBuscador || eventoPadre.children[1].children[0].children[1].value !== "" ) {
        let bus;
        if( resBuscador !== false ) bus = resBuscador.toLowerCase();
        else bus = eventoPadre.children[1].children[0].children[1].value.toLowerCase();

        datoAMostrar = datoAMostrar.filter(elemento => {
            let contenido = elemento.datos.titulo + elemento.datos.lenguaje + ( elemento.datos.dificultad || "" )+ ( elemento.datos.extra || "" );
            contenido = contenido.toLowerCase();
            return contenido.includes(bus)
        });
        todosLosFiltro = "aplicados";
    }

    // filtro para que tipo va a mostrar
    datoAMostrar = datoAMostrar.filter( dato => dato.tipo.includes( eventoPadre.getAttribute("data-tipo") ));

    // pasa filtro y ordena
    if ( eventoPadre ){
        let filtro = eventoPadre.children[1].children[1];
        let mensaje = "";
        // evita sobrescribir si se usa mas de una clase de filtro (solo hay 2 y no sirviria si se agrega otro filtro)
        let filtroDificultad = datosfiltro["Front Mentor"]["Dificultad"];
        let filtroLenguaje = datosfiltro[eventoPadre.getAttribute("data-tipo")]["Lenguaje"];

        // filtro solo para front mentor (si es el unico filtro activo)
        if( filtro.children[0].getAttribute("data-tipo") == "Dificultad" && datosfiltro["Front Mentor"]["Dificultad"].length !== 0 ) {

            // quito los que no son de front mentor
            datoAMostrar = datoAMostrar.filter( elemento =>  elemento.datos.dificultad !== undefined )

            if ( filtroLenguaje.length == 0 ){
                // filtro segun lo que hay en datosfiltro (si es el unico filtro activo)
                datoAMostrar = datoAMostrar.filter( elemento => {
                    let elem = elemento.datos.dificultad.toLowerCase() ;
                    for ( let elemento of filtroDificultad ) {
                        if ( elem == elemento ) return elem;
                    }
                    return false;
                });
            }
            else{
                // version si ambos filtros estan activo 
                datoAMostrar = datoAMostrar.filter( elemento => {
                    let lenguaje = elemento.datos.lenguaje.toLowerCase() ;
                    let dificultad = elemento.datos.dificultad.toLowerCase() ;

                    for ( let elemento of filtroLenguaje ) {
                        if ( lenguaje.includes(elemento) ) return true;
                    } 
                    for ( let elemento of filtroDificultad ) {
                        if ( dificultad == elemento ) return true;
                    } 
                    return false
                });
            }
        
            // para mensaje el mensaje si no hay resultados
            if ( datoAMostrar.length == 0 ) { 
                for ( let msg of filtroDificultad ) {
                    switch (msg) {
                        case "newbie":
                            mensaje += " Nobato";
                            break
                        case "junior":
                            mensaje += " Junior";
                            break
                        case "intermediate":
                            mensaje += " Intermedio";
                            break
                        case "advanced":
                            mensaje += " Avanzado";
                            break     
                        case "guru":
                            mensaje += " Gurú";
                            break    
                    }
                }
                if (resBuscador != false) resBuscador += mensaje;
                else resBuscador = mensaje
            }
            todosLosFiltro = "aplicados";
        }

        // filtro para todos Lenguaje
        if( 
            (filtro.children[0].getAttribute("data-tipo") == "Lenguaje" ||
             filtro.children[1].getAttribute("data-tipo") == "Lenguaje") &&
              datosfiltro[eventoPadre.getAttribute("data-tipo")]["Lenguaje"].length !== 0 
            ) {

            if ( filtroDificultad.length == 0 ){
                // añade segun lo que hay en datosfiltro (si es el unico filtro activo)
                datoAMostrar = datoAMostrar.filter( elemento => {
                    let elem = elemento.datos.lenguaje.toLowerCase() ;
                    for ( let elemento of filtroLenguaje ) {
                        if ( elem.includes(elemento) ) return elem;
                    }
                    return false;
                });
            }
            else{
                // version si ambos filtros estan activo 
                datoAMostrar = datoAMostrar.filter( elemento => {
                    let lenguaje = elemento.datos.lenguaje.toLowerCase() ;
                    let dificultad = elemento.datos.dificultad.toLowerCase() ;

                    for ( let elemento of filtroLenguaje ) {
                        if ( lenguaje.includes(elemento) ) return true;
                    } 
                    for ( let elemento of filtroDificultad ) {
                        if ( dificultad == elemento ) return true;
                    } 
                    return false
                });
            }

            // para mensaje el mensaje si no hay resultados
            if ( datoAMostrar.length == 0 ) { 
                mensaje = "";
                for ( let msg of filtroLenguaje ) {
                    switch (msg) {
                        case "html & css":
                            mensaje += " HTML & CSS";
                            break
                        case "js":
                            mensaje += " JS";
                            break
                        case "api":
                            mensaje += " API";
                            break
                        case "react":
                            mensaje += " REACT";
                            break     
                        case "node":
                            mensaje += " NODE";
                            break    
                    }
                }
                if (resBuscador != false) resBuscador += mensaje;
                else resBuscador = mensaje
            }
            todosLosFiltro = "aplicados";
        }

        // filtro para todos Mostrar de a :
        if( filtro.children[1].getAttribute("data-tipo") == "Mostrar" || filtro.children[2].getAttribute("data-tipo") == "Mostrar" ) {
            let tipo = filtro.getAttribute("data-tipo");
            mostrarDeA = datosfiltro[tipo]["Mostrar"];
        }
    }

    // simplemente para acortar
    let acortar = eventoPadre.children[1].children[3].children[0].children;
    if ( acortar[1].textContent == "0" ) {
        // establece las paginas totales
        acortar[3].textContent = Math.ceil(datoAMostrar.length /  mostrarDeA);
        // establece pagina actual
        acortar[1].textContent = (acortar[3].textContent >= 1 ) ? 1 : 0;
    }
    //siempre se actualiza el total, por tema de busqueda y filtro
    acortar[3].textContent = Math.ceil(datoAMostrar.length /  mostrarDeA);

    // obtiene la pagina actual del html
    let paginaActual = acortar[1].textContent;
    // le resta porque en array se cuenta desde el 0
    paginaActual--

    datoAMostrar = datoAMostrar.slice(paginaActual * mostrarDeA, (1 + paginaActual) * mostrarDeA);

    // termina si noy hay que mostrar y retornando un mensaje
    if ( datoAMostrar.length == 0 && todosLosFiltro == "aplicados" ) return mensajeCeroResultado(eventoPadre.children[1].children[2], resBuscador);
    else if ( datoAMostrar.length == 0 && todosLosFiltro ==  "no aplicados" ) return mensajeSinArchivosSubidos(eventoPadre.children[1].children[2]);

    // muestra segun filtro , buscador y si coniciden el data- del html y el tipo del json
    let paginas = document.createElement("div");
    paginas.classList.add("main__paginas");

    for (let i = 0; i < datoAMostrar.length; i++) {
        let pagina = crearPagina(datoAMostrar[i]);
        paginas.appendChild(pagina);
    }
  
    eventoPadre.children[1].replaceChild( paginas ,eventoPadre.children[1].children[2] );
}

// recipe los datos de una pagina para armarlos antes de mostrar
const crearPagina = (pagina) => {

    //lo creo
    const divPagina = document.createElement("div");
    const img = document.createElement("img");
    const h3 = document.createElement("h3");
    const divFooter = document.createElement("div");
    const pLenguaje = document.createElement("p");
    const spanLenguaje = document.createElement("span");
    const a = document.createElement("a");

    //doy clase
    divPagina.classList.add("main__pagina");
    img.classList.add("main__pagina-img");
    h3.classList.add("main__pagina-titulo");
    divFooter.classList.add("main__pagina-footer");
    pLenguaje.classList.add("main__pagina-lenguaje");
    spanLenguaje.classList.add("main__pagina-lenguaje-span");
    a.classList.add("main__pagina-link");

    //le doy el contenido y atributos
    img.setAttribute("src", pagina.datos.imagen);
    img.setAttribute("alt", `imagen de ${pagina.datos.titulo}`)
    h3.textContent = pagina.datos.titulo;
    pLenguaje.textContent = "Lenguaje: ";
    spanLenguaje.textContent = pagina.datos.lenguaje;
    a.textContent = "Link";
    a.setAttribute("href", pagina.datos.url)
    a.setAttribute("target", "_blank");

    //los uno
    divPagina.appendChild(img);
    divPagina.appendChild(h3);
    pLenguaje.appendChild(spanLenguaje);
    divFooter.appendChild(pLenguaje);
    divFooter.appendChild(a);

    //cambio el diseño para las 4 clases
    if( pagina.tipo.startsWith("Front Mentor") ) {     
        //version front mentor

        const pDificultad = document.createElement("p");
        const spanDificultad = document.createElement("span");

        pDificultad.classList.add("main__pagina-dificultad");
        spanDificultad.classList.add("main__pagina-dificultad-span");

        pDificultad.textContent = "Dificultad: ";
        spanDificultad.textContent = pagina.datos.dificultad;

        divPagina.appendChild(divFooter);
        pDificultad.appendChild(spanDificultad);
        divPagina.appendChild(pDificultad);
    }
    else if ( pagina.tipo.includes("Projectos") ||  pagina.tipo.includes("Juegos") || pagina.tipo.includes("Proximamente") ){
        //version del resto
        let extra = document.createElement("p");
        extra.classList.add("main__pagina-extra");
        extra.textContent = pagina.datos.extra;

        divFooter.appendChild(extra);
        divPagina.appendChild(divFooter);
    }

    return divPagina
}

// salta cuando no haya resultado de busqueda
const mensajeCeroResultado = ( evento , resbuscador ) => {
    // establece en 0 las paginas
    evento.parentNode.children[3].children[0].children[1].textContent = 0;
    evento.parentNode.children[3].children[0].children[3].textContent = 0

    if ( evento.getAttribute("data-msg") !== "sin resultado" ){

        let paginas = document.createElement("div");
        let mensaje = document.createElement("h3");
        let span = document.createElement("span");

        paginas.classList.add("main__paginas");
        mensaje.classList.add("mensajes404-text");
        span.classList.add("mensajes404-span");

        mensaje.textContent = "No se hayaron resultados con ";
        span.textContent = resbuscador;

        mensaje.appendChild(span);
        evento.appendChild(mensaje);
        paginas.appendChild(mensaje);
        evento.style.alignItems = "center";

        // para no hacer todo lo anterior de nuevo y simplemente cambiar el textcontent en el else
        paginas.setAttribute("data-msg", "sin resultado")

        evento.parentNode.replaceChild(paginas, evento.parentNode.children[2]);
    }
    else if ( evento.getAttribute("data-msg") == "sin resultado" ){
        evento.children[0].children[0].textContent = resbuscador;
    }
}

// salta si no hay archivos para mostrar / subidos
const mensajeSinArchivosSubidos = ( evento ) => {

    if ( evento.getAttribute("data-msg") !== "sin archivos" ){
        let paginas = document.createElement("div");
        let mensaje = document.createElement("h3");
        let img = document.createElement("img");

        paginas.classList.add("main__paginas");
        mensaje.classList.add("mensajes404-text")
        img.classList.add("mensajes404-img")
        
        img.setAttribute("src", "./imagenes/undraw_under_construction_46pa.svg");
        img.setAttribute("alt", "imagen de contruccion svg");

        mensaje.textContent = "No hay datos subidos aun...";

        paginas.appendChild(mensaje);
        paginas.appendChild(img);

        //para no volver a poner si ya estaba
        evento.setAttribute("data-msg", "sin archivos");

        evento.parentNode.replaceChild(paginas, evento.parentNode.children[2]);
    }
}

//Eventos

main.addEventListener("click", (e) => {
    let evento = e.target;

    /* contraccion de secciones de main  */

    if (evento.classList.contains("main__abrir-i")) {
        let secionElejida = evento.parentNode.parentNode;
        secionElejida.classList.toggle("main__item-flex-selecionado");

        if (memorizacion != undefined && memorizacion != secionElejida) {
            memorizacion.classList.remove("main__item-flex-selecionado", "main__footer-selecionado");
        }

        memorizacion = secionElejida;
    }

    /* obtener las paginas */

    if (evento.classList.contains("main__abrir-i")) {
        if (datos === "nada") {
            fetch("./Data/Data-paginas.json").then(res => {
                return res.json()
            }).then(res => {
                datos = res;
                mostrarPaginas(evento.parentNode.parentNode);
            })
        } //para que no borre y vuelva a cargar si lo minimiza y lo vuelve abrir
        else if ( evento.parentNode.parentNode.children[1].children[2].children.length == 0 ){
            mostrarPaginas(evento.parentNode.parentNode);
        }
    }

    /* abrir y cerrar filtro de paginas */

    if (evento.classList.contains("main__filtro-boton")) {
        let menufiltro = evento.parentNode.parentNode.children[1];
        menufiltro.classList.toggle("filtro-abierto");
    }   

    /* click en opciones de filtro */
    
    if ( evento.classList.contains("main__lista-opcion") ) {
        // obtengo de quien de los 4 es el filtro, cambio el valor y aplico cambios
        let deQuienESElFiltro = evento.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("data-tipo");
        let queClaseDeFiltroEs = evento.parentNode.parentNode.parentNode.parentNode.getAttribute("data-tipo");
        let value = evento.value;
        let almacenar = datosfiltro[deQuienESElFiltro][queClaseDeFiltroEs];

        if ( queClaseDeFiltroEs !== "Mostrar" ) {
            // añadimos o quitamos en funcion si esta o no . Y si no es Mostrar
            if ( almacenar.includes(value) ) {
                let indice = almacenar.indexOf(value); // obtenemos el indice
                almacenar.splice(indice, 1); // 1 es la cantidad de elemento a eliminar 
            }
            else almacenar.push(value)
        }
        else {
            // marcamos y desenmarca los demas (solo para Mostrar)
            evento.checked = true;
            let aDesenmarcar = evento.parentNode.parentNode.parentNode.children;
            for( let i of aDesenmarcar ) {
                if ( i.children[0].children[0] !== evento ) {
                    i.children[0].children[0].checked = false;
                }
            }
            // almacenar = value; --- no me acepta el almacenar --- raro
            datosfiltro[deQuienESElFiltro][queClaseDeFiltroEs] = value;
        }
        mostrarPaginas( evento.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode );
    }

    /* cambiar paginas */

    if ( evento.classList.contains("main__pagina-anterior") ){
        let cambio = parseInt(evento.parentNode.children[1].textContent) - 1;
        if( cambio >= 1 ){     
            evento.parentNode.children[1].textContent = cambio;
            mostrarPaginas(evento.parentNode.parentNode.parentNode.parentNode);
        }
    }

    else if ( evento.classList.contains("main__pagina-actual") ){}

    else if ( evento.classList.contains("main__pagina-siguiente") ){
        let cambio = parseInt(evento.parentNode.children[1].textContent) + 1;
        if( cambio <= evento.parentNode.children[3].textContent ){     
            evento.parentNode.children[1].textContent = cambio ;
            mostrarPaginas(evento.parentNode.parentNode.parentNode.parentNode);
        }
    }

    else if ( evento.classList.contains("main__paginas-totales") ){
        let cambio = parseInt(evento.parentNode.children[3].textContent);
        if( cambio <= evento.parentNode.children[3].textContent ){     
            evento.parentNode.children[1].textContent = cambio ;
            mostrarPaginas(evento.parentNode.parentNode.parentNode.parentNode);
        }
    }

    /* abrir footer */

    if (evento.classList.contains("main__abrir-footer")) {
        evento.classList.toggle("main__footer-selecionado");

        if (memorizacion != undefined && memorizacion != evento) {
            memorizacion.classList.remove("main__item-flex-selecionado", "main__footer-selecionado");
        }

        memorizacion = evento;
    }

});

//eventos de cada buscador(agregar los otros)
buscadorFrontMentor.addEventListener("keyup", (e) => {
    //establece la pagina a 1 para evitar errores
    e.target.parentNode.parentNode.children[3].children[0].children[1].textContent = 1;
    mostrarPaginas(e.target.parentNode.parentNode.parentNode, e.target.value)
})

buscadorProjectos.addEventListener("keyup", (e) => {
    //establece la pagina a 1 para evitar errores
    e.target.parentNode.parentNode.children[3].children[0].children[1].textContent = 1;
    mostrarPaginas(e.target.parentNode.parentNode.parentNode, e.target.value)
})

buscadorJuegos.addEventListener("keyup", (e) => {
    //establece la pagina a 1 para evitar errores
    e.target.parentNode.parentNode.children[3].children[0].children[1].textContent = 1;
    mostrarPaginas(e.target.parentNode.parentNode.parentNode, e.target.value)
})

buscadorProximamente.addEventListener("keyup", (e) => {
    //establece la pagina a 1 para evitar errores
    e.target.parentNode.parentNode.children[3].children[0].children[1].textContent = 1;
    mostrarPaginas(e.target.parentNode.parentNode.parentNode, e.target.value)
})