// TODO: попрактиковаться с BOM-элементами





function showInfo(){
    // BOM: информация о браузере
    alert('User Agent: ' + navigator.userAgent);

    // BOM: текущий URL
    alert('Текущий URL: ' + location.href);

    // BOM: открыть новое окно
    window.open('https://composite.website/', '_blank');

    // BOM: история (назад)
    if (history.length > 1) {
        history.back();
    } else {
        alert('Нет предыдущей страницы в истории!');
    }
}

window.addEventListener('resize', () => {
    console.log('Окно изменено: ' + window.innerWidth + 'x' + window.innerHeight);
});

// BOM: доступ к DOM через window
window.onload = function(){
    // DOM: изменение документа
    document.body.style.backgroundColor = 'lightblue';

    // BOM: вывод в консоль браузера
    console.log('Страница загружена. Ширина экрана: ' + screen.width);
};