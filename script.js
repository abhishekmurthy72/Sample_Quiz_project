const quizData = [
    {
        "id": 1,
        "question": "What term refers to the practice of buying and selling the same stock multiple times in a single trading day?",
        "options": [
            { "key": "a", "text": "Swing trading" },
            { "key": "b", "text": "Long-term investing" },
            { "key": "c", "text": "Day trading" },
            { "key": "d", "text": "Value investing" }
        ],
        "answerKey": "c"
    },
    {
        "id": 2,
        "question": "Which financial statement provides information about a company’s revenues and expenses over a specific period?",
        "options": [
            { "key": "a", "text": "Balance sheet" },
            { "key": "b", "text": "Income statement" },
            { "key": "c", "text": "Cash flow statement" },
            { "key": "d", "text": "Statement of retained earnings" }
        ],
        "answerKey": "b"
    },
    {
        "id": 3,
        "question": "Which order type allows you to buy or sell a stock immediately at the best available price?",
        "options": [
            { "key": "a", "text": "Limit order" },
            { "key": "b", "text": "Market order" },
            { "key": "c", "text": "Stop order" },
            { "key": "d", "text": "Day order" }
        ],
        "answerKey": "b"
    },
    {
        "id": 4,
        "question": "What does the term “bull market” signify in the stock market?",
        "options": [
            { "key": "a", "text": "A market with declining prices" },
            { "key": "b", "text": "A market with increasing prices" },
            { "key": "c", "text": "A market with no significant price changes" },
            { "key": "d", "text": "A market with high volatility" }
        ],
        "answerKey": "b"
    },
    {
        "id": 5,
        "question": "Which term refers to the practice of borrowing shares from a broker to sell them with the expectation of buying them back at a lower price in the future?",
        "options": [
            { "key": "a", "text": "Short selling" },
            { "key": "b", "text": "Long position" },
            { "key": "c", "text": "Margin trading" },
            { "key": "d", "text": "Hedging" }
        ],
        "answerKey": "a"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const quizForm = document.getElementById('quiz-form');
    const questionsContainer = document.getElementById('questions-container');
    const resultContainer = document.getElementById('result-container');
    const scoreElement = document.getElementById('score');
    const detailedResults = document.getElementById('detailed-results');
    const restartBtn = document.getElementById('restart-btn');
    const exitBtn = document.getElementById('exit-btn');

    function loadQuestions() {
        quizData.forEach((question) => {
            const questionElement = document.createElement('div');
            questionElement.classList.add('question');

            const questionTitle = document.createElement('h3');
            questionTitle.textContent = question.question;
            questionElement.appendChild(questionTitle);

            const optionsList = document.createElement('ul');
            optionsList.classList.add('options');

            question.options.forEach((option) => {
                const optionItem = document.createElement('li');
                const optionLabel = document.createElement('label');
                const optionInput = document.createElement('input');
                optionInput.type = 'radio';
                optionInput.name = `question-${question.id}`;
                optionInput.value = option.key;
                optionLabel.appendChild(optionInput);
                optionLabel.appendChild(document.createTextNode(option.text));
                optionItem.appendChild(optionLabel);
                optionsList.appendChild(optionItem);
            });

            questionElement.appendChild(optionsList);
            questionsContainer.appendChild(questionElement);
        });
    }

    function calculateScore() {
        let score = 0;
        let detailedResultHtml = '';

        quizData.forEach((question) => {
            const selectedOption = document.querySelector(`input[name="question-${question.id}"]:checked`);
            if (selectedOption) {
                if (selectedOption.value === question.answerKey) {
                    score++;
                    detailedResultHtml += `<p>Question ${question.id}: Correct</p>`;
                } else {
                    detailedResultHtml += `<p>Question ${question.id}: Incorrect (Correct Answer: ${question.options.find(option => option.key === question.answerKey).text})</p>`;
                }
            }
        });

        scoreElement.textContent = `You scored ${score} out of ${quizData.length}`;
        detailedResults.innerHTML = detailedResultHtml;
    }

    function handleSubmit(event) {
        event.preventDefault();
        const allQuestionsAnswered = quizData.every((question) => {
            return document.querySelector(`input[name="question-${question.id}"]:checked`);
        });

        if (allQuestionsAnswered) {
            calculateScore();
            quizForm.style.display = 'none';
            resultContainer.style.display = 'block';
        } else {
            alert('Please answer all questions before submitting the quiz.');
        }
    }

    function handleRestart() {
        resultContainer.style.display = 'none';
        quizForm.style.display = 'block';
        quizForm.reset();
        detailedResults.innerHTML = '';
    }

    function handleExit() {

        window.close();
    }

    quizForm.addEventListener('submit', handleSubmit);
    restartBtn.addEventListener('click', handleRestart);
    exitBtn.addEventListener('click', handleExit);

    loadQuestions();
});
