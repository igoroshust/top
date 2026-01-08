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
