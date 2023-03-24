import { printLoginForm, printLogoutBtn } from "./userform.js";

const miniBasket = document.querySelector("#miniBasket");
const numberOfProductsInMiniBasket = document.querySelector(
  "#numberOfProductsInMiniBasket"
);
const totalPriceInMiniBasket = document.querySelector(
  "#totalPriceInMiniBasket"
);
const basketGrid = document.querySelector("#basket-grid");
const totalPriceDisplay = document.querySelector("#totalPriceDisplay");
const buyBtn = document.querySelector("#buy-button");

const productWrapper = document.getElementById("productsWrapper");
const categoryWrapper = document.getElementById("categories");

let productAmount;
let shippingPrice;
let totalPricePerProduct;
let totalPrice;

if (localStorage.getItem("username")) {
  console.log("ÄR INLOGGAD");
  printLogoutBtn();
} else {
  console.log("ÄR EJ INLOGGAD");
  printLoginForm();
}

function printProducts() {
  fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((products) => {
      console.table(products);
      console.log(products.map((product) => product.name));

      let productCards = document.createElement("ul");
      productCards.classList.add("productCards");
      productCards.innerHTML = "";

      products.map((product) => {
        let li = document.createElement("li");
        li.id = product._id;
        li.innerHTML = `<div class="item">
        <img src="images/img1.jpg" alt="" width="200" height="240">
        <div class="item-content">
          <div class="item-info">
            <h3>${product.name}</h3>
            <p>${product.category.name}</p>
            <p>${product.description}</p>
            <p>Antal i lager: ${product.lager}</p>

            </div>
          <div class="item-selection">
            <button class="button-remove">-</button>
            <p>Pris: ${product.price}:-</p>
            <button class="button-add" id="${product._id}">+</button>
          </div>
          </div>
        </div>`;
        productCards.appendChild(li);
      });
      productWrapper.innerHTML = "";
      productWrapper.appendChild(productCards);
      const addBtn = document.querySelectorAll('.button-add');
      addBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {
          addToCart(e.target.id)
        });
       });
    });
}

function addToCart(id) {
  fetch("http://localhost:3000/api/products/" + id)
  .then((res) => res.json())
  .then((product) => {
    console.log(product)
})
}

function printCategories() {
  fetch("http://localhost:3000/api/categories")
    .then((res) => res.json())
    .then((categories) => {
      // console.table(categories);

      const categoryUL = document.createElement("ul");
      categoryUL.classList.add("categoryUL");
      categoryUL.innerHTML = "";

      categories.map((category) => {
        let li = document.createElement("li");
        li.id = category.name;
        li.innerHTML = `<h1>${category.name}</h1><img src="images/img7.jpg" alt="" width="300" height="380">`;
        categoryUL.appendChild(li);
      });

      categoryWrapper.innerHTML = "";
      categoryWrapper.appendChild(categoryUL);
    });
}

// const removeBtn = document.querySelectorAll('.button-remove');
// removeBtn.forEach(btn => {
//   btn.addEventListener('click', remove);
// });

// const addBtn = document.getElementById('buttonAdd');
// addBtn.addEventListener('click', addToCart(e));

// function remove() {
//   if (products[this.dataset.id].amount > 0) {
//     products[this.dataset.id].amount -= 1;
//     renderProducts();
//   }
// }

printProducts();
printCategories();
