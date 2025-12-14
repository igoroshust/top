https://www.blackbox.ai/chat/876K65M

## Что такое DOM?
`DOM (Document Object Model)` - это программный интерфейс, предоставляющий HTML- или XML-документ в виде древовидной структуры объектов. Каждый элемент документа (теги, атрибуты, текст) становится узлом в этом дереве, что позволяет программам (например, JavaScript) динамически читать, изменять, добавлять или удалять части документа. DOM стандартизирован W3C и является частью веб-стандартов.

DOM представляет структуру документа как дерево узлов (объектов), где каждый элемент, атрибут или текстовый фрагмент является узлом. DOM позволяет JavaScript динамически взаимодействовать с веб-страницей: изменять содержимое, структуру, стили и обрабатывать события. DOM стандартизирован W3C и является основой для веб-разработки.

DOM не является частью JavaScript, но предоставляется браузерами как API. Когда браузер загружает HTML, он строит DOM-дерево на основе разметки. Это дерево можно модифицировать через скрипты, что делает страницы интерактивными.


**DOM наглядно**

![alt text](image.png)


### **Ключевые аспекты DOM**
- Структура. Документ представлен как дерево узлов. Корень – объект `document`, затем идут элементы (например, html, body), атрибуты и текстовые узлы.
- Методы и свойства: Позволяют манипулировать содержимым, стилем и поведением: `document.getElementById()`, `element.innerHTML`, `document.createElement()`.
- Типы узлов: Element (тег), Text (текстовое содержимое элемента), Comment (комментарий), Document (корневой узел всего дом-дерева), DocumentType (объявление типа документа `<!DOCTYPE html>`), Attribute (атрибуты элемента: `id`, `class`, `src`), DocumentFragment (фрагмент дом-дерева - контейнер для узлов, который сам не является частью основного дерева - используется для эффективной вставки группы элементов в документ `appendChild()`, `insertBefore()` - пример: `document.createDocumentFragment()`), CDATASection (предоставляет секцию CDATA в XML - используется для включения текста, который может содержать символы, обычно интерпретируемые как разметка, в HTML практически не применяется), ProcessingInstruction (соответствует инструкции обработки в XML), EntityReference (предоставляет ссылку на сущность в XML).
- События: DOM поддерживает обработку событий (например, клики, загрузка страницы);
- Обновление: Изменения в DOM отражаются в браузере в реальном времени (рендеринг);

DOM не зависит от браузера и работает в любых средах, поддерживающих HTML/XML (например, Node.js с библиотеками вроде jsdom)

**Пример создания нового DOM-элемента**
```javascript
const newElement = document.createElement('p');

newElement.innerText = 'New Element Value';
document.body.appendChild(newElement); // Покажет 'New Element Value" на странице
```

**Пример вставки элемента с insertBefore()**
```javascript
const parent = document.querySelector('.parent');
const target = document.querySelector('.target');

const newP = document.createElement('p');
newP.innerText = 'new value';

parent.insertBefore(newP, target);

    <div class="parent">
        <!-- Вставка -->
        <p  class="new">new value</p>

        <p class="target">Target</p>
    </div>
```


**Вывод document'a в консоле**
```javascript
console.log(document);
```
![alt text](image-1.png)



## Что такое BOM?
`BOM (Browser Object Model)` - это неформальный набор объектов и интерфейсов, предоставляемых браузером для взимодействия с самим браузером и его окружением.
BOM не стандартизирован W3C (в отличие от DOM), но включает объекты, такик как `window`, `navigator`, `location`, `history`, `screen`. Эти объекты позволяют управлять окнами, навигацией, историей, геолокацией и другими аспектами браузера. (wi lo hi na sc)

![alt text](image-3.png)


### Ключевые аспекты BOM
- **Объекты**: Основной - `window` (глобальный объект, представляющий окно браузера). Другие: `navigator` (информация о браузере), `location` (URL и навигация), `history` (история просмотров), `screen` (экран устройства), `localStorage/sessionStorage` (хранение данных).

- **Функциональность**: BOM позволяет открывать новые окна (`window.open()`), управлять историей (`history.back()`), получать данные о пользователе (`navigator.geolocation`).

- **Не стандартизировано**: Поведение BOM может различаться между браузерами (IE, Chrome), хотя основные объекты схожи.

- **Связь с DOM**: DOM является частью BOM, так как `document` - это свойство `window` (`window.document`).

BOM фокусируется на браузере как на платформе, а не на содержимом документа.


### Отличия между DOM и BOM
Хотя DOM и BOM часто упоминаются вместе (и DOM считается подмножеством BOM), они решают разные задачи. Вот исчерпывающий разбор отличий:

