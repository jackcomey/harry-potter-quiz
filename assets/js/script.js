import { questions } from "./questions.js" 
// Declare constants for DOM Elemenets
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreQuestionDiv = document.getElementById('score-live-question');
const scoreId = document.getElementById('scoreId');
const liveQuestionId = document.getElementById('liveQuestionId');


let shuffledQuestions, currentQuestionIndex, score, currentQuestionLive, scoreAdded;

//Initializing Button Clicks
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

//Function to Start the Quiz
function startGame() {
  scoreQuestionDiv.style.display = 'table';
  document.getElementById('finalScoreDiv').style.display = "none";
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  currentQuestionLive = 0;
  score = 0;
  scoreAdded = 0;
  scoreId.innerText = score+"/10";
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

//Function to view Next question
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
  currentQuestionLive++;

  liveQuestionId.innerText = (currentQuestionLive)+"/10";

  if(scoreAdded === 1){
    scoreAdded = 0;
  }
}


//Function to show Question
function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

//Function to reset the state of Quiz 
function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

//Checking the answer on the base of clicked button
function selectAnswer(e) {
  const selectedButton = e.target;
    if(selectedButton.dataset.correct == 'true' && scoreAdded === 0){
      scoreAdded = 1;
      score++;
      scoreId.innerText = score+"/10";
    }else{
      scoreAdded = 1;
    }
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct,);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    gameOver();
  }
}

//When quiz reached at the end of questions
function gameOver() {
  document.getElementById('finalScoreDiv').style.display = "block";
  document.getElementById('finalScore').innerText = "Your final score is "+score+" out of 10.";
  startButton.innerText = 'Restart';
  startButton.classList.remove('hide');
}

//Set the colors on the base of selected answers
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

//Function to clear the Answers background color
function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}
