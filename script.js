const scoreElement = document.querySelector(".score")
const levelElement = document.querySelector(".level")
const questionElement = document.querySelector(".question")
const oneButtonElement = document.getElementById("button-1")
const twoButtonElement = document.getElementById("button-2")
const threeButtonElement = document.getElementById("button-3")
const fourButtonElement = document.getElementById("button-4")
const resultElement = document.querySelector(".result")
const resultElementText = document.querySelector(".result-text")
const buttonsElement = document.querySelector(".variants")

const QUESTIONS = [
    {
        text: "Тебе позвонил незнакомый номер. Собеседник просит взять папину карту и сказать код с обратной стороны",
        variants: [
            {
                text: "Сказать код",
                lose: -400
            },
            {
                text: "Позвать взрослых",
                lose: 0
            },
            {
                text: "Сбросить",
                lose: 0
            },
            {
                text: "Молчать",
                lose: 0
            },
        ]
    },
    {
        text: "На телефон пришло сообщение о том, что мама попали в аварию и им срочно нужны деньги. В сообщении сказано, что нужно отправить код из SMS",
        variants: [
            {
                text: "Удалить SMS",
                lose: 0
            },
            {
                text: "Позвонить маме",
                lose: 100
            },
            {
                text: "Не отвечать",
                lose: 0
            },
            {
                text: "Позвонить на номер",
                lose: -100
            },
        ]
    },
    {
        text: "В онлайн игре другой игрок говорит, что зачислит тебе на счёт игровую валюту, если ты напишешь в чат номер карты папы с трёхзначным кодом",
        variants: [
            {
                text: "Написать",
                lose: -600
            },
            {
                text: "Удалить игру",
                lose: 0
            },
            {
                text: "Не отвечать",
                lose: 0
            },
            {
                text: "Выйти из игры",
                lose: 0
            },
        ]
    },
    {
        text: "В социальной сети к тебе добавились в друзья и просят установить на телефон мамы программу",
        variants: [
            {
                text: "Не добавлять",
                lose: 0
            },
            {
                text: "Сказать маме",
                lose: 100
            },
            {
                text: "Сказать папе",
                lose: 0
            },
            {
                text: "Установить",
                lose: -400
            },
        ]
    },
    {
        text: "Тебе на телефон позвонил неизвестный номер. Незнакомец говорит, что он из полиции и не может дозвониться до мамы. Он просит назвать код из SMS",
        variants: [
            {
                text: "Сбросить",
                lose: 0
            },
            {
                text: "Сказать маме",
                lose: 100
            },
            {
                text: "Назвать код",
                lose: -500
            },
            {
                text: "Ничего не говорить",
                lose: 0
            },
        ]
    },
]

let CURRENT_QUESTION  = 0;
let CURRENT_SCORE = 1000;


function setQuestion () {
    levelElement.innerHTML = `Уровень ${CURRENT_QUESTION + 1}`;
    scoreElement.innerHTML = `Деньги: ${CURRENT_SCORE}₽`;

    questionElement.innerHTML = QUESTIONS[CURRENT_QUESTION].text;
    oneButtonElement.innerHTML = QUESTIONS[CURRENT_QUESTION].variants[0].text;
    twoButtonElement.innerHTML = QUESTIONS[CURRENT_QUESTION].variants[1].text;
    threeButtonElement.innerHTML = QUESTIONS[CURRENT_QUESTION].variants[2].text;
    fourButtonElement.innerHTML = QUESTIONS[CURRENT_QUESTION].variants[3].text;
}

function blockAnswer() {
    oneButtonElement.disabled = true;
    twoButtonElement.disabled = true;
    threeButtonElement.disabled = true;
    fourButtonElement.disabled = true;
}

function startAnswer() {
    oneButtonElement.disabled = false;
    twoButtonElement.disabled = false;
    threeButtonElement.disabled = false;
    fourButtonElement.disabled = false;
}

function gameOver() {
    questionElement.style.display = "none";
    buttonsElement.style.display = "none";
    resultElement.style.marginTop = "400px"
    resultElementText.innerHTML = "Ты проиграл! Попробуй снова..."
    resultElement.style.backgroundColor = "#a40000";
    scoreElement.innerHTML = `Деньги: ${CURRENT_SCORE}₽`;
}

function Win() {
    questionElement.style.display = "none";
    buttonsElement.style.display = "none";
    resultElement.style.marginTop = "400px"
    resultElementText.innerHTML = "Ты победил! Молодец :)"
    resultElement.style.backgroundColor = "#139100";
}

setQuestion();

function selectVariant(e) {
    blockAnswer();
    const buttonId = e.target.id;
    const selectVariantIndex = buttonId.split("-")[1];
    const question = QUESTIONS[CURRENT_QUESTION]

    const selectVariant =  question.variants[selectVariantIndex - 1]

    CURRENT_SCORE = CURRENT_SCORE + selectVariant.lose;

    console.log(selectVariant.lose)

    if(selectVariant.lose >= 0) {
        resultElementText.innerHTML = "Верный ответ"
        resultElement.style.backgroundColor = "#139100";
    } else {
        resultElementText.innerHTML = "Неверный ответ"
        resultElement.style.backgroundColor = "#a40000";
    }

    resultElement.style.transform = 'scale(1)';

    CURRENT_QUESTION = CURRENT_QUESTION + 1;

    setTimeout(() => {
        if(CURRENT_SCORE <= 0) {
            gameOver();
        } else if (CURRENT_QUESTION == QUESTIONS.length) {
            Win();
        }
        else
        {
            resultElement.style.transform = 'scale(0)';
            setQuestion();
            startAnswer();
        }

    }, 1000)
}

oneButtonElement.addEventListener("click", selectVariant)
twoButtonElement.addEventListener("click", selectVariant)
threeButtonElement.addEventListener("click", selectVariant)
fourButtonElement.addEventListener("click", selectVariant)