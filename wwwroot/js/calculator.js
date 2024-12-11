document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById('calc-display');
    let currentInput = '';
    let operator = '';
    let previousInput = '';

    const updateDisplay = (value) => {
        display.value = value;
    };

    // აპლიკაციის ჩასმა
    display.addEventListener('input', (event) => {
        currentInput = event.target.value;
    });

    document.querySelectorAll('.calc-btn').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (value >= '0' && value <= '9' || value === '.') {
                currentInput += value;
                updateDisplay(currentInput);
            } else if (value === 'C') {
                currentInput = '';
                operator = '';
                previousInput = '';
                updateDisplay('0');
            } else if (value === '=') {
                if (currentInput && previousInput) {
                    currentInput = eval(previousInput + operator + currentInput).toString();
                    updateDisplay(currentInput);
                    operator = '';
                    previousInput = '';
                }
            } else {
                if (currentInput) {
                    if (previousInput && operator) {
                        previousInput = eval(previousInput + operator + currentInput).toString();
                    } else {
                        previousInput = currentInput;
                    }
                    operator = value;
                    currentInput = '';
                }
            }
        });
    });
});
