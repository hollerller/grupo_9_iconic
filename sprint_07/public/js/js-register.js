window.addEventListener("load",()=>{
    let form = document.querySelector("form.formulario");
    let errores = [];

    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        let fullName = document.querySelector("input#nombre-apellido");
        let userName = document.querySelector("input#usuario");
        let email = document.querySelector("input#mail");
        let password = document.querySelector("input#contrasena");
        let passwordConfirmation = document.querySelector("input#contrasenaConfirmada");
        let birthday = document.querySelector("input#fechaNacimiento");


    })
})