| Аспект | DOM | BOM |
|-----------|-----------|-----------|
|     Фокус      |   Структура и содержимое HTML/XML-документа        | Браузер и его окружение (окна, навигация, устройства)          |
|       Стандартизация    |    Полностью стандартизирован W3C       |   Не стандартизирован, зависит от браузера        |
|        Основной объект   |     document (корень дерева документа)      |  window (глобальный объект браузера)         |
|      Функции     |      Манипуляция элементами: добавление/удаление узлов, изменение атрибутов, стилей, текста     |  Управление браузером: открытие окон, навигация, история, геолокация, информация о устройстве         |
|    Примеры объектов/методов       |    document.getElementById(), element.appendChild(), document.querySelector()    | window.alert(), navigator.userAgent, location.href, history.pushState()          |
|   Зависимость        |  Работает в любых средах с документами (браузер, сервер)         | Тесно связан с браузером; не работает вне его (например, в Node.js без эмуляции)          |
|    События       |    События документа (например, click на элементе)       |  События браузера (resize окна, beforeunload и т.д.)         |
|   Обновление        |  Изменения влияют на рендеринг документа         |  Изменения влияют на поведение браузера (например, перенаправление)         |
|    Безопасность       |  Ограничения на доступ к документу (CORS, same-origin policy)         |  Дополнительные ограничения (например, геолокация требует разрешения пользователя)         |


**Ключевой нюанс**: DOM - это модель документа внутри BOM. Вы можете получить доступ к DOM через BOM: `window.document`. BOM шире и включает DOM как один из компонентов. Если DOM - это "дерево страницы", то BOM - это "лес браузера".


### Примеры с BOM
Пример-1 (Взаимодействие с браузером)
```html
<!DOCTYPE html>
<html>
<head>
    <title>BOM Example</title>
</head>
<body>
    <button onclick="showInfo()">Показать информацию о браузере</button>
    <script>
        function showInfo() {
            // BOM: информация о браузере
            alert('User Agent: ' + navigator.userAgent);
            
            // BOM: текущий URL
            alert('Текущий URL: ' + location.href);
            
            // BOM: открыть новое окно
            window.open('https://example.com', '_blank');
            
            // BOM: история (назад)
            // history.back(); // Раскомментируйте для теста
        }
        
        // BOM: событие изменения размера окна
        window.addEventListener('resize', () => {
            console.log('Окно изменено: ' + window.innerWidth + 'x' + window.innerHeight);
        });
    </script>
</body>
</html>
```

Пример-2 (Комбинация BOM и DOM)
```javascript
// BOM: доступ к DOM через window
window.onload = function() {
    // DOM: изменение документа
    document.body.style.backgroundColor = 'lightblue';
    
    // BOM: вывод в консоль браузера
    console.log('Страница загружена. Ширина экрана: ' + screen.width);
};
```

### Дополнительная информация и ресурсы
- История: DOM эволюционировал от ранних версий (DOM Level 0) до современных (DOM Level 4). BOM появился раньше и не стандартизирован, но его объекты описаны в спецификациях вроде HTML5.

- Современные аналоги. Для манипуляции DOM часто используют библиотеки вроде jQuery (упрощает селекторы), или нативные API вроде `querySelector`. BOM расширяется с новыми API (например, Service Workers для оффлайн-работы).

- Ограничения. В строгих режимах (например, CSP) некоторые BOM-функции могут быть заблокированы. DOM может быть медленным при больших деревьях – используйте виртуальный DOM (как в React).

- Тестирование. В браузере используется DevTools, для серверной среды - jsdom.


**BOM и DOM наглядно**
![alt text](image-2.png)


## Управление выделением и текстовым диапазоном: объекты Selection и textRange

https://www.blackbox.ai/chat/HzZhSaT

В JS управление выделением текста и текстовыми диапазонами позволяет программно работать с пользовательским выделением (например, в текстовых полях или на странице). Основные объекты:
- **Selection**: Современный стандартный API (поддерживается в Chrome, Firefox, Safari и т.д.), доступный через `window.getSelection()`. Он предоставляет текущее выделение и позволяет манипулировать им.

- **TextRange**: Устаревший объект, специфичный для Internet Explorer (IE) и ранних версий Edge. Он используется для создания и управления диапазонами текста в IE. В современных браузерах рекомендуется использовать Selection и Range API.

Эти объекты полезны для задач вроде копирования текста, поиска, редактирования или создания инструментов вроде текстовых редакторов. 

### Selection
Selection - это объект, представляющий выделение текста в документе. Он не является частью DOM, а скорее интерфейсом для работы с выделенными частями. Доступ к нему: `const selection = window.getSelection();`.

**Основные свойства**
- `anchorNode` и `anchorOffset`: Узел и позиция начала выделения.
- `focusNode` и `focusOffset`: Узел и позиция конца выделения.
- `rangeCount`: Количество диапазонов в выделении (обычно 1 для простого выделения);
- `isCollapsed`: `true`, если выделение пустое (курсор без текста)

