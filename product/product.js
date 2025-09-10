import { updateCartCounter } from "../js/ui.js";
import { addToCart } from "../js/cart.js";


const container = document.querySelector("#container");
const API_URL = "https://v2.api.noroff.dev/gamehub";

async function fetchAndCreateProduct() {
    try {
        const param = new URLSearchParams(window.location.search);
        const id = param.get("id");

        if(!id) {
            container.textContent = "No product ID provided!";
            return;
        };

        const responce = await fetch(`${API_URL}/${id}`);
        const data = await responce.json();
        const product = data.data;

        const productDiv = document.createElement("div");
        const image = document.createElement("img");
        const title= document.createElement("h2");
        const price = document.createElement("p");
        const description = document.createElement("p");
        const backButton = document.createElement("a");
        const addToCartButton = document.createElement("button");

        addToCartButton.addEventListener("click", ()=> {
            const productToAdd = {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image.url
            };

            addToCart(productToAdd);

            addToCartButton.textContent = "Product was added!";
            addToCartButton.disabled = true;

            updateCartCounter();
        });

        productDiv.className = "product-details";
        image.className = "product-image";
        title.className = "product-title";
        price.className = "product-price";
        description.className = "product-description";
        backButton.className = "product-back-button";
        addToCartButton.className = "add-to-cart-button";

        image.src = product.image.url;
        image.alt = product.image.alt;
        title.textContent = product.title;
        price.textContent = `$${product.price}`;
        description.textContent = product.description;
        backButton.textContent = "Back to Products";
        addToCartButton.textContent = "Add To Cart";
        backButton.href = "../index.html";

        productDiv.appendChild(image);
        productDiv.appendChild(title);
        productDiv.appendChild(price);
        productDiv.appendChild(description);
        productDiv.appendChild(backButton);
        productDiv.appendChild(addToCartButton);

        container.appendChild(productDiv);
    } catch (error) {
        console.error("Failed to fetch product", error);
        container.textContent = "Failed to load product";
    };
};

fetchAndCreateProduct();
updateCartCounter();