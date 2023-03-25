import { printLoginForm, printLogoutBtn } from "./userform.js";

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const numberOfProductsInMiniBasket = document.querySelector("#numberOfProductsInMiniBasket");
const totalPriceInMiniBasket = document.querySelector("#totalPriceInMiniBasket");
const cartGrid = document.querySelector("#cartGrid");
const totalPriceDisplay = document.querySelector("#price-display");
const productWrapper = document.getElementById("productsWrapper");
const categoryWrapper = document.getElementById("categories");

if (localStorage.getItem("user")) {
  console.log("ÄR INLOGGAD");
  printLogoutBtn();
  printViewOrdersBtn();
  placeOrder();
} else {
  console.log("ÄR EJ INLOGGAD");
  printLoginForm();
}

function printProducts(categoryId) {
  fetch("http://localhost:3000/api/products/category/" + categoryId)
    .then((res) => res.json())
    .then((products) => {
      // console.log(products.map((product) => product.name));

      let productCards = document.createElement("ul");
      productCards.classList.add("productCards");
      productCards.innerHTML = "";

      let goBackBtn = document.createElement("button");
      goBackBtn.classList.add("go-back-btn");
      goBackBtn.innerText = "Tillbaka";

      goBackBtn.addEventListener("click", () => {
        printCategories();
    })
    

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
      productWrapper.append(productCards, goBackBtn);
      const addBtn = document.querySelectorAll(".button-add");

      addBtn.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const product = products.find((p) => p._id === e.target.id);
          if (localStorage.getItem("user") && product.lager > 0) {
            addToCart(e.target.id);
          } else {
            console.log("Antingen är du inte inloggad eller så är produkten tyvärr slutsåld");
          }
        });
      });
    });
}


function addToCart(id) {
  fetch("http://localhost:3000/api/products/" + id)
    .then((res) => res.json())
    .then((product) => {
      const itemIndex = cart.findIndex(
        (cartProduct) => cartProduct._id === product._id
      );
      if (itemIndex >= 0) {
        cart[itemIndex].quantity++;
      } else {
        const updatedCart = [...cart, { ...product, quantity: 1 }];
        cart = updatedCart;
      }
      console.log(cart);
      localStorage.setItem("cart", JSON.stringify(cart));
      calculateTotalPriceAndTotalItems();
      updateTotalPriceAndTotalItems();
      printCartItems();
    });
}

function printCategories() {
  fetch("http://localhost:3000/api/categories")
    .then((res) => res.json())
    .then((categories) => {
      console.table(categories);

      const categoryUL = document.createElement("ul");
      categoryUL.classList.add("categoryUL");
      categoryUL.innerHTML = "";

      categories.map((category) => {
        let li = document.createElement("li");
        li.id = category._id;
        console.log(category._id)
        li.innerHTML = `<h1>${category.name}</h1><img src="images/img7.jpg" alt="" width="300" height="380">`;
        li.addEventListener("click", () => {
          fetch(`http://localhost:3000/api/products/category/${category._id}`)
            .then((res) => res.json())
            .then((products) => {
              console.log(products)
              printProducts(category._id);
              
            })
            .catch((err) => console.log(err));
        });
        categoryUL.appendChild(li);
      });

      productWrapper.innerHTML = "";
      productWrapper.appendChild(categoryUL);
    });
}

function printCartItems() {
  const cartItems = document.createElement("ul");
  cartItems.classList.add("cart-items");

  cart.map((product) => {
    let li = document.createElement("li");
    li.id = product._id;
    li.innerHTML = `<div class="cart">
    <img src="images/img1.jpg" alt="" width="100" height="140">
    <div class="cart-content">
      <div class="cart-info">
        <h3>${product.name}</h3>
        <p>${product.price}</p>
        <p>Antal: ${product.quantity}</p>
      </div>
      </div>
    </div>`;
    cartItems.appendChild(li);
  });
  cartGrid.innerHTML = "";
  cartGrid.appendChild(cartItems);
}

let totalPrice = 0;
let totalItems = 0;

function calculateTotalPriceAndTotalItems () {
  totalPrice = 0;
  totalItems = 0;
  cart.forEach((item) => {
    totalPrice += item.price * item.quantity;
    totalItems += item.quantity;
    console.log(totalPrice)
  });
}

function updateTotalPriceAndTotalItems() {
  const itemsInCart = document.createElement("h4");
  itemsInCart.innerText = "Antal: " + Math.round(totalItems);
  const totalSum = document.createElement("h4");
  totalSum.innerText = "Totalsumma: " + Math.round(totalPrice);

  const orderBtn = document.createElement("button")
  orderBtn.innerText = "Beställ"
  orderBtn.addEventListener("click", placeOrder);

  const eraseBtn = document.createElement("button")
  eraseBtn.innerText = "Rensa order"
  eraseBtn.addEventListener("click", clearBasket);

  numberOfProductsInMiniBasket.innerHTML = `${totalItems}st`;
  totalPriceInMiniBasket.innerHTML = `${Math.round(totalPrice)}kr`;

  totalPriceDisplay.innerHTML = "";
  totalPriceDisplay.append(itemsInCart, totalSum, orderBtn, eraseBtn)
}

function placeOrder () {
  if (cart.length > 0) {
    console.log(cart)
    console.log("click")
    let user = JSON.parse(localStorage.getItem("user"));
    console.log(JSON.stringify(user));

    let productsInCart = JSON.parse(localStorage.getItem("cart"))
    console.log(JSON.stringify(cart))

    let productArray = [];

    productsInCart.forEach((product) => {
    const newProduct = {productId: product._id, quantity: product.quantity};
    productArray.push(newProduct);
   });

   let order = {
      user: user._id,
      products: productArray
   };

   console.log(order);

    fetch("http://localhost:3000/api/orders/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify(order)
           })
           .then(res => res.json())
           .then(data => {
              console.log(data)
              console.log("Tack för din beställning");
              localStorage.removeItem("cart");
              calculateTotalPriceAndTotalItems();
            })
  } else {
    console.log("inga varor i varukorgen")
  }

}


// const removeBtn = document.querySelectorAll('.button-remove');
// removeBtn.forEach(btn => {
//   btn.addEventListener('click', remove);
// });

// function remove() {
//   if (products[this.dataset.id].amount > 0) {
//     products[this.dataset.id].amount -= 1;
//     renderProducts();
//   }
// }

//console.log(cart);

function clearBasket() {
  console.log("erase")
  cartGrid.innerHTML = '';
  localStorage.removeItem("cart");
}

function printViewOrdersBtn() {
  // SKAPA LOGGA UT KNAPP    
  let ordersBtn = document.createElement("button");
  ordersBtn.classList.add("orders-btn");
  ordersBtn.innerText = "Visa mina ordrar";


  ordersBtn.addEventListener("click", () => {
      console.log("clicked order btn")
  })
  loginApp.appendChild(ordersBtn);
}

function printUsersOrders() {

}

printCartItems();
calculateTotalPriceAndTotalItems();
//printProducts();
printCategories();
updateTotalPriceAndTotalItems();
