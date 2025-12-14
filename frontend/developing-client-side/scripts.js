const div = document.querySelector('.test');

// Создаём диапазон
const range = document.createRange();
const selection = window.getSelection();

// Находим текстовый узел внутри div (обычно firstChild)
const textNode = div.firstChild;

// Устанавливаем границы выделения
range.setStart(textNode, 0); // Начало: позиция 0
range.setEnd(textNode, textNode.length-6); // Конец: длина текста

// Применяем выделение
selection.removeAllRanges();
selection.addRange(range);