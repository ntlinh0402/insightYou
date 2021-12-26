
const questions = [{
    "question": "In the last month, how often have you been upset because of something that happened unexpectedly?",
    "answer1": "Never",
    "answer1Total": "0",
    "answer2": "Almost never",
    "answer2Total": "1",
    "answer3": "Sometimes",
    "answer3Total": "2",
    "answer4": "Fairly often",
    "answer4Total": "3",
    "answer5": "Very often",
    "answer5Total": "4"
},
{
    "question": " In the last month, how often have you felt that you were unable to control the important things in your life?",
    "answer1": "Never",
    "answer1Total": "0",
    "answer2": "Almost never",
    "answer2Total": "1",
    "answer3": "Sometimes",
    "answer3Total": "2",
    "answer4": "Fairly often",
    "answer4Total": "3",
    "answer5": "Very often",
    "answer5Total": "4"
},
{
    
    "question": "In the last month, how often have you felt nervous and stressed?",
    "answer1": "Never",
    "answer1Total": "0",
    "answer2": "Almost never",
    "answer2Total": "1",
    "answer3": "Sometimes",
    "answer3Total": "2",
    "answer4": "Fairly often",
    "answer4Total": "3",
    "answer5": "Very often",
    "answer5Total": "4"
},
{
    
    "question": "In the last month, how often have you felt confident about your ability to handle your personal problems?",   
    "answer1": "Never",
    "answer1Total": "4",
    "answer2": "Almost never",
    "answer2Total": "3",
    "answer3": "Sometimes",
    "answer3Total": "2",
    "answer4": "Fairly often",
    "answer4Total": "1",
    "answer5": "Very often",
    "answer5Total": "0"
},
{
    "question": "In the last month, how often have you felt that things were going your way?",   
    "answer1": "Never",
    "answer1Total": "4",
    "answer2": "Almost never",
    "answer2Total": "3",
    "answer3": "Sometimes",
    "answer3Total": "2",
    "answer4": "Fairly often",
    "answer4Total": "1",
    "answer5": "Very often",
    "answer5Total": "0"
},
{
    "question": "In the last month, how often have you found that you could not cope with all the things that you had to do?",
    "answer1": "Never",
    "answer1Total": "0",
    "answer2": "Almost never",
    "answer2Total": "1",
    "answer3": "Sometimes",
    "answer3Total": "2",
    "answer4": "Fairly often",
    "answer4Total": "3",
    "answer5": "Very often",
    "answer5Total": "4"
},
{
    "question": " In the last month, how often have you been able to control irritations inyour life?",     
    "answer1": "Never",
    "answer1Total": "4",
    "answer2": "Almost never",
    "answer2Total": "3",
    "answer3": "Sometimes",
    "answer3Total": "2",
    "answer4": "Fairly often",
    "answer4Total": "1",
    "answer5": "Very often",
    "answer5Total": "0"
},
{
    "question": "In the last month, how often have you felt that you were on top of things?",   
    "answer1": "Never",
    "answer1Total": "4",
    "answer2": "Almost never",
    "answer2Total": "3",
    "answer3": "Sometimes",
    "answer3Total": "2",
    "answer4": "Fairly often",
    "answer4Total": "1",
    "answer5": "Very often",
    "answer5Total": "0"
},
{
    "question": " In the last month, how often have you been angered because of things that happened that were outside of your control?",   
    "answer1": "Never",
    "answer1Total": "0",
    "answer2": "Almost never",
    "answer2Total": "1",
    "answer3": "Sometimes",
    "answer3Total": "2",
    "answer4": "Fairly often",
    "answer4Total": "3",
    "answer5": "Very often",
    "answer5Total": "4"
},
{
    "question": "  In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?",   
    "answer1": "Never",
    "answer1Total": "0",
    "answer2": "Almost never",
    "answer2Total": "1",
    "answer3": "Sometimes",
    "answer3Total": "2",
    "answer4": "Fairly often",
    "answer4Total": "3",
    "answer5": "Very often",
    "answer5Total": "4"
}
]


