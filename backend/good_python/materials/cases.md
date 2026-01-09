## Разница между copy и deepcopy
```python
import copy

original = [[1, 2], [3, 4]]
shallow_copy = copy.copy(original)
deep_copy = copy.deepcopy(original)

shallow_copy[0][1] = 4  # мутирут оригинал

print('original', original)  #  [[1, 4], [3, 4]]
print('shallow', shallow_copy)  #  [[1, 4], [3, 4]]
print('deepcopy', deep_copy) # [[1, 2], [3, 4]]
```
id у всех будут разные


### Отличия shallow copy и deep copy
- Shallow copy (поверхностная копия) создаёт новый внешний объект, но вложенные объекты остаются общими (копируются только ссылки на них). Создаёт новый список с другим id, но его элементы - это та же ссылка на элементы "родителя", поэтому при изменении происходит мутация.
- Deep copy создаёт полностью независимый объект: копируются и внешний контейнер, и все вложенные элементы рекурсивно. Тоже полностью независимый объект, элементы аналогично скопированы, но с другим id и изменения в deep copy не затрагивают оригинал.

**Использование**
- `copy.copy()` - нужно быстро скопировать простой список/словарь без вложенных изменяемых объектов (экономит память и время).
- `copy.deepcopy()` - есть вложенные списки, словари или другие изменяемые объекты, и нужна полная изоляция.


### ASCII значения латиницы и кириллицы
```python
print(
    alphabet_upper := [{chr(i): i} for i in range(ord('A'), ord('Z')+1)],
    alphabet_lower := [{chr(i): i} for i in range(ord('a'), ord('z')+1)],
    alphabet_rus_upper := [{chr(i): i} for i in range(ord('А'), ord('я')+1)],
    alphabet_rus_lower := [{chr(i): i} for i in range(ord('а'), ord('я')+1)],
    sep='\n\n'
)
```

### Отформатировать значение в строке
```python
digs = '1, 2,3,  4, 5,  6'
digs.replace(" ", "").split(",")
```

### Подсчёт суммы нечётных значений
```python
s = 0
d = 1

while d != 0:
    d = int(input('Введите число: '))
    if d % 2 == 0:
        continue
    s += d
    print('s = ', str(s))
```
Использование continue оправдано стремлением записи логики программы не в if, в а цикле (более читаемо)

### Перемножить элементы списка
```python
d = [1, 2, 3]
p = 1

for i in d:
    p *= i

print(p)
```

### Изменить список (for)
```python
d = [1, 2, 3, 4, 3, 2,1 ,2, 3]

for i in range(len(d)):
    d[i] = 0

print(d)
```

### Факториал числа
```python
n = int(input('Введите натуральное число не более 100: '))

# Если n не в диапазоне от 1 до 100
if not (1 <= n <= 100):
    # Исходное условие: n < 1 or n > 100
    print('Неверно введено натуральное число')
else:
    p = 1
    for i in range(1, n+1):
        p *= i
        
    print(f'Факториал {n}! = {p}')
```

### Убрать пробел в начале строки (учебный пример)
```python
words = ["python", "язык", "программирования"]

s = ''
fl_first = True

for w in words:
    s += ('' if fl_first else ' ') + w
    fl_first = False
    
print(s)
```

### Замена двухзначных чисел в списке на ноль
```python
digs = [4, 3, 100, -53, -30, 1, 34, -8, 42]

for index in range(len(digs)):
    # Если i - двухзначное число
    if 10 <= abs(digs[index]) <= 99:
        digs[index] = 0
        
print(digs)
```

Через enumarate
```python
digs = [4, 3, 100, -53, -30, 1, 34, -8, 42]

for index, value in enumerate(digs):
    # Если i - двухзначное число
    if 10 <= abs(value) <= 99:
        digs[index] = 0
        
print(digs)
```

### Замена кириллицы латиницей (учебный пример)
```python
t = ['a', 'b', 'v', 'g', 'd', 'e', 'zh', 'z', 'i', 'y', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'f', 'h', 'c', 'ch', 'sh', 'shch', '', 'y', '', 'e', 'yu', 'ya']

start_index = ord('а')  # Значение кода для русской 'а' 1072
title = "Программирование на Python - лучший курс"
slug = ''  # Храним преобразование кириллицы в латиницу

for s in title.lower():
    if 'а' <= s <= 'я':
        slug += t[ord(s) - start_index]  # t[1087 - 1072] = t[15] = p
        # Разница между кодом текущей буквы и кодом "a" даёт позицию буквы в алфавите (начиная с 0)
    elif s == 'ё':
        slug += 'yo'
    elif s in " !?;:.,":
        slug += '-'
    else:
        slug += s
        
while slug.count('--'):
    slug = slug.replace('--', '-')
        
print(slug)
```
