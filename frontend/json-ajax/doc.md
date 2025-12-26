<- https://httpbin.org/post

- Стандарт RFC 8259
- RESTful API
- SSR
- XSS

https://app.blackbox.ai/chat/k1MBf8b

## Цели и задачи JSON в JavaScript

JSON (JavaScript Object Notation) - это текстовый формат для представления структурированных данных, основанный на синтаксисе JS. Он был разработан для облегчения обмена данными между различными системами, особенно в веб-разработке, где данные часто передаются между клиентом (браузером) и сервером.

### Основные цели JSON

- **Универсальность и совместимость**. JSON поддерживается большинством ЯП, что делает его идеальным для межплатформенного обмена данными. Он не зависит от JS, хотя и используется его синтаксис.

- **Легковесность и читаемость**. Формат компактный, легко читается человеком и парсируемый машинами. Это упрощает отладку и разработку.

- **Стандартизация**. JSON является стандартом (RFC 8259), что обеспечивает надёжность и предсказуемость.

### Задачи JSON в JS

- **Сериализация (преобразование объектов в строку)**. Преобразование JS-объектов в JSON-строку для передачи или хранения с помощью `JSON.stringify()`

- **Десериализация (преобразование строки обратно в объект)**. Парсинг JSON-строки в JS-объект с помощью `JSON.parse()`

- **Хранение и передача данных**. Используется для сохранения данных в localStorage/sessionStorage, отправки AJAX-запросов, работы с API (например, RESTful API).

JSON решает проблемы, связанные с передачей сложных структур данных (объекты, массивы) через текстовые протоколы, такие как HTTP, где данные должны быть строковыми.

### Примеры

**Пример-1. Передача объекта с данными пользователя на сервер**

```javascript
const user = {
  name: "Иван",
  age: 30,
  hobbies: ["чтение", "спорт"],
};

// Сериализация в JSON-строку
const jsonString = JSON.stringify(user);
console.log(jsonString); // Вывод: {"name": "Иван", "age": 30, "hobbies": ["чтение", "спорт"]}
console.log(typeof jsonString); // string

// Имитация отправки на сервер
fetch("/api/user", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: jsonString,
});

// Десериализация обратно в объект
const parsedUser = JSON.parse(jsonString); // {name: "Иван", ...}
console.log(parsedUser.name);
```

В этом примере JSON позволяет легко преобразовать объект в строку для передачи и обратно, сохраняя структуру данных.

### Синтаксис JSON

Синтаксис JSON строго определён и основан на подмножестве JavaScript. Он поддерживает только определённые типы данных и структуры, без функций, комментариев или переменных.

#### Основные элементы синтаксиса

- **Объекты**: Представляются в фигурных скобках, содержат пары "ключ:значение", где ключи - строки в двойных кавычках, значения - допустимые типы данных.
- **Массивы**: Представляются в квадратных скобках, содержат упорядоченные значения.
- **Типы данных**: Cтроки, числа, булевы значения, null, объекты и массивы (могут быть вложенными)
- **Правила**:
- - Ключи объектов всегда в двойных кавычках;
- - Нет комментариев, функций, undefined и символов;
- - Запятые обязательны между элементами, но не после последнего;
- - Пробелы и отступы игнорируются (для читаемости).

JSON не является полноценным JavaScript: он не поддерживает выражения, переменные или методы. Если попытаться сериализовать объект с функцией, она будет пропущена.

**Пример-1. Валидный JSON с вложенными структурами**

```javascript
const jsonData = `{
    "user": {
        "name": "Анна",
        "age": 25,
        "isActive": true,
        "address": {
            "city": "Москва",
            "zip": 123456
        },
        "friends": ["Пётр", "Мария", null]
    },
    "metadata": {
        "version": 1.0,
        "created": "2023-10-01"
    }
}`;

// Парсинг в JSON-объект
const data = JSON.parse(jsonData);
console.log(data); // { user: {...}, metadata: {...} }
console.log(data.user.name); // Анна
console.log(data.user.friends[1]); // Мария

// Сериализация обратно
const backToJson = JSON.stringify(data, null, 2); // С отступами для читаемости

console.log(backToJson);
/* {
  "user": {
    "name": "Анна",
    "age": 25,
    "isActive": true,
    "address": {
      "city": "Москва",
      "zip": 123456
    },
    "friends": [
      "Пётр",
      "Мария",
      null
    ]
  },
  "metadata": {
    "version": 1,
    "created": "2023-10-01"
  }
*/
```

**Пример-2. Пропуск недопустимого элемента (например, функции)**

```javascript
const obj = {
  name: "Тест",
  func: function () {
    return 1;
  },
};
console.log(JSON.stringify(obj)); // { "name": "Тест" }
```

### Работа JSON.stringify()

JSON.stringify() преобразует JS-значение (объект, массив, число, строку, булево значение, null) в строку в формате JSON.
Пример

```javascript
const obj = { name: "Алиса", age: 25, isActive: true };
const jsonString = JSON.stringify(obj);
// Результат: '{"name":"Алиса", ...}'
```

**Важные нюансы**

- Не обрабатывает функции, undefined, Symbol (они пропускаются или превращаются в null)
- Для Date вызывает .toJSON() (результат - строка в формате ISO)
- Циклические ссылки вызовут ошибку
- Можно настроить через параметры (например, отступы для читаемости)

#### Параметры JSON.stringify(value, replacer, space)

1. `value` (обязательный). Исходное значение (объект, массив, примитив), которое нужно преобразовать в JSON-строку.
2. `replacer` (опциональный). Может быть:

- - функцией, вызываемой для каждого свойства, позволяющей модифицировать значение перед записью.

```javascript
// Абстрактно
JSON.stringify({ a: 1, b: 2 }, (key, value) => value * 2); // {"a": 2, "b": 4}

// Расширенный пример кода
const result = JSON.stringify({ a: 1, b: 2 }, (key, value) => {
  // Для корневого объекта возвращаем его как есть
  if (key === "") return value;
  // Для числовых значений умножаем на 2
  if (typeof value === "number") return value * 2;
  // Для остальных типов (строки, объекты и т. п.) оставляем без изменений
  return value;
});
console.log(result); // '{"a":2,"b":4}'
```

