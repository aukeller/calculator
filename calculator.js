// Functions for operators

function add(num1, num2) {
    return parseFloat(num1) + parseFloat(num2);
}

function subtract(num1, num2) {
    return parseFloat(num1) - parseFloat(num2);
}

function multiply(num1, num2) {
    return parseFloat(num1) * parseFloat(num2);
}

function divide(num1, num2) {
    if (isFinite(num1 / num2)) {
        return parseFloat(num1) / parseFloat(num2);
    } else {
        return 'Error'
    }
}

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        break;
        case '-':
            return subtract(num1, num2);
        break;
        case '/':
            return divide(num1, num2);
        break;
        case 'X':
            return multiply(num1, num2);
        break;
        
    }
}
//



const calculatorDisplay = document.querySelector('.display');
const decimalBtn = document.querySelector('.decimal');

let displayValue = '';

let firstOperand = '';
let chosenOperator = '';

let secondOperandReady = false;

let evaluateReady;






function storeFirstInput(operator) {
    if(firstOperand % 1 !== 0) {
        chosenOperator = operator;
        displayValue = 0;
        secondOperandReady = true;

    } else {
        firstOperand += displayValue;
        chosenOperator = operator;
        displayValue = '';
        secondOperandReady = true;
    }
}

function solve() {   
    if ((displayValue !== '') && (firstOperand !== '') && (chosenOperator !== '')) {
        if (firstOperand % 1 !== 0) {
            displayValue = parseInt(displayValue);
            calculatorDisplay.value = operate(chosenOperator, firstOperand, displayValue);
            firstOperand = calculatorDisplay.value;
            displayValue = '';
            chosenOperator = '';

        } else {
            calculatorDisplay.value = operate(chosenOperator, firstOperand, displayValue);
            firstOperand = calculatorDisplay.value;
            displayValue = '';
            chosenOperator = '';
        }
        
    } else {
        return; 
    }  
}

function clearData() {
     displayValue = firstOperand = chosenOperator = '';
     calculatorDisplay.value = '';
     decimalBtn.disabled = false;
     secondOperandReady = false;
     
}

function populateDisplayNumbers(val) {
    if (secondOperandReady) {
        calculatorDisplay.value = val;
        displayValue = val;
        secondOperandReady = false;
    } else {
            calculatorDisplay.value += val;
            displayValue += val;
        }
    checkDecimal();
}   

function checkDecimal() {
    if (calculatorDisplay.value.includes('.') || firstOperand.includes('.')) {
        decimalBtn.disabled = true;
    } 
    else {
        decimalBtn.disabled = false;
    }
}


function switchSigns() {
    if (firstOperand !== '' && displayValue == '') {
        calculatorDisplay.value = calculatorDisplay.value - (calculatorDisplay.value * 2);
        firstOperand = firstOperand - (firstOperand * 2);
    } else {
        calculatorDisplay.value = calculatorDisplay.value - (calculatorDisplay.value * 2);
        displayValue = displayValue - (displayValue * 2);
    }
}


function erase() {
    calculatorDisplay.value = calculatorDisplay.value.substr(0, calculatorDisplay.value.length - 1);
    displayValue = displayValue.substr(0, displayValue.length - 1);
}


// Keyboard events

document.addEventListener('keydown', function(event){
    switch (event.keyCode) {
        case 8:
            erase();
        break; 
        case 13:
            solve();
        break;
        case 67:
            clearData();
        break;
        case 49:
            populateDisplayNumbers('1');
        break;
        case 50:
            populateDisplayNumbers('2');
        break;
        case 51:
            populateDisplayNumbers('3');
        break;
        case 52:
            populateDisplayNumbers('4');
        break;
        case 53:
            if(event.shiftKey) {
             toPercent();
            } else {
                populateDisplayNumbers('5');
            }
        break;
        case 54:
            populateDisplayNumbers('6');
        break;
        case 55:
            populateDisplayNumbers('7');
        break;
        case 56:
            if (event.shiftKey) {
                storeFirstInput('X')
            } else {
                populateDisplayNumbers('8');
            }  
        break;
        case 57:
            populateDisplayNumbers('9');
        break;
        case 48:
            populateDisplayNumbers('0');
        break;
        case 191:
            storeFirstInput('/');
        break;
        case 61:
           if(event.shiftKey) {
            storeFirstInput('+');
           } else {
               solve();
           }
        case 173: 
         if(!event.shiftKey) {
            storeFirstInput('-');
        } else {
            storeFirstInput('+');
        }
        break;
        case 190:
            if (calculatorDisplay.value.includes('.') || firstOperand.includes('.')) {
                decimalBtn.disabled = true;
            } 
            else {
                populateDisplayNumbers('.');
            }    
        break;
    }
});