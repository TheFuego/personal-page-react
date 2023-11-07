const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 500
canvas.height = 100

const shared = document.querySelectorAll(".shared")
const my = document.querySelectorAll(".my")
const one = document.querySelectorAll(".one")
const two = document.querySelectorAll(".two")
const three = document.querySelectorAll(".three")
    
function randomNum(){
    return Math.floor(Math.random() * 52)
}

suits = [{index: "hearts", symbol: "♥", id:0}, {index: "diamonds", symbol: "♦", id:1}, {index: "clubs", symbol: "♣", id:2}, {index: "spades", symbol: "♠", id:3}]
numbers = [{value: "13", symbol: "A"}, {value: "1", symbol: "2"}, {value: "2", symbol: "3"}, {value: "3", symbol: "4"}, {value: "4", symbol: "5"}, {value: "5", symbol: "6"}, {value: "6", symbol: "7"}, {value: "7", symbol: "8"}, {value: "8", symbol: "9"}, {value: "9", symbol: "10"}, {value: "10", symbol: "J"}, {value: "11", symbol: "Q"}, {value: "12", symbol: "K"}]
cards = []

for (let i = 0; i < suits.length; i++) {
    for (let z = 0; z < numbers.length; z++) {
        cards.push({value: numbers[z].value, suit: suits[i].index, suitID: suits[i].id, symbol: suits[i].symbol + numbers[z].symbol, isDealt: false})
    } 
}

me = {position: my, myCards: [], handValues: [], hand: undefined, name: "Me"}
player1 = {position: one, myCards: [], handValues: [], hand: undefined, name: "Diego"}
player2 = {position: two, myCards: [], handValues: [], hand: undefined, name: "Tristan"}
player3 = {position: three, myCards: [], handValues: [], hand: undefined, name: "Ford"}
players = [me, player1, player2, player3]

stepCounter = 0
sharedCards = []

function deal(x){
    if(!cards[x].isDealt){
        cards[x].isDealt = true
        return cards[x]
    }if(cards[x].isDealt){
        return deal(randomNum())
    }
}

function dealMe(player){
    let i = 0
    while (i < 2) {
        player.myCards[i] = deal(randomNum())
        if (player.myCards[i] != undefined){
            i++
        }
    }
}

function dealShared(x){
    for (let i = 0; i < x; i++) {
        sharedCards.push(deal(randomNum()))
    }
}

function playerDeal(player){
    dealMe(player)

    for (let i = 0; i < player.myCards.length; i++) {
        player.position[i].innerHTML = player.myCards[i].symbol;
        if(player.myCards[i].suit == "hearts" || player.myCards[i].suit == "diamonds"){
            player.position[i].classList.add("red")
        }
    }
}