- - массивом строк/чисел, указывающим, какие свойства включать в результат (фильтрация по ключам).

```javascript
JSON.stringify({ a: 1, b: 2, c: 3, d: 4 }, ["a", "d"]);
// {"a": 1, "d": 4}
```

3. `space` (опциональный). Управляет форматированием отступов для читаемости. Может быть:

- - числом (от 0 до 10): количество пробелом для отступа
    Пример со space=2

```json
{
  "name": "Алиса",
  "age": 25
}
```

- - строкой (до 10 символов): используется как символ отступа
    Пример со space='\t'

```json
{
  "name": "Алиса",
  "age": 25
}
```

#### Параметры JSON.stringify(value, replacer, space)

1. `value` (обязательный). Исходное значение (объект, массив, примитив), которое нужно преобразовать в JSON-строку.
2. `replacer` (опциональный). Может быть:

- - функцией, вызываемой для каждого свойства, позволяющей модифицировать значение перед записью.

```javascript
// Абстрактно
JSON.stringify({ a: 1, b: 2 }, (key, value) => value * 2); // {"a": 2, "b": 4}

// Расширенный пример кода
const result = JSON.stringify({ a: 1, b: 2 }, (key, value) => {
  // Для корневого объекта возвращаем его как есть
  if (key === "") return value;
  // Для числовых значений умножаем на 2
  if (typeof value === "number") return value * 2;
  // Для остальных типов (строки, объекты и т. п.) оставляем без изменений
  return value;
});
console.log(result); // '{"a":2,"b":4}'
```

- - массивом строк/чисел, указывающим, какие свойства включать в результат (фильтрация по ключам).

```javascript
JSON.stringify({ a: 1, b: 2, c: 3, d: 4 }, ["a", "d"]);
// {"a": 1, "d": 4}
```

3. `space` (опциональный). Управляет форматированием отступов для читаемости. Может быть:

- - числом (от 0 до 10): количество пробелом для отступа
    Пример со space=2

```json
{
  "name": "Алиса",
  "age": 25
}
```

- - строкой (до 10 символов): используется как символ отступа
    Пример со space='\t'

```json
{
  "name": "Алиса",
  "age": 25
}
```

**Пример-1: исключение определённых свойств с помощью replacer-функции**

```javascript
const user = {
  name: "Олег",
  password: "secret123", // Не хотим сериализовать
  age: 28,
  email: "oleg@example.com",
};

// Replacer-функция: исключаем password
const jsonString = JSON.stringify(user, (key, value) => {
  if (key === "password") return undefined; // Исключаем
  return value;
});

console.log(jsonString); // Вывод: {"name":"Олег","age":28,"email":"oleg@example.com"}
```

**Пример-2: включаем только определённые ключи**

```javascript
const user = {
  name: "Олег",
  password: "secret123", // Не хотим сериализовать
  age: 28,
  email: "oleg@example.com",
};

// Replacer-функция: только name и age
const jsonString = JSON.stringify(user, ["name", "age"]);
console.log(jsonString); // Вывод: {"name":"Олег","age":28}
```

**Пример-3: трансформация возраста в строку + отступы**

```javascript
const user = {
  name: "Олег",
  age: 28,
};

const jsonString = JSON.stringify(
  user,
  (key, value) => {
    if (key === "age") return value.toString();
    return value;
  },
  2
);

console.log(jsonString);
```

#### Параметры JSON.parse(text, reviver)

1. `text` (обязательный). Строка в формате JSON, которую нужно преобразовать в JS-значение.
2. `replacer` (опциональный). Функция, которая вызывается для каждого парсируемого значения. Позволяет:

- - модифицировать значения перед их возвратом;
- - фильтровать или удалять свойства;
- - преобразовывать типы данных;

Пример преобразования строк с датами в объекты Date

```javascript
const str = '{"date": "2025-01-01", "value": 100}';

const obj = JSON.parse(str, (key, value) => {
  if (key === "date") return new Date(value);
  return value;
});

console.log(obj); // {date: Wed Jan 01 2025 09:00:00 GMT+0900 (Якутск, стандартное время), value: 100}
```

**Важные нюансы**

- Строка должна строго соответствовать синтаксису JSON (двойные кавычки, без запятых после последнего элемента и тп);
- При ошибке выбрасывает SyntaxError.

#### Итоговый обзор

1. JSON.stringify(value, replacer, space) - преобразует JS-значение в JSON-строку с возможностью фильтрации и форматирования
2. JSON.parse(text, reviver) - преобразует JSON-строку в JS-значение с возможностью постобработки

### Метод toJSON()

Метод `toJSON()` - это специальный метод, который можно добавить к объекту для кастомизации его сериализации. Когда `JSON.stringify()` встречает объект с этим методом, он автоматически вызывает `toJSON()` и использует его возвращаемое значение вместо самого объекта.

**Использование**

- Для встроенных объектов, таких как `Date` (уже имеет toJSON, возвращает ISO-строку).
- Для кастомных классов или объектов, где нужно контролировать, как они сериализуются (например, исключить внутренние свойства или преобразовать данные).
- Метод вызывается только при сериализации, не влияет на десериализацию.

**Практический пример: кастомный объект с toJSON для упрощения вывода**

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.secret = "не сериализовать"; // Внутреннее свойство
  }

  toJSON() {
    return {
      name: this.name,
      age: this.age,
    }; // Возвращаем только нужные поля
  }
}

