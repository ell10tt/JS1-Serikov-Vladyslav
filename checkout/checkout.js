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
    
    const emptyCart = document.createElement("p");

    emptyCart.textContent = "Your cart is empty!";

    emptyCart.className = "cart__message";

    cartContainer.appendChild(emptyCart);

} else {
    let totalPrice = 0;

    cartContainer.replaceChildren();

    cart.forEach(product => {
        const itemTotalPrice = product.price * product.quantity;

        totalPrice += itemTotalPrice;

        const productElement = document.createElement("div");
        const imageElement = document.createElement("img");
        const detailDiv = document.createElement("div");
        const titleElement = document.createElement("h3");
        const priceElement = document.createElement("p");
        const quantityElement = document.createElement("p");
        const removeButton = document.createElement("button");
        
        
        productElement.className = "cart__item";
        imageElement.className = "cart__item__image";
        detailDiv.className = "cart__item__details";
        titleElement.className = "cart__title";
        priceElement.className = "cart__item__price";
        quantityElement.className = "cart__item__quantitu";
        removeButton.className = "remove__from__cart__button";
        
        imageElement.src = product.image;
        imageElement.alt = product.title;
        titleElement.textContent = product.title;
        priceElement.textContent = `Price: $${product.price}`;
        quantityElement.textContent = `Quantity: ${product.quantity}`;
        removeButton.textContent = "Remove";

        removeButton.dataset.id = product.id;

        detailDiv.appendChild(titleElement);
        detailDiv.appendChild(priceElement);
        detailDiv.appendChild(quantityElement);

        productElement.appendChild(imageElement);
        productElement.appendChild(detailDiv);
        productElement.appendChild(removeButton);

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