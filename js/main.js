const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const preresultText = document.querySelector('[data-pre-result]');
const resultText = document.querySelector('[data-result]');


class Calculator {
    constructor(preresultText, resultText) {
      this.preresultText = preresultText;
      this.resultText = resultText;
      this.clear();
    }
  
    clear() {
      this.result = '';
      this.preresult = '';
      this.operation = undefined;
    }
  
    delete() {
      this.result = this.result.toString().slice(0, -1);
    }
  
    appendNumber(number) {
      if (number === '.' && this.result.includes('.')) return;
      this.result = this.result.toString() + number.toString();
    }
  
    chooseOperation(operation) {
      if (this.result === '') return;
      if (this.preresult !== '') {
        this.calc();
      }
      this.operation = operation;
      this.preresult = this.result;
      this.result = '';
    }
  
    calc() {
      let calculation;
      const prev = parseFloat(this.preresult);
      const current = parseFloat(this.result);
      if (isNaN(prev) || isNaN(current)) return;
      switch (this.operation) {
        case '+':
          calculation = prev + current;
          break;
        case '-':
          calculation = prev - current;
          break;
        case '*':
          calculation = prev * current;
          break;
        case '÷':
          calculation = prev / current;
          break;
        default:
          return;
      }
      this.result = calculation;
      this.operation = undefined;
      this.preresult = '';
    }
  
    getDisplayNumber(number) {
      const stringNumber = number.toString();
      const integerDigits = parseFloat(stringNumber.split('.')[0]);
      const decimalDigits = stringNumber.split('.')[1];
      let integerDisplay;
      if (isNaN(integerDigits)) {
        integerDisplay = '';
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
      } else {
        return integerDisplay;
      }
    }
  
    updateDisplay() {
      this.resultText.innerText =
        this.getDisplayNumber(this.result);
      if (this.operation != null) {
        this.preresultText.innerText =
          `${this.getDisplayNumber(this.preresult)} ${this.operation}`;
      } else {
        this.preresultText.innerText = '';
      }
    }
  }
  
  

  
  const calculator = new Calculator(preresultText, resultText);
  
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText);
      calculator.updateDisplay();
    })
  });
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText);
      calculator.updateDisplay();
    })
  });
  
  equalsButton.addEventListener('click', button => {
    calculator.calc();
    calculator.updateDisplay();
  });
  
  clearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
  });
  
  deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
  });