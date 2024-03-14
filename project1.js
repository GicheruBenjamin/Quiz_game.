
// Select items 
const body = document.body;
const pr1 = body.querySelector('.pr1');
const qbtn = pr1.querySelector('#qbtn');
const score = pr1.querySelector('#score');
let marks = 0;
let quizShown = false;

// Ensuring the pop over appears 
qbtn.addEventListener('click', () => {
    if (!quizShown) {
        // Show the pop over when the user clicks qbtn
        const quiz_popover = document.createElement('div');
        quiz_popover.classList.add('quiz_popover');
        const quiz = document.createElement('div');
        quiz.classList.add('quiz');
        quiz_popover.appendChild(quiz);
        const choice1 = document.createElement('button');
        const choice2 = document.createElement('button');
        quiz_popover.appendChild(choice1);
        quiz_popover.appendChild(choice2);

        // Logic of when one quiz is answered the question in quiz div changes.
        const updateQuiz = () => {
            quiz.innerHTML = ''; // Clear previous question
            const keys = Object.keys(questions);
            const nextQuizKey = keys[keys.indexOf(currentQuizKey) + 1];
            if (nextQuizKey) {
                currentQuizKey = nextQuizKey;
                const currentQuestion = questions[currentQuizKey];
                const qElement = document.createElement('p');
                qElement.textContent = currentQuestion.q;
                quiz.appendChild(qElement);
                choice1.textContent = currentQuestion.ch1;
                choice2.textContent = currentQuestion.ch2;
            } else {
                // If there are no more questions, remove the popover
                quiz_popover.remove();
            }
        };

        // To keep track of the current quiz being displayed
        let currentQuizKey = 'quiz1';
        
        // The questions.
        const questions = {
            'quiz1': {
                'q': 'What is the name of my favourite pet?',
                'ch1': 'dog',
                'ch2': 'cat'
            },
            'quiz2': {
                'q': 'What is my dream car?',
                'ch1': 'Nissan Juke',
                'ch2': 'Dodge challenger'
            }
        };

        // Administering the quiz with questions 
        const handleChoiceClick = (choice) => {
            const currentQuestion = questions[currentQuizKey];
            if (choice === currentQuestion.ch1) {
                if (currentQuizKey === 'quiz1' && choice === 'dog' || currentQuizKey === 'quiz2' && choice === 'Nissan Juke') {
                    marks++;
                }
            } else if (choice === currentQuestion.ch2) {
                if (currentQuizKey === 'quiz1' && choice === 'cat' || currentQuizKey === 'quiz2' && choice === 'Dodge challenger') {
                    marks++;
                }
            }
            updateQuiz();
            score.textContent = marks;
        };

        choice1.addEventListener('click', () => handleChoiceClick(choice1.textContent));
        choice2.addEventListener('click', () => handleChoiceClick(choice2.textContent));
        
        // Initially show the first quiz
        updateQuiz();

        body.appendChild(quiz_popover);
        quizShown = true; // Set to true so the popover won't appear again
    }
});
