// DOM Elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
};

// Copy password to clipboard
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if (!password) { return; }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard');
});

// Generate Event Listen
generate.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

// Generate Password Function
function generatePassword(lower, upper, number, symbol, length) {

    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

    // Doesn't have a selected tyoe
    if (typesCount === 0) {
        return '';
    }

    // Create a loop
    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }
    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}



//Generator Functions
//calculating random letter using Charset numbers. 
//A-z = number 87-122 on Browser Character Set
// Math.random will generate a random decimal
// We don't want decimals we want a whole #
// So we'll multiply by the limit that we want to set. 
// Multipling by 26 because 26 letters in alphabet. 
// Don't want decimal, want whole number so we'll wrap whole thing in math.floor which rounds down
// console.log(Math.floor(math.random() * 26);
// Now want to get from 97 to 122 on the Browser Character Set
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

// Upper random
// Browser character set upper case starts at 65 
// We'll just add 65 (instead of 97)
// console.log(getRandomUpper());
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

// Numbers on Browser Character Set spans from 0-9 (thats 10 characters) and is on Character set #'s 48-57
// We are adding 48 because we want to START at 48 (on the browser character set because that's where 0-9 are located)
function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}
// console.log(getRandomNumber());

// Random symbol c
function getRandomSymbol() {
    const symbols = "!@#$%^&*()";
    // return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
    // instead of return string, we'll use return symbol, and it's like an array with an index of 0 
    // We'll use math.floor to round down, and math.random again 
    // Multiply by the length of the symbols string 
    return symbols[Math.floor(Math.random() * symbols.length)];
}
// console.log(getRandomSymbol());