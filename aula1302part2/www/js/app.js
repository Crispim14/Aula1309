document.addEventListener('DOMContentLoaded', () => {
    const questionDiv = document.getElementById('question');
    const answerInput = document.getElementById('answer');
    const submitButton = document.getElementById('submit');
    
    let correctAnswer = 0;

    function generateQuestion() {
        const operators = ['+', '-', '*', '/'];
        const num1 = Math.floor(Math.random() * 10) + 1; 
        const num2 = Math.floor(Math.random() * 10) + 1; 
        const operator = operators[Math.floor(Math.random() * operators.length)];
        
        let question = `${num1} ${operator} ${num2}`;
        
        switch (operator) {
            case '+':
                correctAnswer = num1 + num2;
                break;
            case '-':
                correctAnswer = num1 - num2;
                break;
            case '*':
                correctAnswer = num1 * num2;
                break;
            case '/':
                correctAnswer = parseFloat((num1 / num2).toFixed(2));
                break;
        }

        questionDiv.textContent = question;
    }

    function checkAnswer() {
        const userAnswer = parseFloat(answerInput.value);
        if (userAnswer === correctAnswer) {
            navigator.vibrate(2000);
            alert('Correto!');
            generateQuestion();
            answerInput.value = '';
        } else {
            navigator.vibrate(1000);
            alert('Errado! Tente novamente.');
            answerInput.value = '';
        }
    }

    submitButton.addEventListener('click', checkAnswer);

    generateQuestion();
});
