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
    .filter((checkbox) => checkbox.checked) // Оставляем только отмеченные
    .map((checkbox) => checkbox.value); // Берём их значения

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

## Основы создания элементов формы

Формы в веб-разработке используются для сбора данных от пользователей. Они создаются с помощью специального тега `<form>`, внутри которого располагаются элементы управления (inputs, buttons, selects, etc). Каждый элемент имеет атрибуты для настройки поведения, типа данных и валидации. Основные элементы:

- input: универсальный элемент для ввода данных (текст, пароль, чекбоксы, радиокнопки). Атрибут type определяет тип (email, submit, text, password, file, number, checkbox, radio, date, hidden);
- textarea: для многострочного текста;
- select: выпадающий список с опциями (`<option>`);
- button: кнопка для отправки формы или действий;
- label: связывает текст с элементом формы для улучшения доступности.

Атрибуты формы: `action` (URL для отправки), `method` (GET/POST), `name` (идентификатор для данных). Валидация может быть встроенной (атрибуты как required, pattern) или через JavaScript.

**Типы полей input**

- text
- password
- email
- number
- checkbox
- radio
- file
- date (выбор данных через календарь)
- hidden (скрытое поле; не видно, но отправляется с формой)

**Ключевые атрибуты input**

- name: имя поля (сервер использует его для идентификации данных);
- value: значение по умолчанию;
- title: всплывающая подсказка при наведении курсора;
- placeholder: подсказка внутри поля (исчезает при вводе);
- required: делает поле обязательным для заполнения;
- readonly: поле видно, но нельзя редактировать;
- disabled: поле отключено (не отправляется с формой);
- maxlength - ограничивает количество символов;
- autocomplete: подсказывает браузеру, какие данные ожидать (например, name или email);
- autocapitalize - управляет заглавными буквами на мобильных клавиатурах.

### Атрибут pattern (input)\*\*

`pattern` задаёт регулярное выражение (regex), которому должен соответствовать ввод пользователя. Если данные не подходят под шаблон, браузер не позволит отправить форму и покажет ошибку.

Синтаксис

```html
<input type="text" pattern="regex" title="сообщение об ошибке" />
```

**Создание шаблонов**

- [0-9] - любая цифра
- [A-Za-z] - любая латинская буква;
- {3} - ровно 3 символа
- {2,5} - от 2 до 5 символов;
- ^\d{3}-\d{2}$ - формат "три цифры-две цифры" (например, 123-45).

**Примеры использования**

- Телефон: `pattern="\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}"` (формат +7 (XXX) XXX-XX-XX);
- Пароль из 6-12 символов: `pattern=".{6,12}"`;
- Почтовый индекс (6 цифр): `pattern="\d{6}"`

**Пример. Поле для трёхбуквенного кода страны:**

```html
<input
  type="text"
  pattern="[A-Za-z]{3}"
  title="Введите три буквы (например, RUS)"
  placeholder="Код страны"
/>
```

**Нюансы**

1. pattern работает только с input
2. атрибут title отображает пользователю подсказку об ошибке
3. браузер проводит проверку автоматически - дополнительный JS не нужен
4. для кириллицы нужно использовать [А-Яа-яЁё]
5. шаблон применяется только при отправке формы (ввод посимвольно не блокируется)

### Примеры

**Валидация формы на JavaScript**

```html
<form id="regForm" action="/submit" method="post">
  <!-- Поля как в примере 1 -->
  <label for="name">Имя:</label>
  <input type="text" id="name" name="name" required /><br /><br />

  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required /><br /><br />

  <label for="password">Пароль:</label>
  <input
    type="password"
    id="password"
    name="password"
    minlength="8"
    required
  /><br /><br />

  <button type="submit">Зарегистрироваться</button>
</form>

<script>
  document
    .getElementById("regForm")
    .addEventListener("submit", function (event) {
      const password = document.getElementById("password").value;
      if (!/\d/.test(password)) {
        // Проверка на наличие цифры
        alert("Пароль должен содержать хотя бы одну цифру!");
        event.preventDefault(); // Отменяет отправку
      }
    });
</script>
```

**Динамическое обновление опций в select**

