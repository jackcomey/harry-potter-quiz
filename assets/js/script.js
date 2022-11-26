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


//Questions List which used to display in the Quiz app
const questions = [
  {
    question: 'Which is the first book in the series?',
    answers: [
      { text: 'Prisoner of Azkaban', correct: false },
      { text: 'Chamber of Secrets', correct: false },
      { text: 'Philosophers Stone', correct: true },
      { text: 'Half Blood Price', correct: false }
    ]
  },
  {
    question: 'What is Harrys Mothers Name?',
    answers: [
      { text: 'Lily', correct: true },
      { text: 'Lucy', correct: false },
      { text: 'Laila', correct: false },
      { text: 'Lillian', correct: false }
    ]
  },
  {
    question: 'Who is the eldest Weasley brother?',
    answers: [
      { text: 'Percy', correct: false },
      { text: 'Bill', correct: true },
      { text: 'George', correct: false },
      { text: 'Charlie', correct: false }
    ]
  },
  {
    question: 'When is Harrys Birthday?',
    answers: [
      { text: 'October 31st', correct: false },
      { text: 'November 9th', correct: false },
      { text: 'July 31st', correct: true },
      { text: 'April 1st', correct: false }
    ]
  },
  {
    question: 'Who does Ireland play in the Quidditch World Cup?',
    answers: [
      { text: 'Finland', correct: false },
      { text: 'Kenya', correct: false },
      { text: 'Vietnam', correct: false },
      { text: 'Bulgaria', correct: true }
    ]
  },
  {
    question: 'What happens to Professor Lockhart at the end of the second book?',
    answers: [
      { text: 'He is killed by a basilisk', correct: false },
      { text: 'He joins forces with Voldemort', correct: false },
      { text: 'He loses his memory', correct: true },
      { text: 'He becomes headmaster', correct: false }
    ]
  },
  {
    question: 'Which subject does Hermione get an E in in her OWLS?',
    answers: [
      { text: 'Potions', correct: false },
      { text: 'Defence against the dark arts', correct: true },
      { text: 'Herbology', correct: false },
      { text: 'Ancient Ruins', correct: false }
    ]
  },
  {
    question: 'Who betrays Dumbledores Army?',
    answers: [
      { text: 'Marietta Edgecomb', correct: true },
      { text: 'Cho Chang', correct: false },
      { text: 'Michael Corner', correct: false },
      { text: 'Anthony Goldstein', correct: false }
    ]
  },
  {
    question: 'Who is Firenze?',
    answers: [
      { text: 'A Goblin', correct: false },
      { text: 'A Vampire', correct: false },
      { text: 'A House Elf', correct: false },
      { text: 'A Centaur', correct: true }
    ]
  },
  {
    question: 'Which pet is half kneazle?',
    answers: [
      { text: 'Hedwig', correct: false },
      { text: 'Trevor the toad', correct: false },
      { text: 'Crookshanks', correct: true },
      { text: 'Scabbers', correct: false }
    ]
  }
];