## Корзина (в процессе)
```javascript
sessionStorage.setItem('cart', JSON.stringify([
    { id: 1, quantity: 1 },
    { id: 2, quantity: 3 },
]));

document.addEventListener('DOMContentLoaded', updateDisplay);

function addToCart(productId, quantity) {
    const cart = getCart();
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ id: productId, quantity})
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }
    updateDisplay();
}




const btnInfo = document.getElementById('cart-btn');
const list = document.getElementById('cart-list');
const fragment = document.createDocumentFragment();

btnInfo.addEventListener('click', showCartInfo);


function showCartInfo() {
    const cart = getCart();

    cart.forEach(item => {
        const li = document.createElement('li');
        const btnRemove = document.createElement('button');

        btnRemove.textContent = 'remove';
        li.textContent += `ID: ${item.id}, quantity: ${item.quantity} `;

        li.appendChild(btnRemove);
        fragment.appendChild(li);

        btnRemove.addEventListener('click', function(){
           list.removeChild(this.parentElement);

           const deleteElement = cart.findIndex((element) => item.id === element.id);

            if (deleteElement != -1) {
                 cart.splice(deleteElement, 1);
                 sessionStorage.setItem('cart', JSON.stringify(cart));
                 updateDisplay();
            }
           
        })

    });

    list.appendChild(fragment);
}

function updateDisplay() {
    const cart = getCart();
    document.getElementById('cart-count').textContent = `Количество элементов в корзине: ${cart.reduce((sum, item) => sum += item.quantity, 0)}`;
}

function getCart() {
    return JSON.parse(sessionStorage.getItem('cart' || '[]'));
}

addToCart(3, 5);
addToCart(4, 5);
addToCart(5, 5);
addToCart(6, 5);

```







## Перебор элементов HTMLCollection на примере ссылок (возможные и рекомендуемые способы)
### Первичный код (мой)
```javascript
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM загружен');
});

const links = document.links; // HTMLCollection

for (let link of links) {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        console.log('Переход по ссылке запрещён');
    });
}
```

### Комментарии ИИ
В данном случае перебор через for-of подходит, поскольку это надёжный способ итерации HTMLCollection (document.links), это читаемо (код понятен и лаконичен), а также обеспечивает совместимость (поддерживается во всех современных браузерах).

Навешивать обработчики внутри `for-of` можно - код будет корректен и будет работать, но есть нюансы в плане производительности и альтернативные подходы:

### Потенциальные проблемы с производительностью**
1. Большое количество элементов. Если на странице сотни ссылок, цикл создаст сотни отдельных обработчиков, что:
    - увеличивает потребление памяти;
    - замедляет инициализацию страницы.
2. Дублирование функций. Каждая итерация создаёт новую функцию-обработчик (даже если код идентичен);
3. Сложность удаления обработчика. Чтобы удалить обработчики, придётся снова перебирать все элементы.

### Оптимальные альтернативы (лучший вариант)**
1. **Подвешиваем один обработчик на родительский элемент:**
```javascript
document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (event) => {
        const link = event.target.closest('a');
        if (link) {
            event.preventDefault();
            console.log('Переход по ссылке запрещён');
        }
    });
});
```
**Плюсы**
- Один обработчик вместо N;
- Меньше нагрузки на память;
- Проще управлять (один removeEventListener);
- Работает для динамически добавляемых ссылок;

**Минус**
- Сложнее логика (нужно проверять closest)

2. **Переиспользование функции-обработчика**
Если нужен именно перебор, необходимо избегать создания функций в цикле:
```javascript
const handleLinkClick = (event) => {
    event.preventDefault();
    console.log('Переход по ссылке запрещён');
};

for (const link of document.links) {
    link.addEventListener('click', handleLinkClick);
}
```
**Плюс**
- Экономия памяти (одна функция для всех элементов).

3. **forEach + Array.from()**
Если нужно использовать методы массива:
```javascript
Array.from(document.links).forEach(link => {
    link.addEventListener('click', handleLinkClick);
});
```
**Минус**
- Создаёт промежуточный массив, что избыточно для больших коллекций.


