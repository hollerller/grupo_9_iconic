window.addEventListener("load", () => {

    let form = document.getElementById("editProduct-form");

    let productName = document.getElementById("prod-name");
    let prodName_validation = document.querySelector('div.prodName_validation');

    let errors = [1];

    productName.addEventListener('input', () => {
        //console.log(productName.value);
        if (productName.value == '') {
            prodName_validation.classList.remove("checked")
            prodName_validation.classList.add("alarm")
            prodName_validation.innerHTML = "<p>El nombre del producto no puede estar vacio</p>"
            errors[0] = 1;
        } else {
            prodName_validation.innerHTML = ""
            errors.shift();
        }

    })

    let prodDescription = document.getElementById("prod-description");

    let prodDescription_validation = document.querySelector('div.prodDescription_validation');

    prodDescription.addEventListener('input', () => {
        if (prodDescription.value == '') {
            prodDescription_validation.classList.remove("checked")
            prodDescription_validation.classList.add("alarm")
            prodDescription_validation.innerHTML = "<p>La descripción no puede estar vacia</p>"
            errors[0] = 1;
        } else if (prodDescription.value.length > 0 && prodDescription.value.length < 6) {
            prodDescription_validation.classList.remove("alarm")
            prodDescription_validation.classList.add("warning")
            prodDescription_validation.innerHTML = "<p>Una descripción mas larga puede incrementar tus ventas!</p>"
            errors[0] = 1;
        }
        else {
            prodDescription_validation.innerHTML = ""
            errors.shift();
        }
    })

    let price = document.getElementById("price");
    let prodPrice_validation = document.querySelector('div.prodPrice_validation');

    price.addEventListener('input', () => { 
        if (price.value < 100) {
            prodPrice_validation.classList.remove("checked")
            prodPrice_validation.classList.add("alarm")
            prodPrice_validation.innerHTML = "<p>El producto no puede valer menos de $100</p>"
            errors[0] = 1;
        } else {
            prodPrice_validation.innerHTML = ""
            errors.shift();
        }
    })


    form.addEventListener("submit", (e) => {
        if (errors.length > 0) {
            e.preventDefault()
            errors = []
        }
    })

})


