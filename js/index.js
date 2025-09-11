import { updateCartCounter } from "./ui.js";
import { addToCart } from "./cart.js";

const container = document.querySelector("#container");
const API_URL = "https://v2.api.noroff.dev/gamehub";

async function fetchAndCreateProduct() {
    try {
        const responce = await fetch(API_URL);
        const data = await responce.json();
        const products = data.data;

        products.forEach (product =>{
            const card = document.createElement("div");
            const image = document.createElement("img");
            const content = document.createElement("div");
            const title= document.createElement("h2");
            const price = document.createElement("p");
            const anchor = document.createElement("a");
            const genre = document.createElement("p");
            const ageRating = document.createElement("p");
            const addToCartButton = document.createElement("button");
            
            card.className = "card";
            image.className = "card-image";
            content.className = "card-content";
            title.className = "card-title";
            price.className = "card-price";
            anchor.className = "card-link";
            genre.className = "card-genre";
            ageRating.className = "card-rating";
            addToCartButton.className = "add__to__cart__button";

            image.src = product.image.url;
            image.alt = product.image.alt;
            title.textContent = product.title;
            price.textContent = product.price;
            genre.textContent = product.genre;
            ageRating.textContent = product.ageRating;
            addToCartButton.textContent = "Add To Cart";
            anchor.href = `product/index.html?id=${product.id}`

            addToCartButton.addEventListener("click", (event) => {
                event.preventDefault();
                event.stopPropagation();

                const productToAdd = {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image.url
            };

            addToCart(productToAdd);

            addToCartButton.textContent = "Product was added!";
            addToCartButton.disabled = true;
            // change here

            updateCartCounter();
            });

            content.appendChild(title);
            content.appendChild(price);
            content.appendChild(genre);
            content.appendChild(ageRating);
            content.appendChild(addToCartButton);
            card.appendChild(image);
            card.appendChild(content);
            anchor.appendChild(card);

            container.appendChild(anchor);
        })
    } catch (error) {
        console.error("Failed to fetch and create products", error);
    }
};

fetchAndCreateProduct();
updateCartCounter();