### Рекомендации
1. Для большинства случаев подходит делегирование событий (вариант 1);
2. Если нужно точно контролировать каждую ссылку -> переиспользовать функцию обработчик (вариант 2)
3. Избегайте создания функций внутри циклов, если их можно вынести наружу.
4. Не оптимизируйте заранее - если на странице 10-20 ссылок, разница в производительности незаметна.

**Итоговый оптимальный код**
```javascript
document.addEventListener('DOMContentLoaded', () => {
    const handleLinkClick = (event) => {
        const link = event.target.closest('a');
        if (link) {
            event.preventDefault();
            console.log('Переход по ссылке запрещён');
        }
    };

    document.body.addEventListener('click', handleLinkClick);
});
```
Этот подход:
- Масштабируется на любое количество ссылок;
- Минимизирует нагрузку на память;
- Просто в поддержке.



























## Добавление товаров в корзину

**Итоговый вариант**
```javascript
class CartManager {
    constructor() {
        this.cart = []; // Инициализируем пустым массивом, загрузим в init().
        this.list = document.getElementById('cart-list');
        this.btnInfo = document.getElementById('cart-btn');
        this.paragraph = document.getElementById('cart-count');

        if (!this.list || !this.btnInfo || !this.paragraph) {
            console.error('Не найдены необходимые DOM-элементы для корзины');
            return;
        }
    }

    init() {
        this.loadCartFromStorage(); // Загружаем данные из sessionStorage
        this.updateDisplay();
        this.setupButtonListener();
    }

    loadCartFromStorage() {
        try {
            const stored = sessionStorage.getItem('cart');
            this.cart = stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Ошибка загрузки корзины из sessionStorage:', error);
            this.cart = []; // Фолбек на пустую корзину
        }

        // Сохраняем, если не было данных (для консистентности)
        if (!sessionStorage.getItem('cart')) {
            sessionStorage.setItem('cart', JSON.stringify(this.cart));
        }
    }

    setupButtonListener() {
        this.btnInfo.addEventListener('click', () => this.toggleCartView());
    }

    addToCart(productId, quantity) {
        if (quantity <= 0 || !Number.isInteger(productId)) return;

        const existing = this.cart.find(item => item.id === productId);
        if (existing) {
            existing.quantity += quantity;
        } else {
            this.cart.push({ id: productId, quantity });
        }

        this.saveCartToStorage();
        this.updateDisplay();
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCartToStorage();
        this.updateDisplay();

        // Если список товаров виден, перерисовываем его
        if (this.list.style.display === 'block') {
            this.renderCartList();
        }
    }

    saveCartToStorage() {
        sessionStorage.setItem('cart', JSON.stringify(this.cart));
    }

    updateDisplay() {
        const totalQuantity = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        this.paragraph.textContent = `Количество товаров в корзине: ${totalQuantity}`;
    }

    toggleCartView() {
        this.renderCartList();

        const isVisible = this.list.style.display === 'block';
        this.list.style.display = isVisible ? 'none' : 'block';
        this.btnInfo.textContent = isVisible ? this.btnInfo.dataset.cartOpenContent : this.btnInfo.dataset.cartCloseContent;
    }

    renderCartList() {
        this.list.innerHTML = '';
        if (this.cart.length === 0) {
            this.list.innerHTML = '<li>Корзина пуста</li>';
            return;
        }

        this.cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. ID: ${item.id}, quantity: ${item.quantity}`;

            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Удалить';
            removeBtn.addEventListener('click', () => this.removeFromCart(item.id));
            li.appendChild(removeBtn);
            this.list.appendChild(li);
        });
    }
}

// Использование
const cartManager = new CartManager();
cartManager.init();
cartManager.addToCart(2, 10);
```

**Вёрстка для итогового варианта**
```html
    <p id="cart-count"></p>

    <button 
        type="button" 
        id="cart-btn" 
        data-cart-open-content="Посмотреть информацию о товарах"
        data-cart-close-content="Скрыть сведения о товарах"
    >Посмотреть информацию о товарах
    </button>

    <div class="content-info">
        <ul class="cart-info" style="display: none;" id="cart-list">
        </ul>
    </div>

    <!-- <form action="" id="form-form">
        <input type="text" id="form-input">
        <button type="submit" id="form-button">Отправить</button>
    </form> -->
