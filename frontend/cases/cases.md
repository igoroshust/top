### **Анализ знака числа (положительное или отрицательное)**
1) Простой вариант
```javascript
const number = 103;

if (number > 0) {
    console.log('+');
} else if (number === 0) {
    console.log('0');
} else {
    console.log('-');
}
```

2) Вложенность в тернарном операторе
Приемлемо, поскольку уровень вложенности менее 3
```javascript
const number = -1;

console.log(
   number > 0 ? '+' : (number === 0 ? '0' : '-')
);
```

3) Через switch
```javascript
let number = 0;

switch (true) {
    case number > 0: console.log('+'); break;
    case number === 0: console.log('0'); break;
    default: console.log('-');
}
```

4) Через функцию-хелпер
```javascript
const getSign = (n) => n > 0 ? '+' : n === 0 ? '0' : '-';
console.log(getSign(-2));
```

### **Вывести длину строки**
1) Через spread operator
Плюсы: лаконично
Минусы: -создаёт временный массив и медленнее length
```javascript
let string = 'somestring';

const length = [...string].length;
```

2) Через Array.from()
```javascript
const length = Array.from(string).length;
```

3) Рекурсивный метод (учебный пример). 
Минусы: O(n) по времени и памяти, не для production
```javascript
function getLength(str) {
    return str === '' ? 0 : 1 + getLength(str.slice(1));
}

console.log(
    getLength('abc')
);

// str.slice(1) - "отрезает" первый символ строки (возвращает подстроку от индекса 1 до конца). На каждом шаге рекурсии строка становится короче на 1 символ, что позволяет "сдвигать" обработку к концу строки, пока не останется пустая строка ('').
// 1 + ... - прибавляет 1 к результату вызова функции для укороченной строки.

// `abc` => 1 + getLength('bc'); 1 + 2 = 3 (ответ)
// `bc` => 1 + getLength('c'); 1 + 1 = 2
// `c` => 1 + getLength(''); 1 + 0 = 1
// `` => выход из рекурсии 


console.log(getLength("abc")); // 3
```
Разбор
1. `abc` не пустая -> `1 + getLength('bc')`;
2. `bc` не пустая -> `1 + (1 + getLength('c'))`;
3. `c` не пустая -> `1 + (1 + (1 + getLength('')`;
4. Подставляем результаты снизу вверх: `1 + (1 + (1 + 0))` -> `1 + (1 + 1)` -> `1 + 2` -> `3`


4) Через for...of (посимвольная итерация)
```javascript
let string = 'iajsdfpiadj';
let count = 0;

for (const char of string) count ++;

console.log('count :>> ', count); // 11
```

### Проверить чётность числа
1) Простой способ
```javascript
const numb = Number(prompt(': '));

console.log(
   numb % 2 === 0 ? `Число ${numb} чётное` : `Число ${numb} нечётное`
);
```

2) Побитовая операция И (&) - самый быстрый (на 10-30% быстрее в циклах)
```javascript
const numb = 2;
console.log((numb & 1) === 0 ? 'чётное' : 'нечётное');
```
1. Проверяет младший бит числа. У чётных чисел он всегда 0;
2. Плюсы: максимальная производительность (особенно в циклах);
3. Минусы: менее читаемо для новичков;
4. Использование: в критичных по скорости участках кода.

3) Через Number.isInteger()
```javascript
const numb = 2;
console.log(Number.isInteger(numb / 2) ? 'чётное' : 'нечётное');
```
1. Проверяет, является ли результат деления на 2 целым числом;
2. Плюсы: понятная семантика;
3. Минусы: медленнее `%`
4. Использование: когда важна читаемость кода.

4) Рекурсия (учебный пример)
```javascript
let numb = 20;

function isEven(n) {
    if (n === 0) return true;
    if (n === 1) return false;
    return isEven(Math.abs(n) - 2);
}

console.log(isEven(numb) ? 'чётное' : 'нечётное');
```
1. Как работает: вычитает 2, пока не достигнет 0 (чётное) или 1 (нечётное)
2. Плюсы: хорошо иллюстрирует рекурсию
3. Минусы: крайне неэффективно для больших чисел
4. Использования: для обучения алгоритмам.

### **Вывести последний символ строки**
```javascript
const string = 'igoroshust';

console.log(
    string.at(-1),
    string.slice(-1),
    string[string.length-1],
    string.charAt(string.length-1),
    string.substring(string.length - 1)
);
```