```html
<form id="feedbackForm" action="/feedback" method="post">
  <!-- Поля как в примере 3 -->
  <label for="topic">Тема:</label>
  <select id="topic" name="topic" required>
    <option value="">Выберите тему</option>
    <option value="bug">Ошибка</option></select
  ><br /><br />

  <button type="button" id="addOption">Добавить тему "Предложение"</button
  ><br /><br />

  <label for="message">Сообщение:</label><br />
  <textarea id="message" name="message" rows="4" cols="50" required></textarea
  ><br /><br />

  <button type="submit">Отправить</button>
</form>

<script>
  document.getElementById("addOption").addEventListener("click", function () {
    const select = document.getElementById("topic");
    const newOption = document.createElement("option");
    newOption.value = "feature";
    newOption.textContent = "Предложение";
    select.appendChild(newOption);
  });
</script>
```

## Проверка достоверности данных форм

Валидация данных формы - это процесс проверки введённых пользователем данных на соответствие определённым правилам перед отправкой на сервер. Это помогает предотвратить ошибки, улучшить пользовательский опыт и защитить от вредоносного ввода. В JS регулярные выражения часто используются для валидации, так как они позволяют гибко описывать паттерны строк.

Регулярные выражения - это формальный язык для поиска и обработки текстовых данных по заданным шаблонам.

Регулярные выражения представлены объектов RegExp в JS. Они могут быть созданы двумя способами:

- Литерально: `pattern/flags` (например, `/abc/i`);

```javascript
const regex = /hello/i; // Создаёт regex для поиска "hello" без учёта регистра
console.log(regex.test("Hello World")); // true
```

- Через конструктор: `new RegExp('pattern', 'flags')` (например, `new RegExp('abc', 'i')`).

```javascript
const pattern = "hello";
const flags = "i";
const regex = new RegExp(pattern, flags); // Создаёт regex из переменных
console.log(regex.test("HELLO World")); // true
```

**Флаги**

- i игнорирует регистр
- g глобальный поиск (находит все совпадения)
- m многострочный режим

### Правила записи

Регулярные выражения состоят из литералов (обычных символов) и специальных символов (метасимволов). Основные правила:

**Метасимволы**

- `.` - любой символ, кроме новой строки
- `\d` - цифра (0-9)
- `\w` - буква, цифра или подчёркивание
- `\s` - пробельный символ (пробел, табуляция, новая строка)
- `\b` - граница слева
- `^` - начало строки
- `$` - конец строки

**Квантификаторы (указывают количество повторений)**
Квантификатор - это символ (или конструкция), указывающий количество повторений предыдущего символа.

- `*` - 0 или более
- `+` - 1 или более
- `?` - 0 или 1
- `{n}` - ровно n раз.
- `{n,}` - n или более
- `{n, m}` - от n до m раз

**Группы и альтернативы**

- `(abc)` - группа символов
- `(a|b)` - альтернатива (а или b)
- `[abc]` - любой символ из набора (a, b или c)
- `[^abc]` - любой символ, кроме a, b, c

**Экранирование**
Специальные символы экранируются обратным слешем: `\.`, `\+`, `\$` и т.д.
Пример простого regex: `/^\d{3}-\d{2}-\d{4}$/` - проверяет формат SSN (123-45-6789).

### Методы объектов String для работы с регулярными выражениями

Эти методы вызываются на строке и принимают regex в качестве аргумента.

- `match(regex)`: возвращает массив совпадений или null. С флагом `g` - все совпадения.

```javascript
const str = "Hello 123 world 456 42";
const matches = str.match(/\d+/g); // ['123', '456', '42']
```

- `replace(regex, replacement)`: заменяет совпадения на строку или функцию.

```javascript
const str = "My phone is 123-456-7890";
const result = str.replace(/\d{3}-\d{3}-\d{4}/, "XXX-XXX-XXXX"); // My phone is XXX-XXX-XXXX
```

- `search(regex)`: возвращает индекс первого совпадения или -1.

```javascript
const str = "Find the number 42";
const index = str.search(/\d+/); // 15
```

- `split(regex)`: разделяет строку на массив по совпадениям

```javascript
const str = "apple, orange; banana";
const parts = str.split(/[,;]\s*/); // ["apple", "orange", "banana"]
```

### Методы объектов RegExp для работы с регулярными выражениями

Эти методы вызываются на объекте RegExp

- `test(string)`: возвращает true, если есть совпадение, иначе false. Не изменяет состояние regex.

```javascript
const regex = /^\w+@\w+\.\w+$/;
console.log(regex.test("user@example.com")); // true
console.log(regex.test("invalid-email")); // false
```

