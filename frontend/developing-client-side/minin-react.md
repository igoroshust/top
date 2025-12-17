- оператор опционной цепочки (optional chaining)

```javascript
function renderContent() {
    const html = content.map(toHTML).join(''); // Пробегаемся по каждому элементу контента и преобразовываем его в строчку
    container.insertAdjacentHTML('afterbegin', html); // Вставляем результат в контейнер
}
```
map возвращает новый массив строк `["<li>...</li>", "<li>...</li>", "<li>...</li>"]`
join объединяет все элементы массива в одну строку `"<li>...</li><li>...</li><li>...</li>"`


```javascript
event.target.closest('li')?.tagName.toLowerCase() === 'li'
```
`?` - это оператор опциональной цепочки (optional chaining) в JS (добавлен в ES2020). Он предотвращает ошибку, если `event.target.closest('li')` возвращает `null` (например, если клик был не на `<li>` или его потомке).
- без `?`: если closest('li') вернёт null, попытка доступа к `.tagName` вызовет ошибку `TypeError`.
- с `?`: если `closest('li')` - `null`, выражение `event.target.closest('li')?.tagName` вернёт undefined, и проверка `undefined === 'li'` будет false, что безопасно.
Это делает код устойчивым к ситуациям, когда элемент не найден, и позволяет корректно обрабатывать клики только на `<li>` или внутри них.