const person = new Person("Елена", 35);
const jsonString = JSON.stringify(person);
console.log(jsonString); // {"name":"Елена","age":35}
```

**Практический пример с Date: встроенный toJSON**

```javascript
const now = new Date();
console.log(JSON.stringify(now)); // Вывод: "2023-10-01T12:00:00.000Z" (ISO-строка)
```

**Пример комбинации с replacer**

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.secret = "не сериализовать"; // Внутреннее свойство
  }

  toJSON() {
    return {
      name: this.name,
      age: this.age,
    }; // Возвращаем только нужные поля
  }
}

const person = new Person("Максим", 40);
const jsonString = JSON.stringify(person, (key, value) => {
  if (key === "age") return value + 1; // Увеличиваем возраст
  return value;
});

console.log(jsonString); // Вывод: {"name":"Максим","age":41}
```

Это позволяет гибко управлять сериализацией, делая JSON более мощным инструментом в JavaScript.

### Дополниельно по теме

1. `Сериализация` - это процесс преобразования объекта или структуры данных в формат, подходящий для хранения, передачи или восстановления, обычно в строку или поток байтов. В контексте JS это часто относится к преобразованию JS-объектов в JSON-строку с помощью `JSON.stringify()`.

- Цель: позволяет сохранить состояние объектов (например, в файлы, базы данных или передавать по сети), чтобы позже восстановить их.

```javascript
// Сериализация объекта
JSON.stringify({ name: "Иван", age: 30 }); // :>> '{"name": "Иван", "age": "30"}'

// Десериализация (восстановление)
JSON.parse('{"name": "Иван", "age": "30"}'); // :>> объект { name: "Иван", "age": 30 }
```

Применение: используется в веб-разработке для отправки данных на сервер, кэширования или хранения в localStorage.

2. `Сериализатор` - это инструмент, функция или класс, который выполняет сериализацию. В JS встроенный сериализатор - это метод `JSON.stringify()`, который преобразует объекты в JSON-строки.

- Функциональность: принимает объект и опционально параметры (replacer, space) для кастомизации вывода.
- Примеры:
- - Простой сериализатор: `JSON.stringify(obj)`
- - С кастомизацией: `JSON.stringify(obj, ['name', 'age'], 2)` - включает только указанные ключи с отступами
- Расширения: можно создать собственный сериализатор, например, для XML или бинарных форматов, но в JS JSON - стандарт.

3. Этимология термина "сериализация"
   Происходит от латинского "series" (ряд, последовательность), что подразумевает преобразование данных в последовательную формы (например, строку или поток). Термин появился в программировании в 1960-х годах, связанный с сериализацией объектов в языках вроде Smalltalk и Java.

- Происхождение: от 'serial" (последовательный) + суффикс 'ization' (процесс). Аналогично русскому "серия", "последовательность".
- В программировании - отражает идею "выстраивания" данных в линейную последовательность для хранения или передачи.
- Примеры использования: В контексте JSON - данные "выстраиваются" в текстовую строку.

4. ISO-строка
   ISO-строка - это строковое представление даты и времени в формате ISO 8601, стандартизированном Международной организацией по стандартизации (ISO). В JS это формат, возвращаемый методом `Date.prototype.toISOString()`, например, `2023-10-01T12:00:00.000Z`.

- Формат: YYYY-MM-DDTHH:mm:ss.sssZ (год-месяц-деньТчасы:минуты:секунды.милисекундыZ - для UTC)
- В JSON: объекты Date автоматически сериализуются в ISO-строки с помощью `toJSON()`.
- Примеры:
- - `new Date().toISOString()` :>> `"2023-10-01T12:00:00.000Z"`
- - В JSON: `JSON.stringify(new Date())` :>> `"2023-10-01T12:00:00.000Z"`

5. Стандарт RFC 8259
   RFC 8259 - это документ, опубликованный Internet Engineering Task Force (IETF), который определяет стандарт JSON (JavaScript Object Notation). Он заменил более ранние спецификации (RFC 4627) и уточняет синтаксис, типы данных и безопасность.

- Ключевые аспекты: описывает JSON как текстовый формат для обмена данными, поддерживающий объекты, массивы, строки, числа, булевы значения и null. Устанавливает правила парсинга и сериализации.
- Применение: Используется в веб-API, конфигурационных файлах и базах данных. В JS реализация соответствует этому стандарту.
- Примеры: Любая JSON-строка должна следовать правилам RFC 8259, например, ключи в двойных кавычках, отсутствие комментариев.

6. RESTful API
   RESTFul API - архитектурный стиль для создания веб-сервисов, основынный на принципах REST (Representational State Transfer), предложенных Роем Филдингом. Он использует HTTP-методы (GET, POST, PUT, DELETE) для взаимодействия с ресурсами, представленными в виде URL.

- Принципы: клиент-серверная модель, без состояния (stateless), кэшируемость, унифицированный интерфейс. Данные обычно передаются в JSON.
- Применение: широко используются для веб-приложений, мобильных API и микросервисов. Примеры: GitHub API, Twitter API.
- Примеры:
- - `GET /users` - получить список пользователей (возвращает JSON)
- - `POST /users` - создать нового пользователя (отправляет JSON-данные)
- - В JS: `fetch('/api/users', { method: 'GET' }).then(res => res.json())` - получение данных в JSON-формате.

7. MIME-тип
   MIME-тип (Multipurpose Internet Mail Extensions) - это стандарт, указывающий тип данных (файла или потока), чтобы программы (браузеры, серверы и тд) знали, как их обрабатывать. Позволяет системе понять:

- что это (текст, изображение, аудио, видео, скрипт или другой контент);
- каким приложением/модулем его открывать;
- как безопасно передавать и кэшировать.

**Формат**
MIME-тип состоит из двух частей: `тип/подтип`. Примеры

- - text/html
- - text/css
- - image/png
- - application/json
- - application/javascript
- - audio/mpeg
- - video/mp4

**Использование**

- В HTTP-заголовке `Content-Type` (сервер сообщает клиенту тип данных);
- В форматах загрузки файлов (проверка допустимых типов);
- В email-вложениях (определение типа прикреплённого файла);
- В API и AJAX-запросах (корректная обработка ответов).

**Важность**