### **Сравнить первый символ в строке**
1) Через charAt
```javascript
const checkFirstWord = (word1, word2) => {
    return word1.charAt(0).toLowerCase() === word2.charAt(0).toLowerCase();
};

result = checkFirstWord('Asd', 'acxz');

console.log(
    result
);
```
2) Через at()
```javascript
const checkFirstWord = (word1, word2) => {
    return word1.at(0).toLowerCase() === word2.at(0).toLowerCase();
};

console.log(
    checkFirstWord('gtewrasdsda', 'Asfsidsdijf')
);
```

3) Через index
```javascript
const wordCheck = (firstWord, secondWord) => {
    return firstWord[0].toLowerCase() === secondWord[0].toLowerCase();
}

console.log(
    wordCheck('eDS', 'asd')
);
```

4) Через startsWith()
```javascript
const wordCheck = (firstWord, secondWord) => firstWord.toLowerCase().startsWith(secondWord[0].toLowerCase());
```

### **Вывести первую цифру числа**
1) +String
```javascript
const number = 123;

console.log(
    +String(number)[0]
);
```

2) Math.floor
```javascript
const number = 123;

console.log(
    Math.floor(number / 100)
);
```

3) charAt()
```javascript
const num = 123;

console.log(
    Number(String(num).charAt(0))
);
```

4) Деструктуризация массива
```javascript
const number = 123;
const [firstDigit] = Array.from(String(number)); // 1
const firstDigitWithoutBrackets = Array.from(String(number)); // ['1', '2', '3']

console.log('Number(firstDigit) :>> ', Number(firstDigit)); // 1 (number)
```
Комментарии:
1. `[firstDigit]` - деструктуризация массива. Суть: распаковываем массив и присваиваем первый элемент переменной `firstDigit`. Запись говорит: положи первый элемент массива в переменную firstDigit, а остальные значения (если есть) - игнорируются.
2. `Array.from(...)` - создаёт массив из строки(`'123'` -> `['1', '2', '3']`)


### Вывести последнюю цифру числа
1) %
Плюс: не требует преобразования в строку, быстро.
Минус: для отрицательных чисел даст отрицательный остаток
```javascript
const num = 12319203921;

console.log(num % 10);

// С учётом отрицательных значений
console.log(Math.abs(num) % 10); 
```

2) at
```javascript
const num = 12319203921;

console.log(+String(num).at(-1));
```


3) Через индекс массива
```javascript
const num = 123;

const digits = Array.from(String(num));
const lastNumber = digits[digits.length - 1];
```

4) Через String и индекс
```javascript
const num = 123;

const lastNumber = String(num)[String(num).length - 1];
```

5) Деструктуризация массива
Минусы: неэффективно, создаёт лишний массив `rest` и требует дополнительного обращения по индексу.
```javascript
const num = 123;

const [first, ...rest] = Array.from(String(num));
const lastNumber = rest[rest.length - 1];

console.log('Number(lastNumber) :>> ', Number(lastNumber));
```

### Вывести сумму первого и последнего числа
1) at
```javascript
const num = 123;

console.log(
    +String(num).at(0) + +String(num).at(-1)
);
```
Второй пример с at
```javascript
const num = 12393439239048239482394829348;

const firstNumber = Number(String(num).at(0));
const lastNumber = Number(String(num).at(-1));

const sum = firstNumber + lastNumber;

console.log('firstNumber:', firstNumber);
console.log('lastNumber:', lastNumber);
console.log('sum:', sum);
```

3) Через индексы строк
```javascript
const num = 123;

const numStr = String(num);
const firstNumber = Number(numStr[0]);
const lastNumber = Number(numStr[numStr.length - 1]);
const sum = firstNumber + lastNumber;
```

4) Деструктуризация
Минусы: избыточность (создаёт массив rest), медленее предыдущих вариантов
```javascript
const num = 123;

const [first, ...rest] = String(num);
const last = rest[rest.length - 1];
const sum = Number(first) + Number(last);

console.log('first :>> ', first); // 1
console.log('rest :>> ', rest); // ['2', '3']
console.log('sum :>> ', sum); // 4
```

### Объединение массивов
1) spread operator
```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]
```

### Объединение объектов
1) spread operator
```javascript
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3 };
const merged = {...obj1, ...obj2}; // {a: 1, b: 2, c: 3}
```

### Найти максимальный элемент в массиве чисел
1) spread operator
```javascript
const numbers = [13, 2, 3];
console.log('...numbers :>> ', ...numbers); // 13 2 3
console.log(Math.max(...numbers)); // 3
```

