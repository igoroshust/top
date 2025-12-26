- тег dialog

## Применение форм. Размещение элементов формы в HTML

HTML-формы используются сбора данных от пользователей (таких как текст, выбор, файлы). Формы отправляют данные на сервер через атрибуты `action` (URL для обработки) и `method` (GET или POST).

### Атрибут action

`action` указывает URL, на который будут отправлены данные формы при отправке. Например, если значение `action="/submit"`, то значение `/submit` означает относительный путь на том же домене (например, если страница на example.com/page, то запрос пойдёт на example.com/submit).

**Как работает**

1. Пользователь нажимает кнопку отправки;
2. Браузер собирает данные всех полей формы;
3. Данные отправляются на сервер по адресу, указанному в action;
4. Сервер обрабатывает данные (например, сохраняет в базу) и возвращает ответ.

**Варианты значений**

- Полный URL:

```html
<form action="https://example.com/submit"></form>
```

- Относительный путь:

```html
<form action="/api/contact"></form>
```

- Пустая строка (""): данные отправляются на текущий URL (полезно для SPA или серверной обработки на той же странице).

```html
<form action=""></form>
```

- Отсутствие `action`: поведение аналогично пустой строке (данные отправляются на текущий URL).

**Дополнительные нюансы**

- Метод отправки (GET/POST) задаётся атрибутом `method` (по умолчанию - GET);
- Для отправки файлов обязательно `method='post'` и `enctype="multipart/form-data"`
- Для обработки отправки через JS можно отменить стандартное поведение:

```javascript
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // Логика отправки.
});
```

### Основные элементы формы

- `<input>`: универсальный атрибут для ввода текста, паролей, чек-боксов, радиокнопок и т.д.
- `<textarea>`: для многострочного текста.
- `<select>`: выпадающий список со встроенными опциями (`<option>`).
- `<button>`: кнопка для отправки или действий.
- `<label>`: связывает текст с элементом формы для доступности. Нужно использовать всегда, поскольку повышает юзабилити для скринридеров.
- `<fieldset>` и `<legend>`: группируют элементы и добавляют заголовок. Fieldset объединяет связанные элементы (например, контактные данные), а legend добавляет заголовок.

**Размещение элементов формы**
Для блокового размещения используют div или p, это создаёт вертикальный поток

### Примеры

**Простая форма с блочным размещением**
HTML

```html
<form action="" id="contactForm" method="post">
  <fieldset>
    <legend>Личные данные</legend>
    <div class="contactForm__name">
      <label for="name">Имя:</label>
      <input type="text" id="name" name="name" required />
    </div>
    <div class="contactForm__genderGroup" aria-labelledby="gender-label">
      <label id="gender-label">Пол:</label>
      <input type="radio" id="male" name="gender" , value="male" />
      <!-- Атрибут name объединяет радиокнопки в группу -->
      <label for="male">Мужской</label>
      <input type="radio" id="female" name="gender" value="female" />
      <!-- Атрибут name объединяет радиокнопки в группу -->
      <label for="female">Женский</label>
    </div>

    <div class="contactForm__country">
      <label for="country">Страна</label>
      <select id="country" name="country">
        <option value="" selected disabled hidden>Укажите страну</option>
        <option value="us">США</option>
        <option value="ru">Россия</option>
        <option value="de">Германия</option>
      </select>
    </div>

    <div class="contactForm__messages">
      <label for="message">Сообщение:</label>
      <textarea
        name="message"
        id="message"
        rows="4"
        cols="50"
        placeholder="Введите текст..."
      ></textarea>
    </div>
    <!-- 
        <div id="gender-group">
            <label for="male">Пол:</label>
            <input type="radio" id="male" name="gender" , value="male" />
            <label for="male">Мужской</label>
            <input type="radio" id="female" name="gender" value="female" />
            <label for="female">Женский</label>
        </div> -->
  </fieldset>

  <fieldset>
    <legend>Интересы</legend>
    <div class="contactForm__interests">
      <input type="checkbox" id="sports" name="interests" value="sports" />
      <label for="sports">Спорт</label>
      <input type="checkbox" id="music" name="interests" value="music" />
      <label for="music">Музыка</label>
    </div>
  </fieldset>
  <button type="submit">Отправить</button>
</form>

<form action="" id="surveyForm" name="surveyForm">
  <!-- name служит идентификатором формы при отправке данных на сервер -->
  <input type="email" name="email" />
  <button type="submit">Отправить</button>
</form>
```

