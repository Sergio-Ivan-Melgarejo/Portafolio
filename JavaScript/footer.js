"use strict"

// Declaraciones

export const footer = document.getElementById("footer"),
    email = document.querySelector("#footer #form"),
    footerEmail = document.getElementById("footerEmail"),
    form = document.getElementById("form"),
    formMensaje = document.getElementById("formMensaje"),
    formMensajeError = document.getElementById("formMensajeError");

// Funciones

const cerrarMensaje = () => {
    formMensajeError.children[0].classList.remove("open");
    formMensajeError.children[1].classList.remove("open");
    formMensajeError.children[2].classList.remove("open");
    formMensajeError.classList.remove("open");
}

// Eventos

addEventListener("DOMContentLoaded", () => {
    footerEmail.addEventListener("click", () => {
        email.classList.toggle("open");
    })

    footer.addEventListener("submit", (e) => {
        if ( form.formNombre.value.length < 4 ) {
            e.preventDefault();
            formMensajeError.children[0].classList.add("open");
            formMensajeError.classList.add("open");
            setTimeout(()=>{
                cerrarMensaje()
            }, 5000)
        }
        if ( 
            !form.formEmail.value.includes("@") || 
            !form.formEmail.value.includes(".com") || 
            form.formEmail.value.length < 9 
        ) {
            e.preventDefault();
            formMensajeError.children[1].classList.add("open");
            formMensajeError.classList.add("open");
            setTimeout(()=>{
                cerrarMensaje()
            }, 5000)
        }
        if ( form.formMensaje.value.length < 9 ) {
            e.preventDefault();
            formMensajeError.children[2].classList.add("open");
            formMensajeError.classList.add("open");
            setTimeout(()=>{
                cerrarMensaje()
            }, 5000)
        }
    })
})