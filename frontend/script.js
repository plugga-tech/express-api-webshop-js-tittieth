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
        li.innerHTML = `<div class="item">
        <img src="images/img1.jpg" alt="" width="200" height="240">
        <div class="item-content">
          <div class="item-info">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
          </div>
          <div class="item-selection">
            <button class="button-add">+</button>
            <p>${product.price}</p>
            <button class="button-remove">-</button>
          </div>
        </div>
      </div>`;
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

const addBtn = document.querySelectorAll('.button-add');
addBtn.forEach(btn => {
  btn.addEventListener('click', add);
});

const removeBtn = document.querySelectorAll('.button-remove');
removeBtn.forEach(btn => {
  btn.addEventListener('click', remove);
});

printProducts();
printCategories();