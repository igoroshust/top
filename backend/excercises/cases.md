# Уровень 1.1

### Дано число. Проверьте, отрицательное оно или нет. Выведите об этом информацию в консоль.
```python
num = -320

print('+' if num > 0 else ('0' if num == 0 else '-'))
```

### Найти периметр прямоугольника
```python
a = float(input('Введите длину прямоугольника: '))
b = float(input('Введите ширину прямоугольника: '))

perimeter = 2 * (a + b)
print('Периметр: ', perimeter)
```
С map
```python
a, b = map(float, input('Введите две стороны прямоугольника: ').split())
print("Периметр: ", 2 * (a + b))
```

### Найти периметр треугольника
С map
```python
a, b, c = map(int, input('Введите стороны треугольника: ').split())  # ['123', '321', '333]
print("Периметр: ", a + b + c)
```

### Найти максимальное число (тернарный оператор)
```python
a = 2
b = 3
c = -4

d = (a if a > c else c) if a > b else (b if b > c else c)
print(d)
```

### Найти сумму (while)
```python
s = 0
start = 1
end = 5

while start <= end:
    s += start
    start += 1
    
print(s)  # 15
```

### Найти чётное число в списке (while)
```python
d = [1, 5, 3, 61, -41, 22]

flFind = False
i = 0

while i < len(d):
    flFind = d[i] % 2 == 0
    if flFind:
        break
    i += 1
    
print('есть' if flFind else 'нет')
```


# Проверить чётность числа
Моё решение
```python
num = 40

def isNegative(number): 
    return 'Positive' if number > 0 else ('Zero' if number == 0 else 'Negative')

print(
    isNegative(-10)
)
```

if-elif-else
```python
def isNegative(number):
    if number < 0:
        return 'Negative'
    elif number == 0:
        return 'Zero'
    else:
        return 'Positive'

print(isNegative(-10))
```

lambda
```python
def isNegative(number):
    conditions = [lambda x: x < 0, lambda x: x == 0, lambda x: x > 0]
    results = ['Negative', 'Zero', 'Positive']
    for i, cond in enumerate(conditions):
        if cond(number):
            return results[i]

print(isNegative(-10))
```

Словарь
```python
def isNegative(number):
    signs = {True: 'Negative', False: 'Positive'}
    return signs[number < 0] if number != 0 else 'Zero'

print(isNegative(-10))
```

startswith
```python
def isNegative(number):
    return 'Negative' if str(number).startswith('-') else ('Zero' if number == 0 else 'Positive')

print(isNegative(-10))  # Negative
```


operator.lt
```python
from operator import lt, eq

def isNegative(number):
    return ('Negative' if lt(number, 0) else 
            'Zero' if eq(number, 0) else
            'Positive')

print(isNegative(-10))
```

math.sign
```python
import math

def isNegative(number): 
    sign = math.sign(number)
    if sign > 0: return 'Positive'
    elif sign == 0: return 'Zero'
    else: return 'Negative'

print(isNegative(-10))  # Negative

`math.sign` возвращает знак числа, как float: 
print(math.sign(10))  # 1.0
print(math.sign(0))  # 0.0
print(math.sign(-10))  # -1.0
print(math.sign(-0.0))  # -0.0
```
