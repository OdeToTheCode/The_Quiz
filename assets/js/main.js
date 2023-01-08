const strtBtn = document.getElementById('start-btn');
const nxtBtn = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const questElm = document.getElementById('question');
const answerBtns = document.getElementById('answer-buttons');
const timer = document.getElementById('timer');
const score = document.getElementById("score");
const failScreen = document.getElementById("fail-screen");
const dispScores = document.getElementById("dispScores");
const userScore = document.getElementById("userScore");
let plyrScore;
let timerInt = 5;
let currScore = 0;
let shuffQuestions 
let currentQuestions
let l = 61;
var timerstart;


const questions = [
  {
    question: 'What color is the sky?',
    answers: [
      {text: 'blue', correct: true},
      {text: 'black', correct: false},
      {text: 'green', correct:false},
      {text: 'pastel', correct:false},
    ]
  },
  {
    question: 'Was this assignment difficult?',
    answers: [
      {text: 'Just a little', correct: false},
      {text: 'No', correct: false},
      {text: 'Yes', correct:true},
      {text: 'Only for me', correct:false},
    ]
  },
  {
    question: 'Do we live in a multi dimentinal reality?',
    answers: [
      {text: 'I do not have time for this question', correct: false},
      {text: 'The only thing real is this course', correct: false},
      {text: 'Yes', correct:true},
      {text: '10^100', correct:false},
    ]
  },
  {
    question: "How many grains of sand are on the planet earth right now?",
    answers: [
      {text: '7.5 sextillion grains of sand', correct: true},
      {text: 'Few than there are stars in the known universe', correct: false},
      {text: 'The color purple', correct:false},
      {text: '8.9 googol grains of sand', correct:false},
    ]
  },
]


strtBtn.addEventListener('click', quizStart);
nxtBtn.addEventListener('click',() =>{
  currentQuestions++;
  nextQuestion();
} )


function quizStart(){
  strtBtn.classList.add('hide');
  shuffQuestions = questions.sort(() => Math.random() - .5);
  currentQuestions = 0;
  questionContainer.classList.remove('hide');
  timer.classList.remove('hide');
  score.classList.remove('hide');
  timerAll();
  nextQuestion();
}

function nextQuestion(){
  clearField();
  QuestionDisplay(shuffQuestions[currentQuestions]);
}

function QuestionDisplay(question){
  questElm.innerText = question.question;

  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if(answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener('click', pickAnsw);
    answerBtns.appendChild(button);

  })
}


function clearField(){
  
  clearQField(document.body);
  
  clearQField(document.body);
  
  nxtBtn.classList.add('hide');
  
  while(answerBtns.firstChild){
    answerBtns.removeChild(answerBtns.firstChild);
  }
}



function pickAnsw(e) {
  
  const selectedButton = e.target
  
  const correct = selectedButton.dataset.correct
  
  setQType(document.body, correct);
  
  if (selectedButton.dataset.correct){
    currScore += 1
    score.textContent = ("SCORE: "+ currScore);
    l += 10;
  } else{ 
    l-= 5;
    timer.classList.add('backgorund.wrong')

  }
  
  Array.from(answerBtns.children).forEach(button => {
    setQType(button, button.dataset.correct);
  })
  
  if(shuffQuestions.length > currentQuestions + 1){
  nxtBtn.classList.remove('hide');
  } else {
    endScreen();
  }
}


function setQType(element, correct) {
  clearQField(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearQField(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

function endScreen(){
  clearInterval(timerstart);
  timer.textContent = "Time is up!!";
  questionContainer.classList.add("hide");
  strtBtn.classList.remove("hide")
}


function timerAll(){
  timerstart = setInterval(() => {
      l--;
      timer.textContent = ("TIME: "+ l);
    
      if (l < 1){
        clearInterval(timerstart);
        timer.textContent = "Time is up!!";
        endScreen();
      }
  }, 1000);
}

function writeTimer(){
    timer.textContent --;
    timerInt --;
    console.log(timer.textContent);
}


function afterTimer(){
  timer.textContent = "Time is up!!";
}