- `exec(string)`: возвращает массив с совпадением и группами или null. С флагом `g` - последующие вызовы находят следующие совпадения.

```javascript
const regex = /(\d{2})-(\d{2})-(\d{4})/;
const match = regex.exec("Date: 12-31-2023"); // ["12-31-2023", "12", "31", "2023"]
```

### Практические примеры валидации данных формы

1. Валидация email

```javascript
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Пример использования
console.log(validateEmail("user@example.com")); // true
console.log(validateEmail("invalid@.com")); // false
```

2. Валидация номера телефона

```javascript
function validatePhone(phone) {
  const regex = /^\+7\s\$\d{3}\$\s\d{3}-\d{2}-\d{2}$/;
  return regex.test(phone);
}

// Пример
console.log(validatePhone("+7 (123) 456-78-90")); // true
console.log(validatePhone("123-456-7890")); // false
```

3. Валидация пароля

```javascript
function validatePassword(password) {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
}

console.log(validatePassword("Passw0rd!")); // true
console.log(validatePassword("password")); // false (нет заглавной, цифры, спецсимвола)
```

Комментарии

1. `(?=.*[a-z])` - содержит хотя бы 1 строчную букву (a-z): проверяет, что где-то в строке есть строчная буква (a-z)

- `.*` - любые символы (0 или больше)
- `a-z` - одна строчная буква

2. `(?=.*[A-Z])` - содержит хотя бы 1 прописную букву (A-Z)
3. `(?=.*\d)` - содержит хотя бы 1 цифру (\d)
4. `(?=.*[@$!%*?&])` - содержит хотя бы один специальный символ из набора (@$!%\*?&)
5. `{8,}` - длина не менее 8 символов
6. Состоять только из разрешённых символов (A-Za-z, \d, @$!%\*?&)
7. `(?=...)` - положительный опережающий просмотр (positive lookahead). `=` внутри - часть синтаксиса lookahead, не является отдельным оператором.

**Как работает lookahead**
`(?=шаблон)` проверяет, есть ли в строке подстрока, соответствующая шаблону, начиная с текущей позиции. Если совпадение найдено - условие считается выполненым, и движок регулярных выражений возвращается на исходную позицию (не продвигается по строке). Если совпадения нет - всё выражение не срабатывает. Важно, что lookahead не захватывает символы - он только проверяет их наличие. Lookahead-проверки идут в начале - они гарантируют наличие обязательных символов где-то в строке.

Это как бы механизм (утверждение), которое "заглядывает вперёд", проверяя, строку на предмет соответствия шаблону. Порядок важен.

**Итоговый пример формы с валидацией**
HTML + JS

```html
<form action="" id="myForm">
  <fieldset>
    <legend>Личные данные</legend>
    <label class="field field--email" for="email">
      <span class="label-text label-text--email">Email</span>
      <input type="email" id="email" placeholder="email" />
    </label>

    <label class="field field--phone" for="phone">
      <span class="label-text label-text--phone">Phone</span>
      <input type="text" id="phone" placeholder="Phone: +7 (XXX) XXX-XX-XX" />
    </label>

    <label class="field field--password" for="password">
      <span class="label-text label-text--password">Password</span>
      <input type="password" id="password" placeholder="Enter password..." />
    </label>
  </fieldset>
  <button type="submit">Submit</button>
</form>

<script>
  document
    .getElementById("myForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const password = document.getElementById("password").value;

      if (!validateEmail(email)) alert("Invalid email");
      else if (!validatePhone(phone)) alert("Invalid phone");
      else if (!validatePassword(password)) alert("Invalid password");
      else alert("Form submitted successfully");
    });

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function validatePhone(phone) {
    const regex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
    return regex.test(phone);
  }

  function validatePassword(password) {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }
</script>
```

## Cookies

Cookies (куки) - это небольшие текстовые файлы, которые веб-сайты сохраняют на устройстве пользователя (компьютере, смартфоне или планшете). Они используются для хранения информации о пользователе, такой как предпочтения, данные сессии, корзина покупок или идентификаторы для аутентификации. Cookies отправляются браузером на сервер при каждом запросе к сайту, что позволяет сайту "запомнить" пользователя.

Cookies используются для хранения данных, которые браузер отправляет на сервер с каждым запросом к домену.

