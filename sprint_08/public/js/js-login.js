window.addEventListener("load",()=>{
    //capturamos el formulario
    let form = document.getElementById("login-form");
  

    //capturamos los inputs//
    let email = document.getElementById("user_email");
    let password = document.getElementById("contrasena");

    let errors = [1];
    


    //capturamos los divs de validaciones//
    let emailValidations = document.querySelector("div.email_validations");
    let passwordValidations = document.querySelector("div.password_validations")


    //validaciones email//
    email.addEventListener("input",()=>{
        if(email.value.length < 6){
            emailValidations.classList.remove("checked")
            emailValidations.classList.add("alarm")
            emailValidations.innerHTML = "<p>Recordá usar un mínimo de 6 caracteres</p>"
            errors[0] = 1;
        }else if(email.value.length >= 6 && email.value.includes('@')){
            emailValidations.classList.remove("alarm")
            emailValidations.classList.add("checked")
            emailValidations.innerHTML = "<p>Perfecto!</p>"
            errors.shift();
        }else if(!email.value.includes("@") && !email.value.includes(".")){
            emailValidations.classList.remove("checked")
            emailValidations.classList.add("alarm")
            emailValidations.innerHTML = "<p>Ingresá un email válido</p>"
            errors[0] = 1;
        }
    })
    email.addEventListener("blur",()=>{
        if(email.value == ""){
            emailValidations.classList.remove("checked")
            emailValidations.classList.add("alarm")
            emailValidations = "<p>Recordá que este campo no puede estar vacio</p>"
            errors[0] = 1;
        }else if(email.value <6){
            emailValidations.classList.remove("checked")
            emailValidations.classList.add("alarm")
            emailValidations = "<p>Recordá usar un mínimo de 6 caracteres</p>"
            errors[0] = 1;
        }else if(!email.value.includes("@")){
            emailValidations.classList.remove("checked")
            emailValidations.classList.add("alarm")
            emailValidations.innerHTML = "<p>Ingresá un email válido</p>"
            errors[0] = 1;
        }else if(!(email.value.includes(".com"))){
            emailValidations.classList.remove("checked")
            emailValidations.classList.add("alarm")
            emailValidations.innerHTML = "<p>Ingresá un email válido</p>"
            errors[0] = 1;
        }
    })
    //validaciones password//
    password.addEventListener("input",()=>{
        if(password.value == "" || password.value == null){
            passwordValidations.classList.remove("checked");
            passwordValidations.classList.add("alarm");
            passwordValidations.innerHTML = "<p>Recordá ingresar tu contraseña</p>"
            errors[0] = 1;
        } else if(password.value.length < 6){
            passwordValidations.classList.remove("checked");
            passwordValidations.classList.add("alarm");
            passwordValidations.innerHTML = "<p>Recordá que la contraseña debe tener al menos 6 caracteres</p>"
            errors[0] = 1;
        }else{
            passwordValidations.classList.remove("alarm");
            passwordValidations.classList.add("checked");
            passwordValidations.innerHTML = "<p>Genial!</p>"
            errors.shift();
        }
    })
    password.addEventListener("blur", ()=>{
        if(password.value == "" || password.value == null){
            passwordValidations.classList.remove("checked");
            passwordValidations.classList.add("alarm");
            passwordValidations.innerHTML = "<p>Recordá ingresar tu contraseña</p>"
            errors[0] = 1;
        } else if(password.value.length < 6){
            passwordValidations.classList.remove("checked");
            passwordValidations.classList.add("alarm");
            passwordValidations.innerHTML = "<p>Recordá que la contraseña debe tener al menos 6 caracteres</p>"
            errors[0] = 1;
        }else{
            passwordValidations.classList.remove("alarm");
            passwordValidations.classList.add("checked");
            passwordValidations.innerHTML = "<p>Genial!</p>"
            errors.shift();
        }
    })

    form.addEventListener("submit",(e)=>{

        if(errors.length > 0){
            e.preventDefault()
         
        } 
    })




})