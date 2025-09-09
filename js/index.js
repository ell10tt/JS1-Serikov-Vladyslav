import { updateCartCounter } from "./addToCart.js";

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

            card.className = "card";
            image.className = "card-image";
            content.className = "card-content";
            title.className = "card-title";
            price.className = "card-price";
            anchor.className = "card-link";
            genre.className = "card-genre";
            ageRating.className = "card-rating";

            image.src = product.image.url;
            image.alt = product.image.alt;
            title.textContent = product.title;
            price.textContent = product.price;
            genre.textContent = product.genre;
            ageRating.textContent = product.ageRating;
            anchor.href = `product/index.html?id=${product.id}`

            content.appendChild(title);
            content.appendChild(price);
            content.appendChild(genre);
            content.appendChild(ageRating);
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