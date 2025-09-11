import { updateCartCounter } from "./ui.js";

updateCartCounter();

const form = document.getElementById("payment__form");
const totalPriceElement = document.getElementById("total__price");
const payButton = document.getElementById("pay__button");

const cart = JSON.parse(localStorage.getItem("cart")) || [];

let totalPrice = 0;

cart.forEach (item => {
    totalPrice += item.price * item.quantity;
});

if (totalPriceElement) {
    totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
};

payButton.addEventListener("click", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
        alert ("Please fill all data");
        return;
    };

    localStorage.removeItem("cart");

    alert("Payment successfull! Thank you!");

    window.location.href = payButton.href;
});