**Основные методы**
- `getRangeAt(index)`: Возвращает объект `Range` для указанного диапазона (индекс от 0);
- `addRange(range)`: Добавляет диапазон к выделению;
- `removeAllRanges()`: Очищает всё выделение;
- `removeRange(range)`: Удаляет конкретный диапазон;
- `selectAllChildren(node)`: Выделяет все дочерние элементы узла;
- `collapse(node, offset)`: Сворачивает выделение в точку (курсор);
- `extend(node, offset)`: Расширяет выделение до указанной точки.

Selection работает с объектами `Range` (для точного управления диапазонами текста). Выделение может быть пустым или содержать текст из нескольких элементов.

**Пример-1. Выделить текст**
```javascript
const element = document.getElementsByTagName('h1');
const sel = window.getSelection();
sel.selectAllChildren(element); // Выделит весь текст
```


**Пример-2. Получить выделенный текст**
```javascript
const selection = window.getSelection();
const selectedText = selection.toString();
console.log(selection); // Выведет выделенный текст, если естьы
```

**Пример-3. Установить выделение в input/textarea**
```javascript
const input = document.getElementById('myInput');
input.focus(); // Сначала фокус
input.setSelectionRange(0, 5); // Выделить символы с 0 до 5
```

**Пример-4. Выделение текста для contenteditable-элементов**
```javascript
const div = document.querySelector('.test');

// Создаём диапазон
const range = document.createRange();
const selection = window.getSelection();

// Находим текстовый узел внутри div (обычно firstChild)
const textNode = div.firstChild;

// Устанавливаем границы выделения
range.setStart(textNode, 0); // Начало: позиция 0
range.setEnd(textNode, textNode.length-4); // Конец: длина текста

// Применяем выделение
selection.removeAllRanges();
selection.addRange(range);
```

**Пример-5. Расширить выделение (код из примера 4 должен быть запущен)**
```javascript
const selection = window.getSelection();
if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0); // метод getRangeAt(index) возвращает объект Range по указанному индексу из текущего выделения
    range.setEnd(range.endContainer, range.endOffset + 4) // Расширить на 10 символов

    // endContainer - свойство указывает узел DOM, в котором находится конечная точка диапазона.
    // endOffset - свойство показывает позицию внутри endContainer, где заканчивается диапазон.

    selection.removeAllRanges();
    selection.addRange(range);
}
```

**Пример-6. Снять выделение**
```javascript
window.getSelection().removeAllRanges();
```

Selection работает асинхронно и обновляется при взаимодействии пользователяю Для событий используйте `document.onselectionchange`.


### TextRange (Устаревший, для IE)
TextRange - объект для работы с выделением в старых версиях IE (до IE9). Доступ через `document.selection.createRange()`. Он менее гибкий, чем Selection, и работает только с текстовыми элементами.

**Ключевые свойства и методы**
- text - получить/установить текст диапазона
- htmlText - получить html-текст
- moveStart(unit, count) / moveEnd(unit, count) - сдвинуть начало/конец (unit: 'character', 'word', и тд)
- select() - выделить диапазон
- collapse(bool) - свернуть (true - в начало, false - в конец)
- duplicate() - клонировать диапазон
- parentElement() - получить родительский элемент

#### Примеры для IE

**Пример-1. Получить выделенный текст**
```javascript
if (document.selection) { // Проверка для IE
    const range = document.selection.createRange();
    const selectedText = range.text;
    console.log(selectedText);
}
```

**Пример-2. Выделить текст в элементе**
```javascript
const element = document.getElementById('myDiv');

if (document.selection) {
    const range = document.body.createTextRange(); // Или element.createTextRange()
    range.moveToElementText(element); // Переместить к тексту элемента
    range.select(); // Выделить
}
```

**Пример-3. Установить диапазон**
```javascript
if (document.selection) {
    const range = document.seleciton.createRange();
    range.moveStart('character', 5); // Сдвинуть начало на 5 символов
    range.moveEnd('character', -3); // Сдвинуть конец на -3 
    range.select();
}
```

**Пример-4. Расширить выделение**
```javascript
if (document.selection) {
    const range = document.seleciton.createRange();
    range.moveEnd('character', 10);
    range.select();
}
```
TextRange не поддерживает множественные диапазоны и работает только с текстом, без сложных DOM-узлов.

**Рекомендации**
- Использовать Selection для новых проектов - он стандартизирован W3C и поддерживается везде, кроме очень старых IE.
- Для IE добавляйте полифиллы или проверки
- Быть осторожным с contenteditable: Selection может конфликтовать с браузерными событиями
- Для более сложных задач (например, в редакторах) ко вниманию библиотеки вроде Quill или TimyMCE, которые абстрагируют эти API.