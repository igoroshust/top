function isFirstDigitEqual(firstNumber, secondNumber) {
    return +String(firstNumber)[0] === +String(secondNumber)[0]
}

const result = isFirstDigitEqual(330, 13);

console.log(result);