```






























**Спорный вариант (лучше оставить без внимания)**
```javascript
class CartManager {
    constructor() {
        this.cart = JSON.parse(sessionStorage.getItem('cart' || '[]'));
        this.list = document.querySelector('.cart-info');
        this.btnInfo = document.querySelector('#cart-btn');
        this.paragraph = document.querySelector('#cart-count');

    if (!this.list || !this.btnInfo || !this.paragraph) {
        console.error('Не найдены необходимые DOM-элементы для корзины');
        return;
    }
}

    init() {
        // Создаём корзину с одним товаром по умолчанию
        // if (this.cart.length === 0) {
        //     this.cart = [{ id: 1, quantity: 1 }];
        //     sessionStorage.setItem('cart', JSON.stringify([]));
        // }

        // Не перезаписываем существующую корзину при повторном вызове init()
        if (!sessionStorage.getItem('cart')) {
            sessionStorage.setItem('cart', JSON.stringify([]));
        }
        sessionStorage.setItem('cart', JSON.stringify([]));
        this.updateDisplay();
        this.setupButtonListener();
    }

    setupButtonListener() {
        this.btnInfo.addEventListener('click', () => this.toggleCartView());
    }

    addToCart(productId, quantity) {
        if (quantity <= 0) return;

        const existing = this.cart.find(item => item.id === productId);
        if (existing) {
            existing.quantity += quantity;
        } else {
            this.cart.push({ id: productId, quantity });
        }

        sessionStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateDisplay();
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        sessionStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateDisplay();

        // Если список товаров виден, перерисовываем его
        if (this.list.style.display === 'block') {
            this.renderCartList();
        }
    }

    updateDisplay() {
        const totalQuantity = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        this.paragraph.textContent = `Количество товаров в корзине: ${totalQuantity}`;
    }

    toggleCartView() {
        this.renderCartList();

        const isVisible = this.list.style.display === 'block';
        this.list.style.display = isVisible ? 'none' : 'block';
        this.btnInfo.textContent = isVisible ? this.btnInfo.dataset.cartOpenContent : this.btnInfo.dataset.cartCloseContent;
    }

