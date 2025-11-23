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
        this.setupButtonListener();
        this.updateDisplay();
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