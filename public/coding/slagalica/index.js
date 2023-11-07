var time = 60
var isStarted = false

function timer() {
	setTimeout(timer, 1000)
	if(time > 0) {
		if(isStarted){time --}
		document.querySelector('#time').innerHTML = time
	}
}

function oneDigitNum(){
    return Math.floor(Math.random() * 9)+1
}

function oneDigitNumPrompt(){
    return Math.floor(Math.random() * 10)
}

function twoDigitNum(){
    switch(Math.floor(Math.random() * 3)) {
        case 0:
            return 10
        break;
        case 1:
            return 15
        break;
        case 2:
            return 20
        break;
    }
    
}

function threeDigitNum(){
    switch(Math.floor(Math.random() * 4)) {
        case 0:
            return 25
        break;
        case 1:
            return 50
        break;
        case 2:
            return 75
        break;
        case 3:
            return 100
        break;
    }
    
}

numbers = [{digit:oneDigitNum(), isUsed: false}, {digit:oneDigitNum(), isUsed: false}, {digit:oneDigitNum(), isUsed: false}, {digit:oneDigitNum(), isUsed: false}, {digit:twoDigitNum(), isUsed: false}, {digit:threeDigitNum(), isUsed: false}]
operators = [{operation:"+", symbol:"+"}, {operation:"-", symbol:"-"}, {operation:"*", symbol:"x"}, {operation:"/", symbol:"÷"}]
parentheses = ["(", ")"]

const oneDigit = document.querySelectorAll(".one-digit");
const operatorClass = document.querySelectorAll(".operator");
const parenthesesClass = document.querySelectorAll(".parentheses");
const deleteClass = document.querySelectorAll(".delete");
const targetClass = document.querySelectorAll(".target-nums");

const stop = document.querySelectorAll(".stop");

var calculation = []
var lastSymbol = calculation[calculation.length - 1]

for (let i = 0; i < numbers.length; i++) {
    oneDigit[i].innerHTML = numbers[i].digit;
    oneDigit[i].addEventListener("click", function() {
        if(numbers[i].isUsed == false && time > 0){
            if(lastSymbol == "+" || lastSymbol == "-" || lastSymbol == "*" || lastSymbol == "/" || lastSymbol == "(" || lastSymbol == undefined){
                calculation.push(numbers[i].digit)
                numbers[i].isUsed = true
            }
        }if(numbers[i].isUsed == true ){
            oneDigit[i].classList.add("used")
        }
    })
    
    deleteClass[0].addEventListener("click", function() {
        //calculation.splice(-1)
        if(lastSymbol == numbers[i].digit){
            numbers[i].isUsed = false
        }if(numbers[i].isUsed == false ){
            oneDigit[i].classList.remove("used")
        }
    })
}

for (let i = 0; i < operators.length; i++) {
    operatorClass[i].innerHTML = operators[i].symbol;
    operatorClass[i].addEventListener("click", function() {
        if(lastSymbol != "+" &&  lastSymbol != "-" && lastSymbol != "*" && lastSymbol != "/" && lastSymbol != undefined && lastSymbol != "(" && time > 0){
            calculation.push(operators[i].operation)
        }
    })
}

for (let i = 0; i < parentheses.length; i++) {
    parenthesesClass[i].innerHTML = parentheses[i];
    parenthesesClass[i].addEventListener("click", function() {
        if(parentheses[i] == ")" && lastSymbol != "(" || parentheses[i] == "(" && lastSymbol != ")" && time > 0){
            calculation.push(parentheses[i])
        }
    })
}

deleteClass[0].addEventListener("click", function() {
    if(time > 0){calculation.splice(-1)}
})

var y = 3
var x = 4
var z = 5
var c = 6


function chooseTarget(){
    for (let i = 0; i < y; i++) {
        targetClass[i].innerHTML = oneDigitNumPrompt();
    }    

    for (let i = 0; i < x; i++) {
        numbers[i].digit = oneDigitNum();
        oneDigit[i].innerHTML = numbers[i].digit;
    }    

    for (let i = 4; i < z; i++) {
        numbers[i].digit = twoDigitNum();
        oneDigit[i].innerHTML = numbers[i].digit;
    }   

    for (let i = 5; i < c; i++) {
        numbers[i].digit = threeDigitNum();
        oneDigit[i].innerHTML = numbers[i].digit;
    }   
}

stop[0].addEventListener("click", function() {
    y--
    if(y<0){
        x--
    }if(x<0){
        z-=5
    }if(z<0){
        c--
    }
})
    
timer()


function main() {
    requestAnimationFrame(main)
    chooseTarget()
    lastSymbol = calculation[calculation.length - 1]
    if(c<6){
        isStarted = true
    }

    document.getElementById("formula").innerHTML = calculation.join('');
    if(lastSymbol != "+" && lastSymbol != "-" && lastSymbol != "*" && lastSymbol != "/"){
        document.getElementById("sum").innerHTML = eval(calculation.join(''));
    } else{
        document.getElementById("sum").innerHTML = "";
    }

    if(eval(calculation.join('')) == undefined){
        document.getElementById("sum").innerHTML = "";
    }
    console.log(oneDigit[0])
}




main()
