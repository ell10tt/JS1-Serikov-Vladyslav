import { updateCartCounter } from "../js/ui.js";

const cartContainer = document.getElementById("cart__container");
const totalPriceElement = document.getElementById("cart__total__price");

const cart = JSON.parse(localStorage.getItem("cart")) || [];

updateCartCounter();

function removeItemFromCart (productId) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const updateCart = cart.filter(product => product.id !== productId);

    localStorage.setItem("cart", JSON.stringify(updateCart));

    window.location.reload();
}

if (cart.length === 0) {
    cartContainer.innerHTML = "<p> Your cart is empty! </p>";
} else {
    let totalPrice = 0;
    cartContainer.innerHTML = "";

    cart.forEach(product => {
        const itemTotalPrice = product.price * product.quantity;

        totalPrice += itemTotalPrice;

        const productElement = document.createElement("div");
        productElement.className = "cart__item";

        productElement.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="cart__item__image">
        <div class="cart__item__details">
        <h3>${product.title}</h3>
        <p>Price: $${product.price}</p>
        <p>Quantity: ${product.quantity}</p>
        </div>
        <button class="remove__from__cart__button" data-id="${product.id}">Remove</button>
        `;

        cartContainer.appendChild(productElement);
    });

    cartContainer.addEventListener("click", (event) =>{
        if (event.target.classList.contains("remove__from__cart__button")) {
            const productIdToRemove = event.target.dataset.id;

            removeItemFromCart(productIdToRemove);
        };
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
};