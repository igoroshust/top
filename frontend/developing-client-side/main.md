# Сформируйте с помощью циклов следующий массив: [ [1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3]]

forEach + map (рекомендовано тестом производительности)
```javascript
const resultArr = Array.from({ length: 5 }, () => [1, 2, 3]);
console.log(resultArr);
```

Классический вложенный for
```javascript
const resultArr = [];
const ROWS = 5;
const COLS = 3;

for (let row = 0; row < ROWS; row++) {
    const currentRow = []; // Новый массив создаётся на каждой итерации
    for (let col = 1; col <= COLS; col++) {
        currentRow.push(col);
    }
    resultArr.push(currentRow);
}
```

Моё решение 
```javascript
let resultArr = [];
let bit = [];

c = 5
while(c--) {
    for (let i = 1; i < 4; i++) {
        bit.push(i)
    }
    resultArr.push(bit);
    bit = [];
}

console.log(resultArr)
```

Моё улучшенное решение
```javascript
const resultArr = [];
const ROW_COUNT = 5;

for (let row = 0; row < ROW_COUNT; row++) {
    const rowData = [];
    for (let i = 1; i <= 3; i++) {
        rowData.push(i);
    }
    resultArr.push(rowData);
}
```

Array.fill
```javascript
// Предупреждение: это создаст ссылки на один массив. Не нужно мутировать элементы.

const resultArr = Array(5).fill([1, 2, 3]);
console.log(resultArr);
```


map + spread
```javascript
const resultArr = Array.from({ length: 5 }, () => [...[1, 2, 3]])
```

# Изменить регистр

regexp
```javascript
let string = 'camelCase';

const toSnakeCaseRegExp = str => str.replace(/[A-Z]/g, '_$&').toLowerCase();
// $& - вся найденная подстрока: '_$&' = '_C'
// console.log(toSnakeCaseRegExp('camelCase'));
```

for
```javascript
let string = 'camelCase';

const toSnakeCase = string => {
    let formattedString = '';

    for (let i = 0; i < string.length; i++) {
        if (string[i] === string[i].toUpperCase()) {
            formattedString += `_${string[i].toLowerCase()}`;
        } else {
            formattedString += string[i];
        }
    }
    return formattedString;
};

const result = toSnakeCase(string);

console.log(result);
```

reduce
```javascript
let string = 'camelCase';

const formattedString = string.split('').reduce((acc, i) => i === i.toUpperCase() ? acc + `_${i.toLowerCase()}`: acc + i, '');

console.log(formattedString);
```

Сравнение производительности 
```javascript
console.time('RegExp');
toSnakeCase1(testStr);
console.timeEnd('RegExp');     // ~15ms

console.time('Reduce');
toSnakeCase2(testStr);  
console.timeEnd('Reduce');     // ~85ms

console.time('For');
toSnakeCase3(testStr);
console.timeEnd('For');        // ~45ms
```