В контексте JS cookies управляются через объект `document.cookie`. Это API бразуера, которое позволяет читать, устанавливать и удалять cookies. Cookies не являются частью языка JS, но JS предоставляет интерфейс для работы с ними. Важно: cookies могут быть установлены только для домена, с которого загружается страница, и имеют ограничения по размеру (обычно до 4 КБ на cookie).

Cookies делятся на типы:

- **Сессионные**: существуют только во время сессии браузера (удаляются при закрытии).
- **Постоянные**: Имеют срок действия (expires) и хранятся дольше.
- **HttpOnly**: Доступны только серверу, не JS (для безопасности).
- **Secure**: Передаются только по HTTPS.

### Работа с cookie

Для работы с cookies используется свойство `document.cookie`. Оно возвращает строку всех cookies для текущего домена в формате `name=value; name2=value2;...`. Установка cookie происходит путём присваивания строки в формате `name=value; options`.

Cookies полезны для аутентификации (например, session ID), персонализации (предпочтения) и трекинга (аналитика), но не для больших данных.

**Основные операции**

- Установка cookie: `document.cookie = "name=value; expires=дата; path=/ domain=example.com; secure; samesite=strict";`
- Чтение cookie: парсинг строки `document.cookie`
- Удаление cookie: установка истекшей датой.

### Практические примеры

1. Установка cookies

```javascript
// Функция для установки cookie
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Срок в днях
  console.log("date :>> ", date); // Tue Jan 06 2026 14:42:58 GMT+0900 (Якутск, стандартное время)

  const expires = "expires=" + date.toUTCString(); // expires=Tue, 06 Jan 2026 05:43:13 GMT
  console.log("expires :>> ", expires);

  // В DevTools проверяем срок действия во вкладке "Приложение", в колонке "Expires / Max-Age"

  document.cookie = `${name}=${value}; ${expires}; path=/`;
  console.log(document.cookie.includes("username=JohnDoe")); // true
}

setCookie("username", "JohnDoe", 3);
```

Комментарии:

1. `date.setTime()` - устанавливаем новое время для объекта date;
2. `date.getTime()` - получаем текущее время в миллисекундах;
3. `(days * 24 * 60 * 60 * 1000)` - вычисляет количество миллисекунд в указанном числе дней (24 часа x 60 минут x 60 секунд x 1000мс). В итоге сумма даёт будущее время, на которое истекает куки.
4. `const expires = "expires=" + date.toUTCString()`. Формируется строка expires с датой истечения куки в формате UTC (стандартный формат для HTTP-заголовков).
5. Получение cookie

```javascript
function getCookie(name) {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(";"); // ['username=JohnDoe']

  for (let i = 0; i < ca.length; i++) {
    // Перебираем каждую подстроку (потенциальное куки) из списка
    console.log("ca.length :>> ", ca.length); // 1

    let c = ca[i]; // username=JohnDoe (текущая подстрока)

    console.log("c.charAt(0) :>> ", c.charAt(0)); // u
    console.log("c.substring(1, c.length) :>> ", c.substring(1, c.length)); // sername=JohnDoe
    console.log("c.indexOf(nameEQ) :>> ", c.indexOf(nameEQ)); // 0 (позиция, где найден шаблон)
    console.log(
      "c.substring(nameEQ.length, c.length) :>> ",
      c.substring(nameEQ.length, c.length)
    ); // JohnDoe

    while (c.charAt(0) === " ") c = c.substring(1, c.length); // Удаляем пробел в начале строки (обрезаем строку, удаляя первый символ)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

const username = getCookie("username");
console.log(username);
```

3. Удаление cookie
   Удаление cookie происходит путём установки истекшей даты (expires в прошлом) или max-age=0. Удаление происходит только для указанного path и domain.

```javascript
function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

deleteCookie("username");
```

3.1 Улучшенная версия удаления cookie

```javascript
function deleteCookie(name, path = "/", domain = "") {
  document.cookie =
    `${name}=;` +
    `expires=Thu, 01 Jan 1970 00:00:00 UTC;` +
    `path=${path};` +
    (domain ? `domain=${domain};` : "") +
    "secure"; // если куки был с флагом secure
}
```

3.2 Удаление всех cookies (для домена):