function playerCheck(player) {
    player.pairs = []
    player.flush = []
    player.pairCount = 0
    player.threeCount = 0
    player.pair = []
    player.three = []
    player.myCardValues = [player.myCards[0].value, player.myCards[1].value]
    player.straightCounter = 0
    player.straightCheck = 0
    player.straightValue = 0
    player.highestCard = 0
    player.bestHand = 0
    player.checkCards = player.myCards.concat(sharedCards)
    for (let z = 0; z < numbers.length; z++) {
        player.pairs[z] = 0
    }
    for (let z = 0; z < suits.length; z++) {
        player.flush[z] = 0
    }

    function checkPair(player){
        for (let pairTarget = 0; pairTarget < numbers.length; pairTarget++) {
            for (let cardCheck = 0; cardCheck < player.checkCards.length; cardCheck++) {
                if(player.checkCards[cardCheck].value-1 == pairTarget){
                    player.pairs[pairTarget]++
                }
            }
        } 
    }

    function checkFlush(player){
        for (let flushTarget = 0; flushTarget < suits.length; flushTarget++) {
            for (let cardCheck = 0; cardCheck < player.checkCards.length; cardCheck++) {
                if(player.checkCards[cardCheck].suitID == flushTarget){
                    player.flush[flushTarget]++
                }
            }
        } 
    }

    function checkStraight(player){
        for (let cardCheck = 0; cardCheck < player.pairs.length+1; cardCheck++) {
            if(player.pairs[cardCheck] > 0){
                player.straightCounter ++
            }if(player.pairs[cardCheck] == 0 && player.straightCounter < 5){
                player.straightCounter = 0
            }if(player.straightCounter > 4 && player.pairs[cardCheck+1] == 0){
                player.straightValue = cardCheck
                cardCheck=200
            }if(player.pairs[player.pairs.length-1]>0 && player.pairs[0]>0 && cardCheck > player.pairs.length-1){
                player.straightCounter ++
            }if(player.straightCounter>player.straightCheck){
                player.straightCheck = player.straightCounter
            }
        }
    }

    checkPair(player)
    checkFlush(player)
    checkStraight(player)

    for (let i = 0; i < player.pairs.length; i++) {
        if(player.pairs[i] == 1){
            player.handValues.push(i+2)
        }
    }

    for (let i = 0; i < player.pairs.length; i++) {
        if(player.pairs[i] == 2){
            player.handValues.push((i+2)*10)
            player.pair.push(i)
            player.pairCount++
        }
    }
    
    if(player.pairCount > 1){
        player.handValues.push((player.pair[0]+player.pair[1]+2)*100)
    }
    
    for (let i = 0; i < player.pairs.length; i++) {
        if(player.pairs[i] == 3){
            player.handValues.push((i+2)*1000)
            player.three.push(i)
            player.threeCount++
        }
    }

    if(player.pairCount > 0 && player.threeCount++){
        player.handValues.push((player.pair[0]+player.three[0]+2)*1000000)
    }

    for (let i = 0; i < player.pairs.length; i++) {
        if(player.pairs[i] == 4){
            player.handValues.push((i+2)*10000000)
            player.threeCount++
        }
    }

    if(player.straightCounter > 4){
        player.handValues.push((player.straightValue+2)*10000)
    }

    for (let i = 0; i < player.flush.length; i++) {
        if(player.flush[i] > 4 && player.straightCount > 4){
            player.handValues.push(100000000)
        }if(player.flush[i] > 4){
            player.handValues.push(100000)
        }
    }

    player.bestHand = Math.max(...player.handValues)

    player.highestCard = Math.max(...player.myCardValues)
}

const check = document.querySelectorAll(".check");

playerDeal(me)
playerDeal(player1)
playerDeal(player2)
playerDeal(player3)

function update(){
    playerCheck(me)
    playerCheck(player1)
    playerCheck(player2)
    playerCheck(player3)
}

function checkWinner(){
    playersHighest = [me.highestCard, player1.highestCard, player2.highestCard, player3.highestCard]
    playersHand = [me.bestHand, player1.bestHand, player2.bestHand, player3.bestHand]

    winnerNum = playersHand.indexOf(Math.max(...playersHand));
    winner = undefined
    if(winnerNum>-1){
        winner = players[winnerNum].name
    }
}

check[0].addEventListener("click", function() {
    stepCounter++
    if(stepCounter == 2){
        let i = 0
        while (i < 3) {
            if(sharedCards.length < 4){
                dealShared(1)
                i++
            }
        }
    }if(stepCounter == 3){
        let i = 0
        while (i < 1) {
            if(sharedCards.length < 5){
                dealShared(1)
                i++
            }
        }
    }if(stepCounter == 4){
        let i = 0
        while (i < 1) {
            if(sharedCards.length < 6){
                dealShared(1)
                i++
            }
        }
    }
    update()
})

function render(){
    requestAnimationFrame(render)
    checkWinner()

    for (let i = 0; i < sharedCards.length; i++) {
        shared[i].innerHTML = sharedCards[i].symbol;
        if(sharedCards[i].suit == "hearts" || sharedCards[i].suit == "diamonds"){
            shared[i].classList.add("red")
        }
    }

    document.getElementById('winner').innerHTML = "The winner is " + winner

    console.log(playersHand)
    //console.log(player1.pairs)
    //console.log(player1.handValues)
}

render()



