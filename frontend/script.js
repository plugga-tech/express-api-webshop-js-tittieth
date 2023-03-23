import {printLoginForm, printLogoutBtn} from "./userform.js";

const miniBasket = document.querySelector('#miniBasket');
const numberOfProductsInMiniBasket = document.querySelector('#numberOfProductsInMiniBasket');
const totalPriceInMiniBasket = document.querySelector('#totalPriceInMiniBasket');

const productWrapper = document.getElementById("productsWrapper");
const categoryWrapper = document.getElementById("categories")



if (localStorage.getItem("username")) {
    console.log("ÄR INLOGGAD");
    printLogoutBtn();
} else {
    console.log("ÄR EJ INLOGGAD");
    printLoginForm();
}

function printProducts() {

    fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then(products => {

       console.table(products);

    let productCards = document.createElement("ul");
    productCards.classList.add("productCards");
    productCards.innerHTML = "";

    products.map(product => {
        let li = document.createElement("li")
        li.id = product.name;
        li.innerHTML = `<h1>${product.name}</h1><img src="images/img1.jpg" alt="" width="100" height="240"><p>${product.description}</p>`;
        productCards.appendChild(li);
    })

    productWrapper.innerHTML = "";
    productWrapper.appendChild(productCards);
    });  
}

function printCategories() {

    fetch("http://localhost:3000/api/categories")
    .then(res => res.json())
    .then(categories => {

      console.table(categories);

     const categoryUL = document.createElement("ul");
     categoryUL.classList.add("categoryUL");
     categoryUL.innerHTML = "";

     categories.map(category => {
         let li = document.createElement("li")
         li.id = category.name;
         li.innerHTML = `<h1>${category.name}</h1><img src="images/img7.jpg" alt="" width="300" height="380">`;
         categoryUL.appendChild(li);
     })

     categoryWrapper.innerHTML = "";
     categoryWrapper.appendChild(categoryUL);
    });  
}

printProducts();
printCategories();