```javascript
function deleteAllCookies() {
  const cookies = document.cookie.split("; ");
  console.log("cookies :>> ", cookies);

  for (let cookie of cookies) {
    console.log("cookie :>> ", cookie); // username=igoroshust
    const eqPos = cookie.indexOf("="); // Индекс начала '=' (для изъятия имени)

    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    console.log("name :>> ", name); // username
    console.log("cookie.substr(0, eqPos) :>> ", cookie.substring(0, eqPos)); // username
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  }
}

deleteAllCookies();
```

4. Установка cookie с дополнительными атрибутами
   Добавляем атрибуты для безопасности: `secure` (только HTTPS), `samesite=strict` (Защита от CSRF).

```javascript
function setSecureCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  // Атрибуты: path=/ (доступно для всего сайта), secure (только HTTPS), samesite=strict
  document.cookie =
    name +
    "=" +
    encodeURIComponent(value) +
    ";" +
    expires +
    ";path=/;secure;samesite=strict";
}

// Пример: Сохранение предпочтений пользователя
setSecureCookie("theme", "dark", 30);
```

Комментарии:

1. `encodeURIComponent` используется для кодирования значения, чтобы избежать проблем со специальными символами. Кодирует значение куки для безопасной передачи в HTTP-заголовке `Set-Cookie`. Необходимость: значения куки могут содержать (пробелы, спецсимволы, не-ASCII символы вроде кириллицы, эмодзи и тд), и без кодирования браузер может некорректно интерпретировать значение + возможны ошибки парсинга (например, символ `;` разорвёт строку куки) + риски XSS-атак, если значение содержит вредоносный код.
   Без кодирования:

```javascript
document.cookie = "theme=dark;blue"; // ;blue будет траковаться как новый параметр cookie!
```

С кодированием:

```javascript
const value = encodeURIComponent("dark;blue"); // "dark%3Bblue"
document.cookie = "theme=" + value; // корректно: значение = "dark;blue
```

encodeURIComponent гарантирует, что любое значение (включая спецсимволы и Unicode) будет передано без искажений.

2. `SameSite=Strict` - защита от CSRF-атак (межсайтовой подделки запросов). Параметр определяет, когда браузер отправляет куки вместе с запросом.

- Strict - куки не отправляются при переходах с других сайтов (например, пользователь перешёл по ссылке `example.com` из письма -> куки не прикрепляются к запросу). Максимальная безопасность, но может ломать функционал (например, платёжные редиректы).
- Lax (рекомендуемый баланс). Куки отправляются только для "безопасных" методов (GET, HEAD, OPTIONS, TRACE) при переходе с другого сайта. Не отправляются для POST-запросов извне. Подходит для большинства сценариев.
- None. Куки отправляются всегда, даже при межсайтовых запросах. Требуется secure (только HTTPS). Риск CSRF, если не продумана защита.

**Пример-5. Работа с несколькими cookies (корзина покупок)**
Представим простую корзину: сохраняем товары в cookie как JSON

```javascript
function addToCart(item) {
  let cart = getSecureCookie("cart");
  cart = cart ? JSON.parse(decodeURIComponent(cart)) : [];
  cart.push(item);
  setSecureCookie("cart", JSON.stringify(cart), 1);
}

function getCart() {
  const cart = getSecureCookie("cart");
  return cart ? JSON.parse(decodeURIComponent(cart)) : [];
}

function setSecureCookie(
  name,
  value,
  expireDays,
  path = "/",
  domain = "",
  samesite = "strict"
) {
  const date = new Date();
  date.setTime(date.getTime() + expireDays * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; ${expires}; path=${path}; domain=${domain}; samesite=${samesite}`;
}

function getSecureCookie(name) {
  const nameEQ = `${name}=`;
  const cookiesArray = document.cookie.split(";");

  for (let i = 0; i < cookiesArray.length; i++) {
    let cookie = cookiesArray[i].trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length);
    }

    //  if (cookie.indexOf(nameEQ) === 0) return decodeURIComponent(cookie.substring(nameEQ.length));
  }
  return null;
}

// Примеры использования
// 1. Простая строка (без JSON.stringify)
setSecureCookie("username", "igoroshust", 3);

// 2. Объект (c JSON.stringify перед вызовом)
addToCart({ name: "Apple", price: 0.5 });
addToCart({ name: "Banana", price: 0.8 });

