let numb = 20;

function isEven(n) {
    if (n === 0) return true;
    if (n === 1) return false;
    return isEven(Math.abs(n) - 2);
}

console.log(isEven(numb) ? 'чётное' : 'нечётное');