import { updateCartCounter } from "../js/addToCart.js";

const cartContainer = document.getElementById("cart__container");
const totalPriceElement = document.getElementById("cart__total__price");

const cart = JSON.parse(localStorage.getItem("cart")) || [];

updateCartCounter();

if (cart.length === 0) {
    cartContainer.innerHTML = "<p> Your cart is empty! </p>";
} else {
    let totalPrice = 0;
    cartContainer.innerHTML = "";

    cart.forEach(product => {
        totalPrice += product.price;

        const productElement = document.createElement("div");
        productElement.className = "cart__item";

        productElement.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="cart__item__image">
        <div class="cart__item__details">
        <h3>${product.title}</h3>
        <p>Price: $${product.price}</p>
        </div>
        `;

        cartContainer.appendChild(productElement);
    });
    totalPriceElement.textContent = totalPrice.toFixed(2);
};