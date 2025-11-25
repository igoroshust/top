const p = document.querySelector('.paragraph');
const btn = document.querySelector('#btn');

setTimeout(() => {
    p.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start'
    });
    console.log('Event');
}, 3000);