- Корректное отображение: браузер понимает, что показывать как картинку, а что - как текст.
- Безопасность: предотвращает выполнение вредоносного кода (например, если JS-файл ошибочно отослан как `text/html`).
- Оптимизация: браузер может эффективнее кэшировать ресурсы, зная их тип.

## Синхронные и асинхронные операции в JavaScript

JavaScript - однопоточный язык, что означает, что он выполняет код последовательно. Однако для работы с внешними ресурсами, такими как серверы (HTTP-запросы), нужны механизмы, чтобы не блокировать основной поток. Синхронные запросы выполняются последовательно и блокируют выполнение кода до его завершения. Асинхронные запросы позволяют коду продолжать работу, пока запрос обрабатывается в фоне, с использованием колбэков (callbacks), промисов (promises) или async/await.

В контексте HTTP-запросов синхронные методы (например, XMLHttpRequest c `async: false`) устарели и не рекомендуются, так как могут "заморозить" интерфейс. Асинхронные запросы – стандарт, особенно с Fetch API.

### Синхронные запросы

Синхронные запросы блокируют выполнение скрипта до получения ответа. Это полезно для простых сценариев, но в реальных приложениях приводит к плохому UX (интерфейс "зависает").

Пример с XMLHttpRequest (синхронный режим)

```javascript
// Создаём объект XMLHttpRequest
const xhr = new XMLHttpRequest();

// Устанавливаем синхронный режим (async: false)
xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/1", false);

// Отправляем запрос
xhr.send();

// Код здесь выполнится только после получения ответа
if (xhr.status === 200) {
  console.log("Ответ:", JSON.parse(xhr.responseText));
} else {
  console.error("Ошибка:", xhr.status);
}
```

- В данном случае запрос блокирует поток. Если сервер медленный, страница зависнет.
- Проблема в том, что это не подходит для браузеров (может вызвать предупреждения), и использовать можно в Node.js для простых скриптов.

### Асинхронные запросы

Асинхронные запросы не блокируют код. Они используют колбэки, промисы или async/await для обработки результатов.

**Пример с коллбэками (callback-based)**

```javascript
const xhr = new XMLHttpResponse();

xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/1", true);

// onload обязателен для обработки синхронных запросов
xhr.onload = function () {
  if (xhr.status === 200) {
    console.log("Ответ: ", JSON.parse(xhr.responseText));
  } else {
    console.error("Ошибка: ", xhr.status);
  }
};

xhr.onerror = function () {
  console.error("Сетевая ошибка");
};

xhr.send();

console.log("Запрос отправлен, продолжаем...");
```

**Пример с промисами (Promises) и Fetch API**
Fetch API - современный способ для асинхронных запросов, возвращает промис.

```javascript
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Ошибка:", response.status);
    }
    return response.json(); // Парсим JSON
  })
  .then((data) => {
    console.log("Ответ:", data);
  })
  .catch((error) => {
    console.error("Ошибка:", error);
  });

// Код здесь выполнится сразу
console.log("Запрос отправлен, продолжаем...");
```

В данном случае `fetch` возвращает промис, `.then()` обрабатывает успех, `.catch()` - ошибки. Код не блокируется.

**Пример с async/await (синтаксический сахар над промисами)**

```javascript
async function fetchData() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    if (!response.ok) {
      throw new Error("Ошибка сети: " + response.status);
    }
    const data = await response.json();
    console.log("Ответ:", data);
  } catch (error) {
    console.error("Ошибка:", error);
  }
}

// Вызов функции
fetchData();

// Код выполняется сразу
console.log("Запрос отправлен, продолжаем...");
```

`await` приостанавливает функцию, но не блокирует весь скрипт. Идеально для читаемого кода.

**Асинхронный запрос с обработкой нескольких запросов**

```javascript
async function fetchMultiple() {
  try {
    const [post1, post2, post3] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/posts/1").then((r) =>
        r.json()
      ),
      fetch("https://jsonplaceholder.typicode.com/posts/2").then((r) =>
        r.json()
      ),
      fetch("https://jsonplaceholder.typicode.com/posts/3").then((r) =>
        r.json()
      ),
    ]);
    console.log("Пост №1:", post1.title);
    console.log("Пост №2:", post2.title);
    console.log("Пост №3:", post3.title);
  } catch (error) {
    console.error("Ошибка:", error);
  }
}

fetchMultiple();
```

`Promise.all` выполяет запросы параллельно, не блокируя основной поток.

**BEST PRACTICE**

- Использовать асинхронные методы: Fetch API или Axios для браузеров.
- Обработка ошибок: всегда проверять статус ответа и использовать try/catch
- Избегать синхронных запросов в браузерах: они могут вызвать "blocking" предупреждения;
- Для сложных сценариев: использовать async/await для читаемости, Promise.all для параллелизма.
- Тестирование: в браузере проверять DevTools (Network tab), в Node.js - с помощью Jest или Mocha.

## XMLHttpRequest

XMLHttpRequest (XHR) - это встроенный объект JavaScript, который позволяет отправлять HTTP-запросы к серверу асинхронно или синхронно. Он был введён в Internet Explorer и стал стандартом для AJAX (Asynchronous JS and XML). XHR поддерживает различные методы HTTP (GET, POST, PUT и т.д.) и позволяет работать с данными в форматах JSON, XML, текст и т.д. XMLHttpRequest считается устаревшим по сравнению с Fetch API, но всё ещё используется в legacy-коде и поддерживается во всех браузерах.

- **Основные возможности**: Отправка запросов без перезагрузки страницы, обработка ответов через события или колбэки.
- **Поддержка**: Доступен в браузерах и Node.js (через полифилы или модули).
- **Ограничения**: Не поддерживает соверменные фичи вроде AbortController для отмены запросов, и код может быть громоздким по сравнению с Fetch.

### Создания и инициализация XMLHttpRequest

**Работа с объектом**

