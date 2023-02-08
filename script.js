let allQuestions = [
    {
        "question": "Welcher Berg ist der höchste Berg der Welt?",
        "answer_1": "Mount Everest",
        "answer_2": "K2",
        "answer_3": "Zugspitze",
        "answer_4": "Brocken",
        "rightAnswer": "1"
    },
    {
        "question": "Wie tief ist der tiefste Punkt der Erde?",
        "answer_1": "2.000 Meter",
        "answer_2": "11.000 Meter",
        "answer_3": "500 Meter",
        "answer_4": "20.000 Meter",
        "rightAnswer": "2"
    },
    {
        "question": "Aus wie vielen Kalksteinblöcken besteht die große Pyramide von Gizeh?",
        "answer_1": "1900",
        "answer_2": "16.000",
        "answer_3": "780.000",
        "answer_4": "2,3 Millionen",
        "rightAnswer": "4"
    },
    {
        "question": "Wie viel Prozent der weltweiten Währung ist digital?",
        "answer_1": "86%",
        "answer_2": "92%",
        "answer_3": "34%",
        "answer_4": "98%",
        "rightAnswer": "2"
    },
    {
        "question": "Wie viele Seiten umfasst die gesamte Harry-Potter-Reihe?",
        "answer_1": "4.192",
        "answer_2": "3.126",
        "answer_3": "5.978",
        "answer_4": "2798",
        "rightAnswer": "1"
    },
    {
        "question": "Wofür stehen die olympischen Ringe?",
        "answer_1": "Für 5 Sportarten",
        "answer_2": "Für 5 Sponsoren",
        "answer_3": "Für die 5 Kontinente",
        "answer_4": "Für 5 Tage",
        "rightAnswer": "3"
    },
    {
        "question": "Aus wie vielen Einzelknochen besteht eine menschliche Hand?",
        "answer_1": "124",
        "answer_2": "56",
        "answer_3": "27",
        "answer_4": "387",
        "rightAnswer": "3"
    },
    {
        "question": "Wie heißen die besten Freunde von „Harry Potter“?",
        "answer_1": "Batman und Robin",
        "answer_2": "Ron und Hermine",
        "answer_3": "Frodo und Sam",
        "answer_4": "Neo und Morpheus",
        "rightAnswer": "2"
    }
];

let amountRightQuestions = 0;
let questionCounter = 0;

function onload() {
    renderStartScreen()
}

function renderStartScreen() {
    document.getElementById('outerContainer').innerHTML = `
    <div id="startScreen" class="card startScreen">
        <div>    
              <h1 class="card-title">Quizz-App</h5>
              <p class="card-text">Teste dein Allgemeinwissen!</p>     
        </div>
        <div>
              <button onclick="startQuiz()" type="button" class="btn btn-success">Start Quizz</button>
        </div>              
    </div>
    `;
}

function startQuiz() {
    hideStartScreen()
    showQuizBoard(questionCounter)
}

function hideStartScreen() {
    document.getElementById('startScreen').style.display = 'none';
}

function showQuizBoard(i) {

    let singleQuestion = allQuestions[i]['question'];
    let answerOne = allQuestions[i]['answer_1'];
    let answerTwo = allQuestions[i]['answer_2'];
    let answerThree = allQuestions[i]['answer_3'];
    let answerFour = allQuestions[i]['answer_4'];
    let progressPercent = (i + 1) / allQuestions.length * 100;

    document.getElementById('outerContainer').innerHTML = returnCardHTML(i, singleQuestion, answerOne, answerTwo, answerThree, answerFour, progressPercent);

    disableNextQuestionButton()
    checkLastQuestion(i)
}

function returnCardHTML(i, singleQuestion, answerOne, answerTwo, answerThree, answerFour, progressPercent) {
    return `
    <div id="quizBoard" class="card">
        <img class="card-img-top" src="img/logo.png" alt="Card image cap">
        <p>${singleQuestion}</p>
        <button id="answerButton1" onclick="checkAnswer(${i}, '1')" type="button" class="btn btn-light">${answerOne}</button>
        <button id="answerButton2" onclick="checkAnswer(${i}, '2')" type="button" class="btn btn-light">${answerTwo}</button>
        <button id="answerButton3" onclick="checkAnswer(${i}, '3')" type="button" class="btn btn-light">${answerThree}</button>
        <button id="answerButton4" onclick="checkAnswer(${i}, '4')" type="button" class="btn btn-light">${answerFour}</button>

        <div class="progress">
            <div class="progress-bar" role="progressbar" style="width:${progressPercent}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${progressPercent}%</div>
        </div>

        <div class="footerQiuzCard">
            <p><b>${i + 1}</b> von <b>${allQuestions.length}</b></p>
            <button onclick="NextQuestion(${i})" id="nextQuestionButton" type="button" class=" btn btn-primary disableButton">Next Question</button> 
        </div>
    </div>
    
    `;
}

function disableNextQuestionButton() {
    document.getElementById('nextQuestionButton').classList.add('disableButton');
}

function checkLastQuestion(i) {
    if (i + 1 == allQuestions.length) {
        document.getElementById('nextQuestionButton').innerHTML = 'show Result';
    }
}

function checkAnswer(i, j) {
    let rightAnswer = allQuestions[i]['rightAnswer'];
    let chosenAnswerButton = document.getElementById('answerButton' + j);
    let rightAnswerButton = document.getElementById('answerButton' + rightAnswer);

    if (rightAnswer == j) {
        chosenAnswerButton.style.backgroundColor = 'rgb(183, 247, 153)';
        amountRightQuestions++
    } else {
        chosenAnswerButton.style.backgroundColor = 'rgb(254, 164,164)';
        rightAnswerButton.style.backgroundColor = 'rgb(183, 247, 153)';
    }

    disableAnswerButton()
    enableNextQuestionButton()
    questionCounter++;
}

function disableAnswerButton() {
    document.getElementById('answerButton1').classList.add('disableButton');
    document.getElementById('answerButton2').classList.add('disableButton');
    document.getElementById('answerButton3').classList.add('disableButton');
    document.getElementById('answerButton4').classList.add('disableButton');
}

function enableNextQuestionButton() {
    document.getElementById('nextQuestionButton').classList.remove('disableButton');
}

function NextQuestion(i) {

    if (i + 1 == allQuestions.length) {
        showResult()
    } else {
        showQuizBoard(questionCounter)
    }
}

function showResult() {
    document.getElementById('quizBoard').style.display = 'none';
    document.getElementById('outerContainer').innerHTML = returnResultHTML()
}

function returnResultHTML() {
    return `
    <div id="results" class="card resultCard">
        <h1>Quiz beendet!</h1>
        <img class="card-img-top" src="img/brain result.png" alt="Card image cap">
        <p>Herzlichen Glückwunsch!</p>
        <p>Du hast <b>${amountRightQuestions}</b> von <b>${allQuestions.length}</b> Fragen richtig beantwortet!</p>
        <button onclick="restart()" type="button" class="btn btn-success">play again!</button>
    </div>
    `
}

function restart() {
    questionCounter = 0;
    amountRightQuestions = 0;
    hideResultScreen()
    showQuizBoard(questionCounter)
}

function hideResultScreen() {
    document.getElementById('results').style.display = 'none';
}
