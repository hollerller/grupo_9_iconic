window.addEventListener("load",()=>{
    let form = document.getElementById("editUser-form");

    
    form.addEventListener("submit",(e)=>{
        let errors = [];
        

        // ulErrors.innerHTML = ""

        let fullName = document.getElementById("nombre-apellido");

        fullName.addEventListener("keydown",()=>{
           return fullName.value = ""
        })
        if(fullName.value == "" || fullName.value == null){
            errors.push("El campo Nombre y Apellido está vacío");
        }else if(fullName.value.length < 4){
            errors.push("Debes usar al menos 4 caracteres")
        }

        let userName = document.getElementById("usuario");
        if(userName.value == ""){
            errors.push("El campo usuario está vacío");
        }else if(userName.value.length < 4){
            errors.push("Debes usar al menos 4 caracteres")
        }else if(userName.value.includes(" ")){
            errors.push("El campo usuario no puede contener espacios vacíos")
        }

        let email = document.getElementById("mail");
        if(email.value == ""){
            errors.push("El campo email está vacío");
        }else if(email.value.length < 9){
            errors.push("Debes usar al menos 4 caracteres")
        }else if(!email.value.includes('@')){
            errors.push("Debes colocar una dirección de correo válida")
        }


        let password = document.getElementById("contrasena");
        if(password.value == ""){
            errors.push("Debes colocar una contraseña");
        }else if(password.value.length < 6){
            errors.push("Debes usar al menos 6 caracteres")
        }



        let passwordConfirmation = document.getElementById("contrasenaConfirmada");
        if(passwordConfirmation.value == ""){
            errors.push("Debes colocar una contraseña");
        }else if(passwordConfirmation.value.length < 6){
            errors.push("Debes usar al menos 6 caracteres")
        }else if(password != passwordConfirmation){
            errors.push("Las contraseñas deben ser iguales")
        }
        let birthday = document.getElementById("fechaNacimiento");
        if(birthday.value == ""){
            errors.push("Debes colocar tu fecha de nacimiento")
        }
        //MOSTRAR ERRORES
        if (errors.length > 0){
            e.preventDefault();
    
            let ulErrors = document.getElementById("errors");
            for(let i = 0;i < errors.length; i++){
                ulErrors.innerHTML += "<li>" + errors[i] + "</li>"
            }
            
        }
        
    })
   
})