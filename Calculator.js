class UniqueCalculator {
  constructor(prevOperandTextElement, currOperandTextElement) {
    this.prevOperandTextElement = prevOperandTextElement;
    this.currOperandTextElement = currOperandTextElement;
    this.resetCalculator();
  }

  resetCalculator() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.selectedOperation = undefined;
  }

  removeLastDigit() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  addDigitToCurrent(digit) {
    if (digit === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + digit.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.performCalculation();
    }
    this.selectedOperation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  performCalculation() {
    let result;
    const prevNum = parseFloat(this.previousOperand);
    const currNum = parseFloat(this.currentOperand);
    if (isNaN(prevNum) || isNaN(currNum)) return;
    switch (this.selectedOperation) {
      case '+':
        result = prevNum + currNum;
        break;
      case '-':
        result = prevNum - currNum;
        break;
      case '*':
        result = prevNum * currNum;
        break;
      case '÷':
        result = prevNum / currNum;
        break;
      default:
        return;
    }
    this.currentOperand = result;
    this.selectedOperation = undefined;
    this.previousOperand = '';
  }

  getFormattedNumber(number) {
    const stringNumber = number.toString();
    const integerPart = parseFloat(stringNumber.split('.')[0]);
    const decimalPart = stringNumber.split('.')[1];
    let formattedIntegerPart;
    if (isNaN(integerPart)) {
      formattedIntegerPart = '';
    } else {
      formattedIntegerPart = integerPart.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    if (decimalPart != null) {
      return `${formattedIntegerPart}.${decimalPart}`;
    } else {
      return formattedIntegerPart;
    }
  }

  updateDisplay() {
    this.currOperandTextElement.innerText = this.getFormattedNumber(this.currentOperand);
    if (this.selectedOperation != null) {
      this.prevOperandTextElement.innerText =
        `${this.getFormattedNumber(this.previousOperand)} ${this.selectedOperation}`;
    } else {
      this.prevOperandTextElement.innerText = '';
    }
  }
}

const numButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const delButton = document.querySelector('[data-delete]');
const clearAllButton = document.querySelector('[data-all-clear]');
const prevOperandTextElement = document.querySelector('[data-previous-operand]');
const currOperandTextElement = document.querySelector('[data-current-operand]');

const uniqueCalculator = new UniqueCalculator(prevOperandTextElement, currOperandTextElement);

numButtons.forEach(button => {
  button.addEventListener('click', () => {
    uniqueCalculator.addDigitToCurrent(button.innerText);
    uniqueCalculator.updateDisplay();
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    uniqueCalculator.chooseOperation(button.innerText);
    uniqueCalculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', () => {
  uniqueCalculator.performCalculation();
  uniqueCalculator.updateDisplay();
});

clearAllButton.addEventListener('click', () => {
  uniqueCalculator.resetCalculator();
  uniqueCalculator.updateDisplay();
});

delButton.addEventListener('click', () => {
  uniqueCalculator.removeLastDigit();
  uniqueCalculator.updateDisplay();
});