```javascript
const xhr = new XMLHttpRequest(); // Создание нового экземпляра

// Инициализация запроса с методом open(method, url, async, user, password)
xhr.open("GET", "https://api.example.com/data", true);

// Отправка запроса с помощью send(body)
xhr.send(); // для GET
xhr.send(JSON.stringify({ key: "value" })); // для POST с JSON
```

Параметры xhr.open()

- `method`: Строка, например "GET", "POST".
- `url`: URL сервера.
- `async`: Булево (true для асинхронного, false для синхронного). По умолчанию true.
- `user` и `password`: Опционально для базовой аутентификации.

Параметры xhr.send()

- `body`: Данные для отправки (для POST/PUT). Для GET - null или undefined.

### Основные методы XMLHttpRequest

Методы управляют жизненным циклом запроса: от открытия до отправки и отмены.

- `open(method, url, async, user, password)`: инициализация запроса без отправки
- `send(body)`: отправляет запрос. Для синхронных запросов блокирует код до ответа.
- `setRequestHeader(header, value)`: устанавливаем заголовки запроса (вызывается после open, но перед send)

```javascript
xhr.setRequestHeader("Content-Type", "application/json");
```

- `getResponseHeader(header)`: получает значение заголовка ответа
- `getAllResponseHeaders()`: возвращает все заголовки ответа как строку
- `abort()`: отменяет текущий запрос
- `overrideMimeType(mimeType)`: переопределяет mime-тип ответа (редко используется)

### Основные свойства XMLHttpRequest

Свойства предоставляют состояние запроса и данные ответа. Большинство доступны только после `send()`.

- `readyState`: Число, указывающее состояние запроса (0-4):
- - 0: UNSENT (не инициализирован)
- - 1: OPENED (открыт с `open()`)
- - 2: HEADERS_RECEIVED (заголовки получены)
- - 3: LOADING (данные загружаются)
- - 4: DONE (завершено)

- `status`: HTTP-статус ответа (например, 200 для успеха);
- `statusText`: Текст статуса (например, "OK");
- `responseText`: Тело ответа как строка;
- `responseXML`: Тело ответа как XML-документ (если MIME-тип XML);
- `response`: Обобщённое свойство (в новых браузерах, может быть ArrayBuffer и тд)
- `timeout`: Таймаут в миллисекундах (по умолчанию 0 - без таймаута)
- `withCredentials`: Булево для отправки куки с кросс-доменными запросами.

### События XMLHttpRequest

XHR работает на основе событий. Основное – `readystatechange`, но есть и другие.

- `readystatechange`: Срабатывает при изменении `readyState`. Проверяем `xhr.readyState === 4` для завершения.
- `load`: Срабатывает при успешном завершении (readyState 4 и статус 200-299);
- `error`: Срабатывает при сетевой ошибке;
- `abort`: Срабатывает при отмене запроса;
- `timeout`: Срабатывает при превышении таймаута. Это свойство устанавливает максимальное время (в миллисекундах) на выполнение всегда запроса - от отправки (`send()`) до получения полного ответа.
- `loadstart`, `loadend`, `progress`: Для отслеживания прогресса загрузки;
- `onprogress`: Срабатывает во время загрузки данных с сервера. Оно позволяет отслеживать, сколько данных уже получено, и вычислять процент прогресса. Срабатывает во время фазы `readyState` 3 (LOADING), когда данные поступают порциями (chunks).
- `onerror`: Срабатывает при сетевой ошибке во время выполнения XMLHttpRequest (например, потеря соединения, недоступность сервера, блокировка запросом брандмауэром).

**Пример обработки события**

```javascript
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log("Успех:", xhr.responseText);
    } else {
      console.error("Ошибка:", xhr.status);
    }
  }
};
```

### Практические примеры использования

**Пример-1. Простой асинхронный запрос**

```javascript
const xhr = new XMLHttpRequest();

xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/1", true);

xhr.onload = function () {
  if (xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    console.log("Данные:", data);
  } else {
    console.error("Ошибка:", xhr.status);
  }
};

xhr.onerror = function () {
  console.error("Сетевая ошибка");
};

xhr.send();
```

Запрос обрабатывается асинхронно. Код после `send()` выполняется сразу. Обработка в `onload`.

**Пример-2. Синхронный POST-запрос (не рекомендуется для браузеров)**

```javascript
const xhr = new XMLHttpRequest();

xhr.open("POST", "https://jsonplaceholder.typicode.com/posts", false);

xhr.setRequestHeader("Content-Type", "application/json");

xhr.send(
  JSON.stringify({
    title: "foo",
    body: "bar",
    userId: 1,
  })
);

if (xhr.status === 201) {
  console.log("Создано:", JSON.parse(xhr.responseText));
} else {
  console.error("Ошибка:", xhr.status);
}
```

Код блокируется до ответа. В браузере может вызвать "заморозку" интерфейса.

**Пример-3. Асинхронный запрос с прогрессом и таймаутом**

```javascript
const xhr = new XMLHttpRequest();

xhr.open("GET", "https://httpbin.org/delay/2", true); // Задержка 2 секунды

xhr.timeout = 3000; // 3 секунды timeout

xhr.onprogress = function (event) {
  if (event.lengthComputable) {
    console.log("Прогресс:", (event.loaded / event.total) * 100 + "%");
  }
};

xhr.onload = function () {
  console.log("Завершено:", xhr.responseText);
};

// Событие сработает, если запрос превышает установленный timeout
xhr.ontimeout = function () {
  console.error("Таймаут");
};

xhr.send();
```

В данном коде отслеживается прогресс загрузки. Если сервер медленный, срабатывает таймаут.
Комментарии

- `xhr.onprogress` - Срабатывает во время загрузки данных с сервера. Позволяет отслеживать, сколько данных уже получено и вычислять процент прогресса.
- `event.lengthComputable` - Указывает, известен ли общий размер загружаемых данных (true - да, false - нет).
- `event.loaded` - Число (в байтах), указывающее, сколько данных уже загружено на данный момент. Если загружено 512 байт, event.loaded будет 512.
- `event.total` - Число (в байтах), указывающее размер данных, которые должны быть загружены. Для файла размером 1024 байта event.total будет 1024.
- `xhr.ontimeout` - Событие срабатывает, если запрос превышает установленный timeout.

