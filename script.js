let display = document.getElementById('display');
let history = document.getElementById('history');
let isOn = true;
let shiftMode = false;
let alphaMode = false;
let lastAnswer = '0';
let currentExpression = '';
let memory = '0';
let degreeMode = true;

// Basic Calculator Functions
function updateDisplay(value) {
    if (!isOn) return;
    display.value = value;
}

function appendNumber(num) {
    if (!isOn) return;
    if (display.value === '0' && num !== '.') {
        display.value = num;
    } else {
        display.value += num;
    }
    currentExpression = display.value;
}

function appendOperator(op) {
    if (!isOn) return;
    display.value += ` ${op} `;
    currentExpression = display.value;
}

function appendParenthesis(paren) {
    if (!isOn) return;
    if (display.value === '0') {
        display.value = paren;
    } else {
        display.value += paren;
    }
    currentExpression = display.value;
}

function clearAll() {
    if (!isOn) return;
    display.value = '0';
    history.textContent = '';
    currentExpression = '';
}

function deleteChar() {
    if (!isOn) return;
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        display.value = '0';
    }
    currentExpression = display.value;
}

// Scientific Functions
function calculate(type) {
    if (!isOn) return;
    let value = parseFloat(display.value);
    let result;

    switch(type) {
        case 'sqrt':
            result = Math.sqrt(value);
            break;
        case 'square':
            result = value * value;
            break;
        case 'sin':
            result = degreeMode ? Math.sin(value * Math.PI / 180) : Math.sin(value);
            break;
        case 'cos':
            result = degreeMode ? Math.cos(value * Math.PI / 180) : Math.cos(value);
            break;
        case 'log':
            result = Math.log10(value);
            break;
        case 'inverse':
            result = 1 / value;
            break;
        default:
            return;
    }

    display.value = result.toFixed(8).replace(/\.?0+$/, '');
    currentExpression = display.value;
    lastAnswer = display.value;
}

function calculateResult() {
    if (!isOn) return;
    try {
        let expression = currentExpression
            .replace('×', '*')
            .replace('÷', '/');
        let result = eval(expression);
        history.textContent = currentExpression;
        display.value = result;
        lastAnswer = result;
        currentExpression = result.toString();
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => {
            display.value = '0';
            currentExpression = '';
        }, 1000);
    }
}

// Mode Functions
function togglePower() {
    isOn = !isOn;
    if (!isOn) {
        display.value = '';
        history.textContent = '';
    } else {
        display.value = '0';
    }
}

function toggleShift() {
    if (!isOn) return;
    shiftMode = !shiftMode;
    document.querySelectorAll('button').forEach(btn => {
        btn.classList.toggle('shifted', shiftMode);
    });
}

function toggleAlpha() {
    if (!isOn) return;
    alphaMode = !alphaMode;
}

function appendAnswer() {
    if (!isOn) return;
    if (display.value === '0') {
        display.value = lastAnswer;
    } else {
        display.value += lastAnswer;
    }
    currentExpression = display.value;
}

function appendExponent() {
    if (!isOn) return;
    display.value += '×10^';
    currentExpression = display.value;
}


updateDisplay('0');
