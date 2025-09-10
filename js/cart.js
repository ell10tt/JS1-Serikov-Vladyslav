export function addToCart (product) {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = currentCart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        product.quantity = 1;
        currentCart.push (product);
    };

    localStorage.setItem ("cart", JSON.stringify(currentCart));
};