**Пример-4. Отправка формы с файлом (multipart/form-data)**
HTML

```html
<body>
  <input type="file" id="file-input" accept="image/*" />
  <!-- Элемент для загрузки файла -->
  <button onclick="uploadFile()">Загрузить файл</button>
</body>
```

JavaScript

```javascript
function uploadFile() {
  const fileInput = document.getElementById("file-input");
  if (!fileInput.files[0]) {
    alert("Выберите файл!");
    return;
  }

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://httpbin.org/post", true);

  const formData = new FormData();
  formData.append("file", fileInput.files[0]); // Добавляем файл
  formData.append("name", "example"); // Добавляем текстовое поле

  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log("Файл загружен:", JSON.parse(xhr.responseText));
      // Ответ от httpbin.org: объект с полями form, files и т.д.
    } else {
      console.error("Ошибка:", xhr.status);
    }
  };

  xhr.onerror = function () {
    console.log("Сетевая ошибка");
  };

  xhr.send(formData); // Отправляем FormData
}
```

Комментарии
`formData` - это встроенный в JS интерфейс для удобного формирования и отправки данных в формате multipart/form-data (стандартный формат для загрузки файлов и сложных форм через HTTP). Решает 2 ключевые задачи:

- Отправка файлов через AJAX (XMLHttpRequest или fetch)
- Упрощает сбор данных формы, включая тектосвые поля и файлы, в единый объект для отправки.

### Плюсы и минусы XMLHttpRequest

**Плюсы**

- Полный контроль над запросом (заголовки, таймауты, прогресс);
- Поддержка синхронных запросов (для Node.js);
- Широкая поддержка в старых браузерах.

**Минусы**

- Громоздкий код по сравнению с Fetch API.
- Не поддерживает промисы нативно (нужны обёртки);
- Синхронный режим блокирует UI в браузерах;
- Нет встроенный поддержки для отмены (нет AbortController)

**Альтернативы и лучшие практики**

- Современная альтернатива: Fetch API - проще, возвращает промисы, поддерживает async/await.
- Библиотеки: Axios или jQuery.ajax для упрощения
- Лучшие практики:
- - Всегда использовать асинхронный режим в браузерах;
- - Проверять `xhr.status` и обрабатывать ошибки;
- - Для кросс-доменных запросов настроить CORS на сервере;
- - Тестировать в DevTools (Network tab) для отладки;
- - Избегать XHR для новых проектов, выбор в пользу Fetch.

## Введение в Ajax (Asynchronous JavaScript and XML)

Ajax (Asynchronous JavaScript and XML) - это техника веб-разработки, позволяющая обновлять части веб-приложения асинхронно, без полной перезагрузки. Она основана на XMLHttpRequest (XHR) или современных API (Fetch). Ajax делает веб-приложения более интерактивными, как Gmail или Google Maps. Название включает "XML", но сегодня чаще используется JSON или другие форматы. Ajax является не отдельной технологией, а комбинацией JS, HTML, CSS и HTTP.

- **История**: Введён в 2005 году Jesse James Garrett (революционер веба, позволивший динамические обновления);
- **Ключевые компоненты**: JS для запросов, сервер для обработки, DOM для обновления UI;
- **Использование**: Формы, часы, прокрутки, поиск в реальном времени.

### Механизм работы Ajax

Ajax отправляет HTTP-запросы в фоне, получает данные и обновляет страницу. Процесс:

1. **Событие**: Пользователь взаимодействует (клик, ввод).
2. **Запрос**: JS отправляет асинхронный запрос.
3. **Обработка**: Сервер отвечает данными.
4. **Обновление**: JS парсит данные и изменяет DOM.

- Асинхронность: Код не блокируется; пользователь может продолжать взаимодействовать.
- Формат данных: JSON (популярно), XML, HTML, текст.
- Безопасность: Использовать HTTPS; проверять CORS для кросс-доменных запросов.

### XMLHttpRequest как основа Ajax

XHR - ядро Ajax. Он позволяет отправлять запросы и обрабатывать ответы.

**Пример-1. Простой GET-запрос для загрузки данных**
HTML

```html
<div id="content"></div>
```

JS

```javascript
const xhr = new XMLHttpRequest();

xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/1", true);

xhr.onload = function () {
  if (xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    document.getElementById("content").innerHTML = `${data.title}`;
  }
};

xhr.send();
```

Код выше загружен пост и обновляет DOM без перезагрузки.

**Пример-2. POST-запрос для отправки формы (без перезагрузки)**
HTML

```html
<form id="myForm">
  <input name="name" /><button type="submit">Отправить</button>
</form>
```

JS

```javascript
document.getElementById("myForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Предотвращает перезагрузку

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://httpbin.org/post", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log("Отправлено: " + JSON.parse(xhr.responseText).data);
    }
  };
  xhr.send(JSON.stringify({ name: this.name.value }));
});
```

Комментарии 0. Данный код отправляет данные формы асинхронно; показывает лог с ответом.

1. `this` - это сам элемент формы (<form id="myForm">);
2. `this.name` - это поле ввода внутри формы с атрибутом `name="name"`;
3. `.value` - свойство элемента формы, содержащее текущее значение, введённое пользователем в поле;
   `this.name.value` возвращает текст, который пользователь ввёл в поля "Имя".

**Пример-3. Ajax с прогрессом для загрузки файла**
HTML

```html
<input type="file" id="file" /><button onclick="upload()">Загрузить</button
><progress id="progress" max="100"></progress>
```

JS

```javascript
function upload() {
  const file = document.getElementById("file").files[0];
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://httpbin.org/post", true);
  const formData = new FormData();
  formData.append("file", file);
  xhr.upload.onprogress = function (e) {
    if (e.lengthComputable) {
      document.getElementById("progress").value = (e.loaded / e.total) * 100;
    }
  };
  xhr.onload = function () {
    console.log("Файл загружен");
  };
  xhr.send(formData);
}
```