    renderCartList() {
        this.list.innerHTML = '';
        if (this.cart.length === 0) {
            this.list.innerHTML = '<li>Корзина пуста</li>';
            return;
        }

        this.cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. ID: ${item.id}, quantity: ${item.quantity}`;

            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Удалить';
            removeBtn.addEventListener('click', () => this.removeFromCart(item.id));
            li.appendChild(removeBtn);
            this.list.appendChild(li);
        });
    }
}

const ct = new CartManager();
ct.init();
ct.addToCart(2, 10);
// ct.addToCart(3, 10);
// ct.addToCart(4, 15);
```



**Мой первичный скрипт**
```javascript
document.addEventListener('DOMContentLoaded', updateToDisplay);

const list = document.querySelector('.cart-info');
const btnInfo = document.querySelector('#cartInfo');
btnInfo.addEventListener('click', showCartItems);

sessionStorage.setItem('cart', JSON.stringify([{ id: 1, quantity: 2 }]));

addToCart(2, 9);
addToCart(3, 10);
addToCart(4, 9);
addToCart(3, 2);
addToCart(9, 2);
addToCart(15, 9);


function addToCart(productId, quantity) {
    const cart = JSON.parse(sessionStorage.getItem('cart' || '[]'));
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ id: productId, quantity: quantity });
    }
    sessionStorage.setItem('cart', JSON.stringify(cart));
    updateToDisplay();
}

function updateToDisplay() {
    const cart = JSON.parse(sessionStorage.getItem('cart' || '[]'));
    document.getElementById('cartCount').textContent = `Количество товаров в корзине: ${cart.reduce((sum, item) => sum + item.quantity, 0)}`;
}

function showCartItems() {
    const cart = JSON.parse(sessionStorage.getItem('cart' || '[]'));
    let count = 1;
    if (cart.length != list.children.length) {
        cart.forEach(function(item){
            list.insertAdjacentHTML('beforeend', `<li>${count}. ID: ${item.id}, quantity: ${item.quantity}</li>`);
            count++;
        });
    }
    list.style.display = (list.style.display === 'block') ? 'none' : 'block'
    btnInfo.textContent = (list.style.display === 'block') ? btnInfo.dataset.cartCloseContent : btnInfo.dataset.cartOpenContent;
}
```

HTML
```html
    <p id="cartCount"></p>
    <button 
        type="button" 
        id="cartInfo" 
        data-cart-open-content="Посмотреть информацию о товарах"
        data-cart-close-content="Скрыть сведения о товарах"
    >Посмотреть информацию о товарах
    </button>

    <div class="content-info">
        <ul class="cart-info" style="display: none;">
        </ul>
    </div>
```


### Правки по коду
- `insertAdjacentHTML` добавляет элементы в конец списка, но не очищает старые. Если корзина изменится (например, товар удалят), список не обновится правильно - старые элементы останутся.

**Лучшее решение**
- Всегда очищать список перед заполнением: `list.innerHTML = '';`
- Заново генерировать весь список на основании текущей корзины
- Это проще, надёжнее и избегает дубликатов. Производительность не пострадает, если корзина не слишком большая. 

**Пример улучшенной функции**
```javascript
function showCartItems() {
    const cart = JSON.parse(sesstionStorage.getItem('cart' || '[]'));
    list.innerHTML = ''; // Очищаем список

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ID: ${item.id}, quantity: ${item.quantity}`;
        list.appendChild(li); // appendChild добавляет только 1 элемент за вызов, append несколько (через запятую)
    });

    // Переключаем видимость
    
    // Переключаем видимость
    list.style.display = (list.style.display === 'block') ? 'none' : 'block'
    btnInfo.textContent = (list.style.display === 'block') ? btnInfo.dataset.cartCloseContent : btnInfo.dataset.cartOpenContent;
}
```
- `createElement` безопаснее `insertAdjacentHTML` (меньше риска XSS, если данные из внешних источников).
- Нет условий - всегда актуальный список.
- Если корзина пуста, список просто очистится.

**Работа с data-атрибутами**
- Плюсы: позволяют хранить метаданные в HTML, что полезно для локализации (например, текст меняется на разных языках) или динамического изменения без правки JS. Это соответствует принципам разделения логики и представления (HTML отвечает за данные, JS - за поведение).
- Минусы: Если текст статичен и не меняется, это добавляет лишний код в HTML. Прямое использование строк в JS проще для маленьких проектов.

Использование:
- При изменении текста (через CMS или i18n). Это более гибко и соответствует современным практикам (в React/Vue часто используется подобных подход)
- В данном случае data-атрибуты разумны, так как они уже в HTML. Если проект растёт, нужно задуматься о библиотеке для локализации (например, i18next)

**Тернарник в showCartItems**
- Лучшее решение - использовать переменную состояния или `classList.toggle()` для переключения. Это делает код чище и избегает ошибок.
- Ещё лучше - добавить CSS-класс и использовать `list.classList.toggle('visible');` с соответствующим стилем (`.cart-info.visible { display: block }`). Это отделяет логику от стилей. Старайтесь объединить условия, но только если они логически связаны. В данном примере объединение возможно, но с переменной для ясности.
```javascript
function showCartItems() {
    const isVisible = list.style.display === 'block';
    list.style.display = isVisible ? 'none' : 'block';
    btnInfo.textContent = isVisible ? btnInfo.dataset.cartCloseContent : btnInfo.dataset.cartOpenContent;
}
```

**Правки по коду**
- Глобальные переменные `list`, `btnInfo` лучше инкапсулировать. Нет обработки ошибок (например, если sessionStorage недоступен). Код смешивает логику корзины и UI.

Предлагаемая структура:
- Использовать объект или класс для корзины (инкапсуляция);
- Разделение на модули: одна функция для работы с корзиной, другая – для UI.
- Добавить проверки (вроде `if (!cart) cart = [];`)

### Пример рефакторинга кода (в стилистике классов)
```javascript
document.addEventListener('DOMContentLoaded', () => {
    const cartManager = new CartManager();
    cartManager.init();
    // Инициализация товаров (можно вынести в отдельную функцию)
    cartManager.addToCart(2, 9);
    // ...
});