// 3. Вывод корзины
console.log(getCart());
```

**Дополнительно про куки**

- Cookie с объектом (сериализация):

```javascript
const user = { id: 123, name: "Alice" };
document.cookie = `user=${encodeURIComponent(
  JSON.stringify(user)
)}; expires=${new Date(Date.now() + 86400000).toUTCString()}; path=/`;
```

### Лучшие практики и ограничения

- **Кодирование**: Всегда использовать `encodeURIComponent` для значений и `decodeURIComponent` при чтении.
- **Безопасность**: Использовать `secure`, `samesite` и `httponly` для защиты. Не хранить пароли в cookies без httponly.
- **Ограничения**: До 4 КБ на cookie, до 50 cookies на домен. Браузеры могут блокировать third-party cookies (например, в Safari)
- **Альтернативы**: Для локального хранения без отправки на сервер использовать localStorage (постоянное) или sessionStorage (сессионное) хранилища. Они проще и не имеют лимитов размера.
- **Тестирование**: В браузере открыть F12 > Application > Cookies для просмотра и редактирования.

## Преимущества Cookies

Cookies - это простой и эффективный механизм для хранения небольших объемов данных на стороне клиента (до 4 КБ на cookie, до 50 cookies на домен), который интегрируется с HTTP-запросами. Они позволяют сайтам "запоминать" пользователей без сложной логики. Ключевые преимущества:

- **Автоматическая отправка данных с каждым запросом**: Cookies автоматически включаются в заголовки HTTP-запросов к серверу, что позволяет серверу получать информацию без дополнительных усилий. Это полезно для аутентификации и персонализации.

**Пример-1. Отправка cookie с ID сессии с каждым запросом**
В интернет-магазине cookie с ID сессии отправляется с каждым запросом, позволяя серверу поддерживать логин пользователя без повторного ввода пароля.

```javascript
// Установка сессионного cookie
document.cookie = "sessionId=abc123; path=/; secure; samesite=strict";

// При следующем запросе (например, fetch) cookie автоматически добавляется в заголовок
fetch("/api/user").then((response) => response.json());

// Сервер получит sessionID и сможет аутентифицировать пользователя
```

- **Простота хранения и доступа в JS**: Легко устанавливать, читать и удалять через `document.cookie`. Не требует внешних библиотек.

**Пример-2. Сохранение предпочтений пользователя (тема сайта)**

```javascript
document.cookie =
  "theme=dark; expires=" +
  new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString() +
  "; path=/";

// Чтение
function getCookie(name) {
  /* Код из ранних примеров */
}
const theme = getCookie("theme");
document.body.classList.add(theme);
```

- **Гибкость атрибутов для контроля**: Атрибуты вроде `expires`, `secure`, `samesite` позволяют настривать поведение (например, безопасность).

**Пример-3. Cookie для аналитики, который живёт 1 год и отправляется только по HTTPS**

```javascript
document.cookie =
  "theme=dark; expires=" +
  new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString() +
  "; path=/";

