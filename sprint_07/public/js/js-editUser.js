window.addEventListener("load",()=>{
    //Capturamos el formulario//
    let form = document.getElementById("editUser-form");

   
  
            //Capturamos el campo full name y el div de sus errores//
            let fullName = document.getElementById("nombre-apellido");
            let fullNameValidations = document.querySelector(".fullname_validations")
            

            //Validaciones del campo Full name//
            fullName.addEventListener("input",()=>{
                if(fullName.value.length < 6){
                    fullNameValidations.classList.remove("checked")
                    fullNameValidations.classList.add("alarm")
                    fullNameValidations.innerHTML = "<p>Recordá usar un mínimo de 6 caracteres</p>"
                }else if(fullName.value.length >= 6){
                    fullNameValidations.classList.remove("alarm")
                    fullNameValidations.classList.add("checked")
                    fullNameValidations.innerHTML = "<p>Perfecto!</p>"
                }
            })
            fullName.addEventListener("blur",()=>{
                if(fullName.value == ""){
                    fullNameValidations.classList.toggle("checked")
                    fullNameValidations.classList.add("alarm")
                    fullNameValidations = "<p>Recordá que este campo no puede estar vacio</p>"
                }else if(fullName.value <6){
                    fullNameValidations.classList.toggle("checked")
                    fullNameValidations.classList.add("alarm")
                    fullNameValidations = "<p>Recordá usar un mínimo de 6 caracteres</p>"
                }
            })
            //Capturamos el input user name y su div de validaciones//
            let userName = document.getElementById("usuario");
            let userNameValidations = document.querySelector("div.username_validations");
            //Validaciones del campo user name//
            userName.addEventListener("input",()=>{
                if(userName.value.length < 6){
                    userNameValidations.classList.remove("checked")
                    userNameValidations.classList.add("alarm")
                    userNameValidations.innerHTML = "<p>Recordá usar un mínimo de 6 caracteres</p>"
                }else if(userName.value.length >= 6){
                    userNameValidations.classList.remove("alarm")
                    userNameValidations.classList.add("checked")
                    userNameValidations.innerHTML = "<p>Perfecto!</p>"
                }
            })
            userName.addEventListener("blur",()=>{
                if(userName.value == ""){
                    userNameValidations.classList.toggle("checked")
                    userNameValidations.classList.add("alarm")
                    userNameValidations = "<p>Recordá que este campo no puede estar vacio</p>"
                }else if(userName.value <6){
                    userNameValidations.classList.toggle("checked")
                    userNameValidations.classList.add("alarm")
                    userNameValidations = "<p>Recordá usar un mínimo de 6 caracteres</p>"
                }
            })

            //capturamos el campo mail y su div de validaciones//
            let email = document.getElementById("mail");
            let emailValidations = document.querySelector("div.email_validations");

            // validaciones campo email//
            email.addEventListener("input",()=>{
                if(email.value.length < 6){
                    emailValidations.classList.remove("checked")
                    emailValidations.classList.add("alarm")
                    emailValidations.innerHTML = "<p>Recordá usar un mínimo de 6 caracteres</p>"
                }else if(email.value.length >= 6 && email.value.includes('@')){
                    emailValidations.classList.remove("alarm")
                    emailValidations.classList.add("checked")
                    emailValidations.innerHTML = "<p>Perfecto!</p>"
                }else if(email.value.length<6 || !email.value.includes("@")){
                    emailValidations.classList.remove("checked")
                    emailValidations.classList.add("alarm")
                    emailValidations.innerHTML = "<p>Ingresá un email válido</p>"
                }
            })
            email.addEventListener("blur",()=>{
                if(email.value == ""){
                    emailValidations.classList.toggle("checked")
                    emailValidations.classList.add("alarm")
                    emailValidations = "<p>Recordá que este campo no puede estar vacio</p>"
                }else if(email.value <6){
                    emailValidations.classList.toggle("checked")
                    emailValidations.classList.add("alarm")
                    emailValidations = "<p>Recordá usar un mínimo de 6 caracteres</p>"
                }else if(!email.value.includes("@")){
                    emailValidations.classList.remove("checked")
                    emailValidations.classList.add("alarm")
                    emailValidations.innerHTML = "<p>Ingresá un email válido</p>"
                }
            })

            //capturamos el input de fecha de nacimiento y su div de validaciones//
            let birthday = document.getElementById("fechaNacimiento");
            let birthdayValidations = document.querySelector("div.birthday_validations");

            birthday.addEventListener("input",()=>{
                if(birthday.value == ""){
                    birthdayValidations.classList.remove("checked")
                    birthdayValidations.classList.add("alarm")
                    birthdayValidations.innerHTML = "<p>Por favor, colocá tu fecha de nacimiento</p>"
                }
            })
            birthday.addEventListener("blur",()=>{
                if(birthday.value == ""){
                    birthdayValidations.classList.remove("checked")
                    birthdayValidations.classList.add("alarm")
                    birthdayValidations.innerHTML = "<p>Por favor, colocá tu fecha de nacimiento</p>"
                }else{
                    birthdayValidations.classList.remove("alarm")
                    birthdayValidations.classList.add("checked")
                    birthdayValidations.innerHTML = "<p>Genial!</p>"
                }
            })
       
})