**Пример-4. Поиск репозиториев Github**
HTML

```html
<label for="search">Найти профиль на Github</label>
<input type="text" id="search" placeholder="Поиск" style="display: block;" />
<div id="results"></div>
```

JS

```javascript
let timeout;

document.getElementById("search").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      const query = this.value;
      console.log("query :>> ", query);

      if (query.length > 2) {
        const xhr = new XMLHttpRequest();
        xhr.open(
          "GET",
          `https://api.github.com/search/repositories?q=${query}`,
          true
        );
        xhr.onload = function () {
          if (xhr.status === 200) {
            const repos = JSON.parse(xhr.responseText).items;
            const resultElement = document.getElementById("results");

            if (resultElement) {
              // Формируем HTML для всех репозиториев
              const html = repos
                .map((r) => {
                  if (r.name.endsWith(".io")) {
                    // Репозитории с .io — выделяем (например, жирным)
                    return `<div><a href="https://github.com/${r.name.slice(
                      0,
                      r.name.indexOf(".github")
                    )}">${r.name}</a></div>`;
                  } else {
                    // Остальные — обычным текстом
                    return `<div><a href="https://github.com/${r.name}">${r.name}</a></div>`;
                  }
                })
                .join(""); // Объединяем без разделителей (разметка уже содержит <div>)

              resultElement.innerHTML = html || "Репозитории не найдены";
            } else {
              console.error("Элемент #result не найден!");
            }
          } else {
            console.error("Ошибка API:", xhr.status, xhr.statusText);
          }
        };

        xhr.send();
      } else {
        alert("Профиль не найден");
      }
    }, 300); // Debounce 300ms
  }
});
```

**Пример-5: обработка ошибок и таймаута**

```javascript
const xhr = new XMLHttpRequest();
xhr.open("GET", "https://httpbin.org/delay/5", true);
xhr.timeout = 3000;

xhr.onload = function () {
  console.log("Успех");
};
xhr.onerror = function () {
  console.error("Сетевая ошибка");
};
xhr.ontimeout = function () {
  console.error("Таймаут");
};
xhr.send();
```

### Преимущества Ajax

1. **Интерактивность**: Страница обновляется частично, улучшая UX.
2. **Производительность**: Меньше трафика (только данные, не весь HTML).
3. **Масштабируемость**: Легко интегрировать с REST API.
   Примеры: социальные сети, онлайн-редакторы.

### Недостатки

1. **SEO**: Поисковики не индексируют динамический контент (решите SSR);
2. **Браузерная поддержка**: Не поддерживается без полифилов в старых браузерах;
3. **Безопасность**: Риск XSS, необходимо валидировать данные;
4. **Отладка**: Сложнее, чем в синхронных запросах.

### Альтернативы Ajax

- FetchAPI: современная замена XHR с промисами

```javascript
fetch("url").then((r) => r.json().then((data) => updateUI(data)));
```

- Axios: библиотека с автоматическим JSON-парсингом и interceptors.

```javascript
axios.get("url").then((res) => console.log(res.data));
```

- jQuery.ajax: устаревшая, но простая

```javascript
$.ajax({ url: "url", success: callback });
```

### Лучшие практики

- Использовать асинхронность: всегда true или async.
- Обработка состояний: показывать спиннеры/loading.
- Кэширование: добавляйте заголовки Cache-Control.
- Тестирование: используйте инструменты вроде Postman или DevTools Network.
- Доступность: добавьте ARIA для screen readers.

## Понятие HTTP-заголовка

HTTP-заголовки - это метаданные, передаваемые в HTTP-запросах и ответах между клиентом (браузером) и сервером. Они содержат информацию о запросе/ответе, такую как тип данных, аутентификация, кеширование и т.д. Заголовки состоят из имени (key) и значения (value), разделённых двоеточием. Они делятся на заголовки запроса (от клиента) и ответа (от сервера).

### Основная информация

**1. Типы заголовков**

- Запроса: Content-Type (тип тела), Authorization (аутентификация), User-Agent (инфо о клиенте);
- Ответа: Content-Type (тип данных), Cache-Control (кеширование), Set-Cookie (куки);

**2. Формат**
`Имя: Значение` (`Content-Type: application/json`).

**3. Важность**
Управляют поведением запроса (например, CORS, сжатие). Без них сервер не поймёт, как обрабатывать данные.

**4. Пример стандартных заголовков**

- `Accept: application/json` - клиент хочет JSON.
- `Content-Length: 123` - размер тела в байтах.
- `Host: example.com` - домен сервера.

### Практические примеры

**1. Установка и чтение заголовков**

FETCH

```javascript
// FETCH
fetch("https://httpbin.org/get", {
  method: "GET",
  headers: {
    Accept: "application/json",
    Authorization: "Bearer mytoken123",
  },
})
  .then((response) => {
    if (!response.ok) throw new Error("Ошибка: " + response.status);
    console.log("Content-Type ответа:", response.headers.get("Content-Type"));
    console.log("Все заголовки:", [...response.headers.entries()]);
    return response.json();
  })
  .then((data) => console.log("Данные:", data))
  .catch((error) => console.error("Ошибка:", error));
```

XMLHttpRequest

```javascript
const xhr = new XMLHttpRequest();
xhr.open("GET", "https://httpbin.org/get", true);

// Установка заголовка запроса
xhr.setRequestHeader("Accept", "application/json");
xhr.setRequestHeader("Authorization", "Bearer mytoken123123");

xhr.onload = function () {
  if (xhr.status === 200) {
    // Чтение заголовков ответа
    console.log("Content-Type ответа:", xhr.getResponseHeader("Content-Type"));
    console.log("Все заголовки:", xhr.getAllResponseHeaders());
    console.log("Данные:", JSON.parse(xhr.responseText));
  }
};