let currentQuestion = 0;
let score = [];
let selectedAnswersData = [];
const totalQuestions = questions.length;

const container = document.querySelector('.quiz-container');
const questionEl = document.querySelector('.question');
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const option4 = document.querySelector('.option4');
const option5 = document.querySelector('.option5');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const restartButton = document.querySelector('.restart');
const result = document.querySelector('.result');

//Function to generate question 
function generateQuestions(index) {
//Select each question by passing it a particular index
const question = questions[index];
const option1Total = questions[index].answer1Total;
const option2Total = questions[index].answer2Total;
const option3Total = questions[index].answer3Total;
const option4Total = questions[index].answer4Total;
const option5Total = questions[index].answer5Total;
//Populate html elements 
questionEl.innerHTML = `${index + 1}. ${question.question}`
option1.setAttribute('data-total', `${option1Total}`);
option2.setAttribute('data-total', `${option2Total}`);
option3.setAttribute('data-total', `${option3Total}`);
option4.setAttribute('data-total', `${option4Total}`);
option5.setAttribute('data-total', `${option5Total}`);
option1.innerHTML = `${question.answer1}`
option2.innerHTML = `${question.answer2}`
option3.innerHTML = `${question.answer3}`
option4.innerHTML = `${question.answer4}`
option5.innerHTML = `${question.answer5}`
}


function loadNextQuestion() {
const selectedOption = document.querySelector('input[type="radio"]:checked');
//Check if there is a radio input checked
if (!selectedOption) {
    alert('Please select your answer!');
    return;
}
//Get value of selected radio
const answerScore = Number(selectedOption.nextElementSibling.getAttribute('data-total'));

////Add the answer score to the score array
score.push(answerScore);

selectedAnswersData.push()


const totalScore = score.reduce((total, currentNum) => total + currentNum);

//Finally we incement the current question number ( to be used as the index for each array)
currentQuestion++;

//once finished clear checked
selectedOption.checked = false;
//If quiz is on the final question
if (currentQuestion == totalQuestions - 1) {
    nextButton.textContent = 'Finish';
}
//If the quiz is finished then we hide the questions container and show the results 
if (currentQuestion == totalQuestions) {
    container.style.display = 'none';
    result.innerHTML =
        `<h1 class="final-score">Your score: ${totalScore}</h1>
     <div class="summary">
        <h1>Summary</h1>
        <p>Possible - Personality Traits, see below for a summary based on your results:</p>
        <p>   1. Scores ranging from 0-13 would be considered low stress.</p>
        <p>   2. Scores ranging from 14-26 would be considered moderate stress.</p>
        <p>   3. Scores ranging from 27-40 would be considered high perceived stress.</p>
        
        <p>Individual scores on the PSS can range from 0 to 40 with higher scores indicating higher perceived
        stress.
        The Perceived Stress Scale is interesting and important because your perception of what is happening
        in your life is most important. Consider the idea that two individuals could have the exact same events
        and experiences in their lives for the past month. Depending on their perception, total score could put
        one of those individuals in the low stress category and the total score could put the second person in
        the high stress category.</p>
    </div>
    <button class="restart">Restart Quiz</button>
     `;
    return;
}
generateQuestions(currentQuestion);
}

//Function to load previous question
function loadPreviousQuestion() {
//Decrement quentions index
currentQuestion--;
//remove last array value;
score.pop();
//Generate the question
generateQuestions(currentQuestion);
}

//Fuction to reset and restart the quiz;
function restartQuiz(e) {
if (e.target.matches('button')) {
    //reset array index and score
    currentQuestion = 0;
    score = [];
    //Reload quiz to the start
    location.reload();
}

}


generateQuestions(currentQuestion);
nextButton.addEventListener('click', loadNextQuestion);
previousButton.addEventListener('click', loadPreviousQuestion);
result.addEventListener('click', restartQuiz);