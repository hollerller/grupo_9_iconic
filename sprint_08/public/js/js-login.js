window.addEventListener("load",()=>{
    //capturamos los inputs//
    let email = document.getElementById("user_email");
    let password = document.getElementById("contrasena");


    //capturamos los divs de validaciones//
    let emailValidations = document.querySelector("div.email_validations");
    let passwordValidations = document.querySelector("div.password_validations")

    //validaciones email//
    email.addEventListener("input",()=>{
        if(email.value.length < 6){
            emailValidations.classList.remove("checked")
            emailValidations.classList.add("alarm")
            emailValidations.innerHTML = "<p>Recordá usar un mínimo de 6 caracteres</p>"
        }else if(email.value.length >= 6 && email.value.includes('@')){
            emailValidations.classList.remove("alarm")
            emailValidations.classList.add("checked")
            emailValidations.innerHTML = "<p>Perfecto!</p>"
        }else if(!email.value.includes("@") && !email.value.includes(".")){
            emailValidations.classList.remove("checked")
            emailValidations.classList.add("alarm")
            emailValidations.innerHTML = "<p>Ingresá un email válido</p>"
        }
    })
    email.addEventListener("blur",()=>{
        if(email.value == ""){
            emailValidations.classList.remove("checked")
            emailValidations.classList.add("alarm")
            emailValidations = "<p>Recordá que este campo no puede estar vacio</p>"
        }else if(email.value <6){
            emailValidations.classList.remove("checked")
            emailValidations.classList.add("alarm")
            emailValidations = "<p>Recordá usar un mínimo de 6 caracteres</p>"
        }else if(!email.value.includes("@")){
            emailValidations.classList.remove("checked")
            emailValidations.classList.add("alarm")
            emailValidations.innerHTML = "<p>Ingresá un email válido</p>"
        }else if(!(email.value.includes(".com"))){
            emailValidations.classList.remove("checked")
            emailValidations.classList.add("alarm")
            emailValidations.innerHTML = "<p>Ingresá un email válido</p>"
        }
    })
    //validaciones password//
    password.addEventListener("input",()=>{
        if(password.value == "" || password.value == null){
            passwordValidations.classList.remove("checked");
            passwordValidations.classList.add("alarm");
            passwordValidations.innerHTML = "<p>Recordá ingresar tu contraseña</p>"
        } else if(password.value.length < 6){
            passwordValidations.classList.remove("checked");
            passwordValidations.classList.add("alarm");
            passwordValidations.innerHTML = "<p>Recordá que la contraseña debe tener al menos 6 caracteres</p>"
        }else{
            passwordValidations.classList.remove("alarm");
            passwordValidations.classList.add("checked");
            passwordValidations.innerHTML = ""
        }
    })
    password.addEventListener("blur", ()=>{
        if(password.value == "" || password.value == null){
            passwordValidations.classList.remove("checked");
            passwordValidations.classList.add("alarm");
            passwordValidations.innerHTML = "<p>Recordá ingresar tu contraseña</p>"
        } else if(password.value.length < 6){
            passwordValidations.classList.remove("checked");
            passwordValidations.classList.add("alarm");
            passwordValidations.innerHTML = "<p>Recordá que la contraseña debe tener al menos 6 caracteres</p>"
        }else{
            passwordValidations.classList.remove("alarm");
            passwordValidations.classList.add("checked");
            passwordValidations.innerHTML = "<p>Genial!</p>"
        }
    })


})