// Чтение
function getCookie(name) {
  /* Код из ранних примеров */
}
const theme = getCookie("theme");
document.body.classList.add(theme);
```

- **Кросс-браузерная совместимость**: Поддерживаются всеми современными браузерами без полифилов.


### Недостатки Cookies
Cookies имеют ограничения по безопасности, размеру и производительности. Они могут быть уязвимы и не подходят для больших данных.

- **Ограничения по размеру и количеству**: Максимум 4 КБ на cookie и около 50 cookies на домен. Превышение приводит к потере данных.

**Пример. Попытка сохранить большой объект (например, историю покупок) приведёт к обрезанию**
```javascript
const largeData = Array(1000).fill("item"); // Большой массив
console.log('largeData :>> ', largeData);
document.cookie = "history=" + encodeURIComponent(JSON.stringify(largeData)) + "; path=/";
// Cookie может быть обрезан, и данные потеряны.
```

- **Уязвимости безопасности**: Cookies могут быть украдены через XSS или использованы в CSRF-атаках, если не защищены атрибута.

**Пример. Если cookie без httponly, злоумышленник может прочитать его**
```javascript
document.cookie = "sessionId=abc123; path=/";
// Злоумышленник внедряет: alert(document.cookie); // Украдёт sessionId
// Решение: устанавливать httponly на сервере или использовать secure/samesite
```

- **Отправка с каждым запросом**: Увеличивает размер HTTP-заголовков, что замедляет загрузку, особенно для мобильных сетей.

**Пример. Сайт с 10 cookies добавляет ~500 байт к каждому запросу. Для страницы с 20 изображениями это +10 КБ трафика**
```javascript
// Проверьте в Network tab браузера: каждый запрос включает cookies в заголовке Cookie.
// Альтернатива: localStorage не отправляется автоматически.
```

- **Блокировка браузерами и пользователями**: Современные браузеры блокируют third-party cookies (например, для рекламы), а пользователи могут отключить их.

**Пример. В Safari или с расширением uBlock Origin cookie от рекламных сетей не работают, ломая аналитику**
```javascript
// Попытка установить third-party cookie
document.cookie = "adTracker=123; domain=ads.example.com";
// Может быть заблокировано, и трекинг не сработает.
```

- **Не подходят для больших и чувствительных данных**: Для хранения файлов или паролей лучше использовать localStorage или серверные сесии.

**Пример. Хранение пароля в cookie - рисковано**
```javascript
document.cookie = "password=secret; path=/" // Плохо
// Лучше не хранить пароли в cookie, а использовать токены с httpOnly
```

- **Сложность управления в JS**: Парсинг строки document.cookie требует ручного кода, в отличие от localStorage.

**Пример. Для обновления нужно переустанавливать весь cookie**
```javascript
// Обновление: Сначала прочитать, изменить, переустановить
let cart = JSON.parse(getCookie("cart"));
cart.pop(); // Удалить последний
document.cookie = "cart=" + encodeURIComponent(JSON.stringify(cart)) + "; path=/";
// В localStorage: localStorage.setItem("cart", JSON.stringify(cart)); - проще
```

**Заключение**
Cookies хороши для небольших, часто используемых данных, но для сложных сценариев лучше рассмотреть альтернативы вроде localStorage (для клиента) или серверных сессий.






























### Дополнительно

1. `Аутентификация` - это процедура проверки подлинности пользователя: система убеждается, что человек, пытающийся войти в аккаунт, действивтельно является тем, за кого себя выдаёт. Принцип работы: пользователь предоставляет данные (пароль, биометрию, и т.п.), а система сверяет их с сохранёнными учётными данными. Если совпадение есть - доступ разрешён. Необходима для предотвращения несанкционированного доступа, а также подтверждения личности пользователя перед предоставлением доступа к данным.
   Аутентификация отвечает на вопрос: "Это действительно этот пользователь?" + фокусируется на безопасности и проверке личности.

**Основные методы аутентификации**

- Парольная - вход по логину и паролю (самый распространённый, но уязвимый способ);
- Биометрическая - распознавание по отпечаткам пальцев, лицу, голосу, сетчатке глаза;
- На основе токенов - использование физических устройств (USB-ключ, смарт-карта) или одноразовых кодов (SMS, приложение).
- На основании цифровых сертификатов - применение пары ключей (открытый и закрытый) с проверкой черер центр сертификации.
- Многофакторная (MFA) / двухфакторная (2FA) - комбинация двух и более методов (например, пароль + код из SMS).

2. `Персонализация` - это адаптация интерфейса, контента или функционала сервиса под конкретного пользователя на основе его данных, предпочтений и поведения. Принцип работы: система собирает и анализирует информацию о пользователе (история просмотров, настройки, демография, геолокация, и т.п.) и использует её, чтобы показать наиболее релевантный контент или предложить удобные опции. Персонализация отвечает на вопрос "Что этому пользователю будет полезно/интересно?" + фокусируется на пользовательском опыте и релевантности контента.

**Примеры персонализации**

- Рекомендации товаров/фильмов/музыки на основе прошлых выборов
- Отображение локального времени и валюты
- Сохранение пользовательских настроек (тема интерфейса, язык, виджеты)
- Персональные скидки и акции
- Адаптивные формы (подстановка имени, предыдущих ответов)
- Персонализированные email-рассылки и уведомления

**Назначение**

- Повысить удобство и удовлетворённость пользователя
- Увеличить вовлечённость и время на сайте/в приложении
- Улучшить конверсию (продажи, регистрации и т.п.)
- Выстроить долгосрочные отношения с клиентом

**Взаимосвязь аутентификация + персонализация**

1. Сначала пользователь проходит аутентификацию (входит в аккаунт);
2. Система "узнаёт" его и применяет персонализацию (показывает персональные рекомендации, настройки и т.п.).
   Таким образом, аутентификация - это пропуск в личный кабинет, а персонализация - то, что делает этот кабинет удобным и полезным именно для вас.
