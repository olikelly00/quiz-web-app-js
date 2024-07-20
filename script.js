let apiData;
let questionIndex = 0
// const submitbtn = document.querySelector(".base-button");
const quizContainer = document.querySelector(".quizContainer");

/* This function returns quiz questions and answers from a free API */
function fetchQuestions() {
    fetch('https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple')
        .then(response => response.json())
        .then(data => {
            if (data['results'] && data['results'].length) {
                apiData = data['results'];
                renderQuestions()
            }
        })
        .catch(error => console.error('Error:', error));
}


/* This function loads the quiz question and four answer-options into the DOM */
function renderQuestions() {
    const questionDisplay = document.querySelector(".questionDisplay");
    questionDisplay.innerHTML = apiData[questionIndex].question;

    const correctAnswer = `<label><input name="answer" type="radio" class="radioOption" value="${apiData[questionIndex]["correct_answer"]}" />${apiData[0]["correct_answer"]}</label>`
    const IncorrectAnswer1 = `<label><input name="answer" type="radio" class="radioOption" value="${apiData[questionIndex]["incorrect_answers"][0]}" />${apiData[questionIndex]["incorrect_answers"][0]}</label>`
    const IncorrectAnswer2 = `<label><input name="answer" type="radio" class="radioOption" value="${apiData[questionIndex]["incorrect_answers"][1]}" />${apiData[questionIndex]["incorrect_answers"][1]}</label>`
    const IncorrectAnswer3 = `<label><input name="answer" type="radio" class="radioOption" value="${apiData[questionIndex]["incorrect_answers"][2]}" />${apiData[questionIndex]["incorrect_answers"][2]}</label>`
    const answerArray = [correctAnswer, IncorrectAnswer1, IncorrectAnswer2, IncorrectAnswer3]
    
    const shuffledArray = randomiseOptions(answerArray) 
    // console.log(shuffledArray)
    // quizContainer.innerHTML = ""
    // shuffledArray.forEach(answer => {
    //     quizContainer.innerHTML += answer;
    // });
}


/* This function returns the correct-answer or incorrect-answer based on the user's click */

// submitbtn.addEventListener("click", function (e) {
//     e.preventDefault()
//     const selectedValue = document.querySelector('input[name="answer"]:checked').value;
//     const correctAnswer = apiData[0]["correct_answer"]

//     if (selectedValue === correctAnswer) {
//         showCorrectAnswerScreen()
//     } else {
//         showIncorrectAnswerScreen()
//     }
// })



/* This function returns an array of randomised answer-options - it guarantees the correct answer will not be in a predictable place each time */

// function randomiseOptions(arr) {
//     const shuffledArray = [];
//     while (arr.length > 0) {
//         const randomIndex = getRandomInt(arr.length);
//         shuffledArray.push(arr.splice(randomIndex, 1)[0]);
//     }
// }
function randomiseOptions(arr) {
    const shuffledArray = [];
    while (arr.length > 0) {
        const randomIndex = getRandomInt(arr.length);
        shuffledArray.push(arr.splice(randomIndex, 1)[0]);
    }

    quizContainer.innerHTML = ""
    shuffledArray.forEach(answer => {
        quizContainer.innerHTML += answer;
    });
}


/* This helper function generates a random number for the randomiseOptions function */

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function resetQuizScreen() {
    document.querySelector(".question-screen").classList.remove("hidden");
    document.querySelector(".correct-answer").classList.add("hidden");
    document.querySelector(".incorrect-answer").classList.add("hidden");
}

/* This function handles the hiding of the question screen and displaying the correct answer screen */

function showCorrectAnswerScreen() {
    resetQuizScreen()
    document.querySelector(".question-screen").classList.add("hidden");
    document.querySelector(".correct-answer").classList.remove("hidden");

}

/* This function handles the hiding of the question screen and displaying the incorrect answer screen */

function showIncorrectAnswerScreen() {
    resetQuizScreen()
    document.querySelector(".question-screen").classList.add("hidden");
    document.querySelector(".incorrect-answer").classList.remove("hidden")
    document.querySelector(".question-display").innerHTML = `Question: ${apiData[questionIndex]["question"]}`
    document.querySelector(".answer-display").innerHTML = `Correct Answer:${apiData[questionIndex]["correct_answer"]}`
}


/* This function returns the correct-answer or incorrect-answer based on the user's click */

function mountSubmitButton() {
    const submitbtn = document.querySelector(".base-button");
    submitbtn.addEventListener("click", function (e) {
        e.preventDefault()
        const selectedValue = document.querySelector('input[name="answer"]:checked').value;
        const correctAnswer = apiData[questionIndex]["correct_answer"];

        if (selectedValue === correctAnswer) {
            showCorrectAnswerScreen()
        } else {
            showIncorrectAnswerScreen()
        }
    })
}

/* This function returns the question screen for the next question when user clicks the button */

function nextQuestionButton(e) {
    const nextButton = document.querySelector(".next-question-btn");
    nextButton.addEventListener("click", e => {
        e.preventDefault()
        resetQuizScreen()
        questionIndex++
        renderQuestions()
    })
}


fetchQuestions()
mountSubmitButton()
nextQuestionButton()