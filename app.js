const displayCurrent = document.getElementById("Current-operand");
const displayPrevious = document.getElementById("Previous-Operand");

let currentInput = "0";
let previousInput = "";
let operator = null;

function updateDisplay(){
    displayCurrent.innerText = currentInput;
    if(operator!=null){
        displayPrevious.innerText = `${previousInput} ${operator}`;
    }else{
        displayPrevious.innerText = '';
    }
    displayCurrent.scrollLeft = displayCurrent.scrollWidth; 
}

function appendNumber(number){
    if(number === "." && currentInput.includes("."))return;

    if(currentInput === '0' && number != "."){
        currentInput = number;
    }else{
        if(currentInput.length >= 15)return;
        currentInput += number;
    }
    updateDisplay()
}

function appendOperator(op){

    // ✅ If user is just changing operator
    if (currentInput === '' && previousInput !== '') {
        operator = op;
        updateDisplay();
        return;
    }

    
    if(currentInput === '')return;

    
    if(previousInput !== "" ){
        calculate()
    }

    previousInput = currentInput;
    operator = op;
    currentInput = '';
    updateDisplay();
}

function calculate(){
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if(isNaN(prev) || isNaN(current)) return;

    switch(operator){
        case '+': computation = prev + current; break;
        case '-': computation = prev - current; break;
        case '*': computation = prev * current; break;
        case '/':
            if(current === 0){
                alert("cannot divide by zero");
                clearDisplay();
                return;
            }

            computation = prev / current;
            break;
        default:return;
    }

    currentInput = computation.toString();
    operator = null;
    previousInput = '';
    updateDisplay();
}

function clearDisplay(){
    currentInput = "0";
    previousInput = '';
    operator= null;
    updateDisplay()
}

function deleteNumber(){
    currentInput = currentInput.toString().slice(0,-1);
    if (currentInput === '') currentInput = '0';
    updateDisplay();
}