class CartManager {
    constructor() {
        this.list = document.querySelector('.cart-info');
        this.btnInfo = document.querySelector('#cartInfo');
        this.btnInfo.addEventListener('click', () => this.showCartItems());
    }

    init() {
        this.updateDisplay();
    }

    addToCart(productId, quantity) {
        let cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
        const existing = cart.find(item => item.id === productId);
        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.push({ id: productId, quantity });
        }
        sessionStorage.setItem('cart', JSON.stringify(cart));
        this.updateDisplay();
    }

    updateDisplay() {
        const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
        document.getElementById('cartCount').textContent = `Количество товаров в корзине: ${cart.reduce((sum, item) => sum + item.quantity, 0)}`;
    }

    showCartItems() {
        const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
        this.list.innerHTML = '';
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. ID: ${item.id}, quantity: ${item.quantity}`;
            this.list.appendChild(li);
        });
        const isVisible = this.list.style.display === 'block';
        this.list.style.display = isVisible ? 'none' : 'block';
        this.btnInfo.textContent = isVisible ? this.btnInfo.dataset.cartCloseContent : this.btnInfo.dataset.cartOpenContent;
    }
}
```





**Бэкап своего промежуточного варианта**
```javascript
document.addEventListener('DOMContentLoaded', () => {
    // Создание экземпляра класса 
    const buyer = new CartManager();

    // Инициация 
    buyer.init();

    // Работа с корзиной
    // buyer.addToCart(4, 2);

    buyer.showContentInfo();
});

class CartManager {
    constructor(cart, list, btnInfo, paragraph) {
        cart = this.cart,
        list = this.list,
        btnInfo = this.btnInfo,
        paragraph = this.count
    }

    cart = JSON.parse(sessionStorage.getItem('cart' || '[]'));
    list = document.querySelector('.cart-info');
    btnInfo = document.querySelector('#cart-btn');
    paragraph = document.querySelector('#cart-count');

    init() {
        sessionStorage.setItem('cart', JSON.stringify([
            { id: 1, quantity: 1 },
            // { id: 11, quantity: 11 },
            // { id: 21, quantity: 21 },
            // { id: 31, quantity: 31 },
            // { id: 41, quantity: 41 },
        ]));
    }

    addToCart(productId, quantity) {
        const existing = this.cart.find(item => item.id === productId);
        if (existing) {
            existing.quantity += quantity;
        } else {
            this.cart.push({ id: productId, quantity });
        }
        sessionStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateToDisplay();
    }

    updateToDisplay() {
        this.paragraph.textContent = `Количество товаров в корзине: ${this.cart.reduce((sum, item) => sum + item.quantity, 0)}`;
    }

    showContentInfo() {
        this.btnInfo.addEventListener('click', () => {
            this.list.innerHTML = '';

            this.cart.forEach((item, index) => {
                const li = document.createElement('li');
                li.textContent = `${index + 1}. ID: ${item.id}, quantity: ${item.quantity}`;
                this.list.appendChild(li);
            });

            const isVisible = this.list.style.display === 'block';
            this.list.style.display = isVisible ? 'none' : 'block';
            this.btnInfo.textContent = isVisible ? this.btnInfo.dataset.cartOpenContent : this.btnInfo.dataset.cartCloseContent;
        });
    }
}


const ct = new CartManager();
ct.addToCart(2, 5);
ct.addToCart(2, 5);
ct.addToCart(2, 5);
ct.addToCart(2, 5);
```