xhr.send();
```

## Использование метода GET

Метод GET - один из основных HTTP-методов, используемый для получения данных с сервера. Он безопасен (не изменяет данные), идемпотентен (повторные вызовы дают тот же результат) и кешируемый. Данные передаются в URL как query parameters (после `?`). GET подходит для чтения ресурсов, поиска, фильтрации.

- Использование: для запросов без изменения данных (получение списка товаров);
- Ограничения: URL ограничен длиной (~2048 символов): чувствительные данные не передать (видны в логах);
- Структура запроса: `GET /path?param1=value1&param2=value2 HTTP/1.1`;
- Коды ответа: 200 (OK), 404 (Not Found).

GET получает данные; параметры в URL. В Fetch - `method: GET` (по умолчанию). Кэшируется, безопасен.

- Применение: чтение данных;
- Ограничения: длина URL; не для чувствительных данных.

**Пример GET-запроса FETCH**
HTML

```html
<input id="query" placeholder="Поиск" /><button onclick="search()">
  Искать
</button>
<div id="results"></div>
```

JS
```javascript
async function search() {
  const query = document.getElementById("query").value;
  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(
    query
  )}&sort=stars`; // Замена пробелов на '%'


  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Ошибка: " + response.status);
    const data = await response.json();
    const repos = data.items.slice(0, 5);

    document.getElementById("results").innerHTML = repos
      .map((repo) => `<p>${repo.name} (${repo.stargazers_count} звёзд)</p>`)
      .join("");
  } catch (error) {
    console.error("Ошибка:", error);
  }
}
```

Данный код асинхронно получает репозитории, обновляет DOM.

**Пример GET-запроса XMLHttpRequest**
HTML

```html
<input id="query" placeholder="Поиск" /><button onclick="search()">
  Искать
</button>
<div id="results"></div>
```

JS

```javascript
function search() {
  const query = document.getElementById('query').value;
  const xhr = new XMLHttpRequest();

  xhr.open('GET', `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars`, true); // Замена пробелов на '%'

  xhr.onload = function() {
    if (xhr.status === 200) {
      const repos = JSON.parse(xhr.responseText).items;
      document.getElementById('results').innerHTML = repos.slice(0, 5).map(repo => `<p>${repo.name} (${repo.stargazers_count} звёзд)</p>`).join('');
    } else {
      console.error('Ошибка:', xhr.status)
    }
};
  xhr.send();
}
```
Отправляет GET с параметрами `q` (запрос) и `sort` (сортировка). API Github возвращает репозитории. Результаты отображаются в DOM.


### URL кодирование
URL кодирование (URL encoding) преобразует специальные символы в URL в безопасный формат, используя проценты (%) и hex-коды (например, пробел -> %20). Это необходимо, потому что URL не поддерживает все символы напрямую. В JS используется `encodeURLComponent()` и `encodeURI()` для всего URL.

**Использование**
Для query parameters с пробелами, символами (&, =, ?) или не-ASCII (кириллица).

**Функции**
- `encodeURLComponent(str)`: Кодирует всё, кроме A-Z, a-z, 0-9, -, _, .-, ~.
- `encodeURL(str)`: Кодирует меньше (оставляет ://, ?);
- `decodeURLComponent(str)`: Декодирует обратно.
Пример: "hello world" → "hello%20world"; "привет" → "%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82".


**Кодирование Fetch**
HTML
```html
<input id="search" placeholder="Введите запрос"><button onclick="fetchData()">Отправить</button>
```

JS
```javascript
async function fetchData() {
    const rawQuery = document.getElementById('search').value;
    const encodedQuery = encodeURIComponent(rawQuery);
    const url = `https://httpbin.org/get?query=${encodedQuery}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Ошибка: ' + response.status);
        const data = await response.json();
        console.log('Исходный:', rawQuery);
        console.log('Закодированный:', encodedQuery);
        console.log('Сервер получил:', data.args.query);
    } catch (error) {
        console.error('Ошибка:', error);
    }
}
```

**Кодирование XMLHttpRequest**
HTML
```html
<input id="search" placeholder="Введите запрос"><button onclick="fetchData()">Отправить</button>
```

JS
```javascript
async function fetchData() {
    const rawQuery = document.getElementById('search').value;
    const encodedQuery = encodeURIComponent(rawQuery);
    const url = `https://httpbin.org/get?query=${encodedQuery}`;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        console.log('Исходный запрос:', rawQuery);
        console.log('Закодированный:', encodedQuery);
        console.log('Сервер получил:', response.args.query);
      }
    };

    xhr.send();
}
```

### Использование метода POST
Метод POST отправляет данные на сервер для создания/обновления ресурсов. Он не кэшируется, не идемпотентен и передаёт данные в теле запроса (не в URL). Используется для форм, загрузки данных, аутентификации.

- **Когда использовать**: для изменения данных (создание, обновление);
- **Тело запроса**: JSON, FormData, текст. Устанавливаем `Content-Type`;
- **Коды ответа**: 201 (Created), 200 (OK), 400 (Bad Request);
- **Безопасность**: Передаём чувствительные данные; проверяем на сервере.



**POST с FETCH**
HTML
```html
<form id="contactForm"><input name="name" placeholder="Имя..."><input name="email" placeholder="Email..."><button>Отправить</button></form>
```

JS
```javascript
document
  .getElementById("contactForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(this);

    try {
      const response = await fetch("https://httpbin.org/post", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Ошибка: " + response.status);
      const data = await response.json();
      console.log("Отправлено:", data.form);
      alert("Форма отправлена!");
    } catch (error) {
      console.error("Ошибка: ", error);
    }
  });
```


**XMLHttpRequest c POST**
HTML
```html
<form id="contactForm"><input name="name"><input name="email"><button type="submit">Отправить</button></form>
```

JS
```javascript
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(this);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://httpbin.org/post', true);

  xhr.onload = function() {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      console.log('Отправлено:', response.form);
      alert('Форма отправлена');
    }
  };
  xhr.send(formData);
});
```