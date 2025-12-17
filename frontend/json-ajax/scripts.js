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