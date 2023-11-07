const wordRender = document.getElementById('word')
const stepsRender = document.getElementById('steps')
const buttonsRender = document.getElementById('buttons')
const imageRender = document.getElementById('image')

const letters = "abcdefghijklmnopqrstuvwxyz"
const allowedSteps = 6
const wordList = ["partizan", "cigani smrde", "zeljko obradovic", "aleksaaa"]

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const word = wordList[getRandomInt(wordList.length)]
let steps = 0
let hang = false
let gameOver = false

function compareLetter(letter, word) {
    hang = true

    for(let i = 0; i < word.length; i++){
        console.log(letter, word[i])
        if(letter == word[i]){
            wordRender.textContent = wordRender.textContent.substring(0, i) + letter + wordRender.textContent.substring(i + letter.length);
            hang = false
        }
    }

    if(hang == true) {
        steps++
        imageRender.innerHTML = '<video id="video" loop="false" autoplay="autoplay" muted> <source src="transitions/tr'+steps+'.mp4" type="video/mp4"></video>'
        let myInt = setInterval(function () {
            imageRender.innerHTML = '<img src="transitions/'+steps+'.png">'
            console.log('check')
            clearInterval(myInt)
        }, 1000);
        stepsRender.textContent =  allowedSteps - steps
    }
}

function createButtons() {
    for(let i = 0; i < letters.length; i++){
        let newBtn = document.createElement("button")
        newBtn.classList.add('button')
        newBtn.innerText = letters[i]
        buttonsRender.appendChild(newBtn);
    }

    const buttonsClass = document.getElementsByClassName('button')
    
    for(let j = 0; j < buttonsClass.length; j++){
        buttonsClass[j].addEventListener("click", function(){
            if(!gameOver){
                let letter = letters[j]
                compareLetter(letter, word)
                gameOverCheck()
            }
        });
    }
}

function renderWord() {
    for(let i = 0; i < word.length; i++){
        if(word[i] == " "){
            wordRender.textContent += ' '
        }else {
            wordRender.textContent += '_'
        }
    }

    stepsRender.textContent = allowedSteps - steps

    imageRender.innerHTML = '<img src="transitions/'+steps+'.png">'
}

function gameOverCheck() {
    if(steps >= allowedSteps) {
        gameOver = true
        stepsRender.textContent = 'game over'
    }else if(word == wordRender.textContent) {
        gameOver = true
        stepsRender.textContent = 'success!'
    }
}

renderWord()
createButtons()