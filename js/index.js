const display = document.getElementById('result-display');
const buttons = document.querySelectorAll('button');
const operations = ['+', '−', '×', '÷']
let operation = '';
let firstNumber = '';
let secondNumber = '';
let result = 0;

for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    if (/\d/.test(button.textContent) === true) {
        button.addEventListener('click', () => {
            if (result === 'Error' || display.textContent === 'NaN') {
                result = '';
                display.textContent = '';
            }
            if (display.textContent.length < 12) {
                if (display.textContent === '0') display.textContent = '';
                display.textContent = display.textContent + button.textContent;
                if (operation) secondNumber += button.textContent;
            }
        });
    } else if (operations.includes(button.textContent)) {
        button.addEventListener('click', () => {
            if (button.textContent === '−' && firstNumber === '') {
                firstNumber = '-';
                display.textContent = firstNumber;
            } else if (firstNumber !== '' && operation && secondNumber === '') {
                secondNumber = '-';
                display.textContent = secondNumber;
            } else {
                operation = button.textContent;
                firstNumber = display.textContent;
                display.textContent = '';
            }
        });
    } else if (button.textContent === '.') {
        button.addEventListener('click', () => {
            if (display.textContent.length < 12 && display.textContent.includes('.') === false
                && display.textContent.length > 0) {
                display.textContent = display.textContent + '.';
            }
        });
    } else if (button.textContent === 'AC') {
        button.addEventListener('click', () => {
            display.textContent = '0';

            result = '';
            firstNumber = '';
            secondNumber = '';
            operation = '';
        });
    } else {
        button.addEventListener('click', () => {
            if (firstNumber && operation && secondNumber) {
                switch (operation) {
                    case '+':
                        result = Number(firstNumber) + Number(secondNumber);
                        break;
                    case '−':
                        result = Number(firstNumber) - Number(secondNumber);
                        break;
                    case '×':
                        console.log(firstNumber);
                        console.log(secondNumber);
                        result = Number(firstNumber) * Number(secondNumber);
                        break;
                    case '÷':
                        secondNumber = display.textContent;
                        if (Number(secondNumber) !== 0) result = Number(firstNumber) / Number(secondNumber);
                        else result = 'Error';
                        break;
                }

                if (String(result).length > 10) {
                    const exp_result = String(Number(result).toExponential());
                    result = Number(result).toExponential(8 -
                        exp_result.substring(exp_result.lastIndexOf('+') + 1).length);
                }

                display.textContent = String(result);

                firstNumber = result;
                secondNumber = '';
                operation = '';
            }
        });
    }
}