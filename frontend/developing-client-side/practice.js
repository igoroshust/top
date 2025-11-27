/* 

1. В формах регистрации/входа нужно сохранять данные, чтобы пользователь не терял ввод при перезагрузке страницы. 
Сценарий: Пользователь заполняет форму; данные сохраняются и восстанавливаются при возврате.

2. - Кейс: есть модальное окно (overlay), нужно реализовать механизм, позволяющий закрыть модальное окно при клике на фон (overlay), но не закрывать его при клике внутри самого модального контента.
- Применение: Назначить обработчик на корневом элементе (document.body или другом) с `capture: true`, он сработает первым и остановит распространение, если клик не на модальном контенте.
```html
<div id="overlay" class="overlay">
    <div id="modal" class="modal">
        <p>Содержимое модала</p>
        <button id="closeBtn">Закрыть</button>
    </div>
</div>
```

```javascript
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');

// 1. Захват на overlay: перехватывает клики до их достижения дочерних элементов
overlay.addEventListener('click', function(event) {
    if (event.target === overlay) { // Клик именно на фоне
        modal.style.display = 'none'; // Закрыть модальное окно
        event.stopPropagation(); // Остановить дальнейшее распространение
    }
}, { capture: true });

// 2. Обработчик на модальном контенте: предотвращает закрытие при клике внутри
modal.addEventListener('click', function(event) {
    event.stopPropagation(); // Остановить всплытие, чтобы событие не дошло до overlay
});
```

3. Кейс: отменить переход по ссылке:
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && !confirm('Уйти без сохранения?')) {
        e.preventDefault(); // Отменить переход
        e.stopPropagation(); // Остановить распространение
    }
}, { capture: true });


4. Группировка элементов с помощью reduce
const pets = [
  { type: 'dog', name: 'Max' },
  { type: 'cat', name: 'Luna' },
  { type: 'dog', name: 'Buddy' }
];

const grouped = pets.reduce((acc, pet) => {
    acc[pet.type] = acc[pet.type] || [];
    acc[pet.type].push(pet);
    return acc;
}, '');

console.log(grouped);


4. Пример-2 (преобразование объектов)
```javascript
const users = [{name:'Alice'}, {name:'Bob'}];
const names = users.map(user => user.name);
console.log(names); // ['Alice', 'Bob']
```

*/







/* Пример работы над корзиной */
sessionStorage.setItem('cart', JSON.stringify([{id: 1, quantity: 1}]));

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

document.addEventListener('DOMContentLoaded', updateDisplay);

// setTimeout(() => {
//     addToCart(1, 10);

//     setTimeout(() => {
//         addToCart(3, 5);
//     }, 5000);

// }, 3000);



