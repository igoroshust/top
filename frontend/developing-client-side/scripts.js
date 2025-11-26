document.addEventListener('DOMContentLoaded', updateDisplay);
sessionStorage.setItem('cart', JSON.stringify([
    {id: 1, quantity: 1},
    {id: 2, quantity: 1},
]));

const btn = document.getElementById('cart-btn');

btn.addEventListener('click', showCartInfo);

// deleteBtn.addEventListener('click', deleteCartItem);

function showCartInfo() {
    const list = document.getElementById('cart-list');
    const cart = getCart();
    const fragment = document.createDocumentFragment();
    list.innerHTML = '';

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        const deleteBtn = document.createElement('button');
        
        console.log(`Итерация №${index + 1}`);
        li.textContent = `ID: ${item.id}, quantity: ${item.quantity}`;
        deleteBtn.textContent = 'remove';

        li.appendChild(deleteBtn);

        fragment.appendChild(li);
        // list.appendChild(li);

        deleteBtn.addEventListener('click', () => {
            // console.log(deleteBtn.parentElement);
            deleteBtn.parentElement.remove();
            console.log(`ID удаляемого элемента: ${item.id}`);
            console.log(JSON.parse(sessionStorage.getItem('cart'))[item.id - 1]);
            sessionStorage.removeItem(JSON.parse(sessionStorage.getItem('cart'))[item.id - 1]);
        });
    });

    list.append(fragment);
}

function getCart() {
    const cart = JSON.parse(sessionStorage.getItem('cart' || '[]'));
    return cart
}

function addToCart(productId, quantity) {
    const cart = getCart();
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ id: productId, quantity });
    }
    sessionStorage.setItem('cart', JSON.stringify(cart));
    updateDisplay();
}

function updateDisplay() {
    const cart = getCart();
    document.getElementById('cart-count').textContent = `Количество товаров в корзине: ${cart.reduce((sum, item) => sum + item.quantity, 0)}`
}

// setTimeout(() => {
//     addToCart(1, 10);

//     setTimeout(() => {
//         addToCart(3, 5);
//     }, 5000);
// }, 3000);