### Создание поверхностной копии объекта
1) spread operator
```javascript
const original = [1, 2, 3];
const copy = [...original]; // [1, 2, 3]
```

### Функция подсчёта суммы элементов массива
1) spread operator
```javascript
function sum(...args) {
  return args.reduce((a, b) => a + b, 0);
}

console.log(sum(1, 2, 3, 4));
```

### Создать массив от 1 до указанного количества элементов по порядку
```javascript
const result = Array.from({ length: 5 }, (_, i) => i + 1); // [1, 2, 3, 4, 5]
```

### Создать массив квадратов чисел от 0 до 4
```javascript
Array.from({ length: 5 }, (_, i) => i ** 2); // [0, 1, 4, 9, 16]
```

### Заполнить массив строкой
```javascript
Array.from({ length: 3 }, () => 'x'); // ['x', 'x', 'x']
```


### Дана некоторая строка. Переберите и выведите в консоль по очереди все символы с конца строки.
```javascript
let string = 'igoroshust';

for (let i = string.length - 1; i >= 0; i--) {
    console.log(string[i])
}
```

### Найти сумму квадратов элементов массива
**Моё решение**
```javascript
const numbers = [1, 2, 3, 4];
let count = 0;

numbers.forEach(number => count += number**2);

console.log(count);
```

**Через reduce**
```javascript
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((acc, num) => acc + num**2, 0); // 30
```


**Через for**
```javascript
const numbers = [1, 2, 3, 4];
let count = 0;

for (let i = 0; i < numbers.length; i++) {
    count += numbers[i]**2;
}

console.log(count);
```

**С использованием `Math.pow`**
```javascript
numbers.forEach(number => count += Math.pow(number, 2));
```

### Найти сумму квадратных корней массива
```javascript
const numbers = [1, 2, 3, 4];
let count = 0;

// forEach
// numbers.forEach(number => count += Math.sqrt(number));
// console.log(count);

// reduce
// let sum = numbers.reduce((acc, number) => acc + Math.sqrt(number), 0);
// console.log(sum);

// for
// for (let i = 0; i < numbers.length; i++) {
//     count += Math.sqrt(numbers[i]);
// }
// console.log(count);
```

### Найти сумму положительных элементов массива
```javascript
const numbers = [1, -2, 3, -4];
let count = 0;

// forEach
numbers.forEach(number => {
   if (number >= 0) count += number
});
console.log('count (foreach) :>> ', count);

// reduce
let sum = numbers.reduce((acc, num) => {
  if (num >= 0) acc += num;
  return acc;
}, 0);
console.log("sum :>> ", sum);

// reduce c тернарником
const sum = numbers.reduce((acc, num) => num >= 0 ? acc + num : acc, 0);
console.log('sum :>> ', sum);

// for
for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] >= 0) count += numbers[i]
}
console.log('count (for) :>> ', count);
```

### Найти сумму всех элементов больше 0 и меньше 10
```javascript
const numbers = [1, -2, 3, -4, 20, 30, 10, 9];
let count = 0;

// forEach
numbers.forEach(number => (number > 0 && number < 10) ? count += number : count);
console.log('count :>> ', count);

// reduce
const sum = numbers.reduce((acc, num) => (num > 0 && num < 10) ? acc + num : acc, 0);
console.log('sum :>> ', sum);

// for
count = 0;
for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > 0 && numbers[i] < 10) count += numbers[i];
}
console.log('count :>> ', count);
```

### Создать массив с элементами строки
```javascript
let str = 'abcde';

// split('')
const arrSplit = str.split('');
console.log(arrSplit); // Разбивает строку по каждому символу

// spread
const arrSpread = [...str];
console.log(arrSpread); // Разворачивает строку в массив символов

// Array.from()
const arrArrayFrom = Array.from(str);
console.log(arrArrayFrom); // Создаёт массив из итерируемого объекта (строка - итерируема)

// Object.keys() + map()
const arrObject = Object.keys(str).map(key => str[key]);
console.log(arrObject); // Object.keys(str) даёт индексы ['0', '1', ...], map преобразует индексы в символы по этим индексам
```

### Дано число, получить массив цифр числа
```javascript
const num = 12345;

// split + map
const numSplit = String(num).split('').map(Number);
// console.log(numSplit);

// spread
const numSpread = [...String(num)].map(Number);
// console.log(numSpread);

// Array.from
const numArray = Array.from(String(num), Number);
// console.log(numArray);

// Object.keys()
const str = String(num);
const digits = Object.keys(str).map(key => +str[key]);
console.log(digits);
```