JS

```javascript
document
  .getElementById("contactForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
      const response = await fetch("https://httpbin.org/post", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer myToken123",
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Ошибка: ", response.status);

      const data = await response.json();
      console.log("Отправлено:", data.form);
    } catch (error) {
      console.error("Ошибка: ", error);
    }
  });
```

## Дополнительно

`aria-labelledby` - это ARIA-атрибут, связывающий элемент с одним или несколькими другими элементами на странице, содержащими текст, который должен использоваться в качестве его метки (названия). Используется для групп элементов, где стандартные label не подходят (например, радиокнопки или чекбоксы без индивидуальных label). Связывает общую метку (через id) с группой элементов, помогая скринридерам понять структуру.

## Коллекция Forms

Коллекция `document.forms` представляет собой HTMLCollection всех элементов `<form>` на странице. Благодаря Forms можно программно обращаться к формам, их элементам и данным. Коллекция доступна через объект `document` и обновляется динамически при изменении DOM. Она полезна для валидации, отправки данных или манипуляции формами без прямого доступа к элементам.

### Основные свойства и методы коллекции Forms

- **Доступ к коллекции**: `document.forms` возвращает HTMLCollection (массивоподобную структуру данных).
- **Индексация**: Лоступ по индексу (начиная с 0): `document.forms[0]`.
- **Доступ по имени**: Если у формы есть атрибут `name`, можно использовать `document.forms['formName']`.
- **Длина коллекции**: `document.forms.length` - количество форм на странице.
- **Перебор**: Можно использовать цикл for или forEach (после преобразования в массив с `Array.from()`).
- **Связь с элементами формы**: Каждая форма имеет свойство `elements`, которое является коллекцией всех элементов внутри неё (inputs, selects, и тд).

### Примеры

**Пример-1. Работа с элементами forms**
HTML (Форма из описания выше)
JS

```javascript
console.log(document.forms.length);

console.log("document.forms :>> ", document.forms);

for (let i = 0; i < document.forms.length; i++) {
  console.log(`Форма "${i}": ${document.forms[i].getAttribute("name")}`);
}
```

**Пример-2. Доступ к элементам**
HTML (Форма из описания выше)

JS

```javascript
// Доступ к форме по имени
const form = document.forms["contactForm"];

// Доступ к элементу по имени
const nameInput = form.elements["name"];
console.log("nameInput :>> ", nameInput);
console.log("Значение поля name:", nameInput.value);

// Изменение значения
nameInput.value = "Изм";

// Перебор всех элементов формы
for (let element of form.elements) {
  console.log("Элемент:", element.name, "Тип:", element.type);
}
```

**Пример-3. Отображение пользовательских данных в форме**
HTML (выше)
JS

```javascript
const form = document.forms["contactForm"];

// Добавляем обработчик события submit
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Простая валидация
  const name = form.elements["name"].value;
  const email = form.elements["email"].value;
  const gender = form.elements["gender"].value; // Для радиокнопок это работает, если одна выбрана
  const country = form.elements["country"].value;
  const message = form.elements["message"].value;

  // Для чекбоксов: перебираем коллекцию и собираем отмеченные значения
  const interestsElements = form.elements["interests"]; // Коллекция чекбоксов
  const interests = Array.from(interestsElements) // Преобразуем в массив
    .filter(checkbox => checkbox.checked) // Оставляем только отмеченные
    .map(checkbox => checkbox.value); // Берём их значения

  console.log("name :>> ", name);
  console.log("email :>> ", email);
  console.log("gender :>> ", gender);
  console.log("country :>> ", country);
  console.log("message :>> ", message);
  console.log("interests :>> ", interests); // Теперь массив, например: ['sports', 'music']

  if (!name || !email) {
    alert("Заполните все поля!");
    return;
  }

  // Имитация отправки (в реальности используйте fetch или XML)
  console.log("Отправка данных:", {
    name,
    email,
    gender,
    country,
    message,
    interests,
  });
  alert("Форма отправлена");
});
```

**Пример-4. Перебор всех форм и их элементов**
JS

```javascript
// Перебор всех форм и их элементов
Array.from(document.forms).forEach((form, index) => {
  console.log(`Форма ${index}: ${form.getAttribute("name")}`);
  Array.from(form.elements).forEach((element) => {
    console.log(`Элемент: ${element.name} (${element.type})`);
  });
});
```
