export function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const counterElement = document.getElementById("cart__counter");

    if (counterElement) {
        counterElement.textContent = cart.length;
    };
};

export function changeTitleName(product) {
    document.title = `Product: ${product.title}`
};