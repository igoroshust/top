// Перебор всех форм и их элементов
Array.from(document.forms).forEach((form, index) => {
    console.log(`Форма ${index}: ${form.getAttribute('name')}`);
    Array.from(form.elements).forEach(element => {
        console.log(`Элемент: ${element.name} (${element.type})`);
    })
});