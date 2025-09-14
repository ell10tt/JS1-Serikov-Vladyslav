import { updateCartCounter } from "./ui.js";
import { addToCart } from "./cart.js";

const container = document.querySelector("#container");
const filterContainer = document.querySelector("#filter");
const API_URL = "https://v2.api.noroff.dev/gamehub";

let allGames = [];

function displayGames(gamesToDisplay) {
    container.replaceChildren();

    gamesToDisplay.forEach(product => {
        const card = document.createElement("div");
        const image = document.createElement("img");
        const content = document.createElement("div");
        const title = document.createElement("h2");
        const price = document.createElement("p");
        const anchor = document.createElement("a");
        const genre = document.createElement("p");
        const ageRating = document.createElement("p");
        const addToCartButton = document.createElement("button");

        card.className = "card";
        image.className = "card__image";
        content.className = "card__content";
        title.className = "card__title";
        price.className = "card__price";
        anchor.className = "card__link";
        genre.className = "card__genre";
        ageRating.className = "card__rating";
        addToCartButton.className = "add__to__cart__button";

        image.src = product.image.url;
        image.alt = product.title;
        title.textContent = product.title;
        price.textContent = product.price;
        genre.textContent = product.genre;
        ageRating.textContent = product.ageRating;
        addToCartButton.textContent = "Add To Cart";
        anchor.href = `product/index.html?id=${product.id}`;

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
            updateCartCounter();

            addToCartButton.textContent = "Product was added!";
            addToCartButton.disabled = true;

            setTimeout(() => {
                addToCartButton.textContent = "Add To Cart";
                addToCartButton.disabled = false;
            }, 500);
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
    });
}

function setupFilterButtons() {
    const genres = ["Action", "Adventure", "Sports", "Horror"];

    const allButton = document.createElement("button");
    allButton.className = ("all__button");
    allButton.textContent = "All Games";
    allButton.addEventListener("click", () => {
        displayGames(allGames);
    });
    filterContainer.appendChild(allButton);

    genres.forEach(genre => {
        const button = document.createElement("button");
        button.className = ("filter__button");
        button.textContent = genre;
        button.addEventListener("click", () => {
            const filteredGames = allGames.filter(game => game.genre === genre);
            displayGames(filteredGames);
        });
        filterContainer.appendChild(button);
    });
}

async function fetchAndCreateProduct() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        allGames = data.data;

        displayGames(allGames);
        setupFilterButtons();
    } catch (error) {
        container.textContent = "Failed to load product";
    }
};

fetchAndCreateProduct();
updateCartCounter();