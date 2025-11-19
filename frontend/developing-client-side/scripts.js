const parent = document.querySelector('.parent');
const target = document.querySelector('.target');

const newP = document.createElement('p');
newP.innerText = 'asdasdadsads';

parent.insertBefore(newP, target);