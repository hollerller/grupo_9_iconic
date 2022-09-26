window.addEventListener("load", () => {
    let form = document.getElementById("editProduct-form");

    let productName = document.getElementById("prod-name");

    let prodName_validation = document.querySelector('div.prodName_validation');

    productName.addEventListener('input', () => {
        //console.log(productName.value);
        if (productName.value == '') {
            prodName_validation.classList.remove("checked")
            prodName_validation.classList.add("alarm")
            prodName_validation.innerHTML = "<p>El nombre del producto no puede estar vacio</p>"
        } else {

            prodName_validation.innerHTML = ""
        }

})
 
    let prodDescription = document.getElementById("prod-description");

    let prodDescription_validation = document.querySelector('div.prodDescription_validation');
    
    prodDescription.addEventListener('input', () => {
    if (prodDescription.value == '') {
      prodDescription_validation.classList.remove("checked")
        prodDescription_validation.classList.add("alarm")
        prodDescription_validation.innerHTML = "<p>La descripción no puede estar vacia</p>"
    } else if (prodDescription.value.length > 0 && prodDescription.value.length < 6){
        prodDescription_validation.classList.remove("alarm")
        prodDescription_validation.classList.add("warning")
        prodDescription_validation.innerHTML = "<p>Una descripción mas larga puede incrementar tus ventas!</p>"
    }
     else {
        prodDescription_validation.innerHTML = ""
    }
})

    let price = document.getElementById("price");

    let prodPrice_validation = document.querySelector('div.prodPrice_validationn');

    price.addEventListener('input', () => {

        if (price.value < 100) {
            price.classList.remove("checked")
            price.classList.add("alarm")
            prodPrice_validation.innerHTML = "<p>El producto no puede valer menos de $100</p>"
        }
    })
})