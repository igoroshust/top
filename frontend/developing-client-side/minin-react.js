/* ReactJS-подход (декларативный) */
import { useState } from "react";

const content = [
    { title: 'HTML', text: 'Учи HTML и будь красавчиком' },
    { title: 'CSS', text: 'Учи CSS и будь красавчиком' },
    { title: 'JavaScript', text: 'Учи JS и постигнешь frontend' },
]

export default function App() {
    const [active, setActive] = useState(null);
    
    return (
        <ul>
            {content.map((item, index) => (
                <li
                    key={item.title}
                    onClick={() => setActive(index)}
                    className={index === active ? "active" : null}
                >
                    <h3>{item.title}</h3>
                    <div className="content">{item.text}</div>
                </li>
            ))}
        </ul>
    );
}




/* Vanilla JS подход (императивный) */
// const content = [
//     { title: 'HTML', text: 'Учи HTML и будь красавчиком' },
//     { title: 'CSS', text: 'Учи CSS и будь красавчиком' },
//     { title: 'JavaScript', text: 'Учи JS и постигнешь frontend' },
// ]

// const container = document.querySelector('ul');

// function toHTML(item) {
//     return `
//         <li>
//             <h3>${item.title}</h3>
//             <div class="content">${item.text}</div>
//         </li>
//     `
// }

// function renderContent() {
//     const html = content.map(toHTML).join(''); // Пробегаемся по каждому элементу контента и преобразовываем его в строчку
//     container.insertAdjacentHTML('afterbegin', html); // Вставляем результат в контейнер
// }

// renderContent();

// function removeActiveClasses() {
//     container
//     .querySelectorAll('li')
//     .forEach((li) => li.classList.remove('active'))
// }

// container.addEventListener('click', (event) => {
//     if (
//         event.target.tagName.toLowerCase() === 'li' ||
//         event.target.closest('li')?.tagName.toLowerCase() === 'li'
//     ) {
//         removeActiveClasses()
//         event.target.closest('li').classList.add('active')
//     }
// });