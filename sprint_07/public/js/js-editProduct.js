window.addEventListener("load", () => {
    let form = document.querySelector("form#editProduct-form");

    form.addEventListener("submit", (e) => {
        let errors = [];
        let ulErrors = document.querySelector("div.errors");

        ulErrors.innerHTML = ''

        let productName = document.querySelector("input#prod-name");

        if (productName.value == '') {
            errors.push("El nombre del producto está vacío");
        } else if (fullName.value.length < 3) {
            errors.push("El nombre de producto debe tener al menos 3 caracteres");
        }

        let productDescrition = document.querySelector("textarea#description");

        if (productDescrition.value == '') {
            errors.push("La descripción del producto está vacía");
        } else if (productDescrition.value.length < 5) {
            errors.push("La descripción del producto debe ser de más de 5 caracteres");
        }

        let productPrice = document.querySelector("input#price");

        if (productPrice.value == '') {
            errors.push("El precio del producto está vacío");
        } else if (productPrice.value < 100) {
            errors.push("El precio del producto no debe ser menor de 100 pesos");
        }

        //MOSTRAR ERRORES
        if (errors.length > 0) {
            e.preventDefault();


            for (let i = 0; i < errors.length; i++) {
                ulErrors.innerHTML += "<li>" + errors[i] + "</li>"
            }

        }


    })

})