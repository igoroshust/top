sessionStorage.setItem('cart', JSON.stringify([{ id: 1, quantity: 1 }]));

// Описываем логику обработки товаров в корзине (подсчёт количества)
function addToCart(productId, quantity){
    const cart = JSON.parse(sessionStorage.getItem('cart' || '[]'));
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ id: productId, quantity });
    }
    sessionStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Обновляем количество товаров (если увеличили количество имеющегося)
function updateCartDisplay(){
    const cart = JSON.parse(sessionStorage.getItem('cart' || '[]'));
    document.getElementById('cartCount').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

document.addEventListener('DOMContentLoaded', updateCartDisplay);

addToCart(1, 2);