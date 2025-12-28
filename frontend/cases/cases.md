- spread operator
- Array.from()
- for...of
- regex
- ES6+
- iterator + generator


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