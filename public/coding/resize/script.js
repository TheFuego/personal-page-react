const teams = [
    {name: "Partizan", img: "img/01.png", id: 0}, 
    {name: "C. Zvezda", img: "img/02.png", id: 1}, 
    {name: "Dinamo", img: "img/03.png", id: 2}, 
    {name: "Hajduk", img: "img/04.png", id: 3}, 
    {name: "Olimpija", img: "img/05.png", id: 4}, 
    {name: "Sarajevo", img: "img/06.png", id: 5}, 
    {name: "Maribor", img: "img/07.png", id: 6}, 
    {name: "Buducnost", img: "img/08.png", id: 7}, 
    {name: "Zrinjski", img: "img/09.png", id: 8}, 
    {name: "Vojvodina", img: "img/10.png", id: 9},
    {name: "Rijeka", img: "img/11.png", id: 10}, 
    {name: "Radnicki", img: "img/12.png", id: 11}, 
    {name: "Cukaricki", img: "img/13.png", id: 12}, 
    {name: "Borac (BL)", img: "img/14.png", id: 13}, 
    {name: "Mura", img: "img/15.png", id: 14}, 
    {name: "Shkupi", img: "img/16.png", id: 15}, 
    {name: "Zeljeznicar", img: "img/17.png", id: 16}, 
    {name: "Osijek", img: "img/18.png", id: 17}
]


for (let x = 0; x < teams.length; x++) {
    teams[x].awayInARow = 0
    teams[x].homeGames = []
    teams[x].awayGames = []
}

let rounds = []
let roundDivs = []
let home = []
let away = []
const matches = document.getElementById('matches')
const table = document.getElementById('table')
const clearBtn = document.getElementById('clear')

let homeValues = []
let awayValues = []

function randomNum() {
    return Math.floor(Math.random() * (2) + 1)
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function roundsFunction() {
    for (let i = 0; i < (teams.length-1)*2; i++) {
        rounds[i] = []
    }
}

function match(a, b) {
    let homeDecide = randomNum()
    if(a.awayInARow > b.awayInARow){
        b.awayInARow += 1; a.awayInARow = 0;
        return {homeTeam: a, awayTeam: b, matchText: a.name + " - " + b.name}
    }if(a.awayInARow < b.awayInARow){
        a.awayInARow += 1; b.awayInARow = 0;
        return {homeTeam: b, awayTeam: a, matchText: b.name + " - " + a.name}
    }if(a.awayInARow == b.awayInARow){
        if(homeDecide == 1) {
            b.awayInARow += 1; a.awayInARow = 0;
            return {homeTeam: a, awayTeam: b, matchText: a.name + " - " + b.name}
        }if(homeDecide == 2) {
            a.awayInARow += 1; a.awayInARow = 0;
            return {homeTeam: b, awayTeam: a, matchText: b.name + " - " + a.name}
        }
    }
}

function schedule() {
    let teamsTemp = [...teams]
    shuffle(teamsTemp)

    let teamsQueue = [...teamsTemp]
    teamsQueue.shift()
    for (let i = 0; i < rounds.length/2; i++) {
        let lastElement = teamsQueue.pop()
        teamsQueue.unshift(lastElement)
        
        rounds[i].push(match(teamsTemp[0], teamsQueue[0]))
        for (let y = 1; y < teams.length/2; y++) {
            rounds[i].push(match(teamsQueue[y], teamsQueue[teamsQueue.length-y]))
        }

        /*rounds[i].push(match(teamsQueue[1], teamsQueue[8]))
        rounds[i].push(match(teamsQueue[2], teamsQueue[7]))
        rounds[i].push(match(teamsQueue[3], teamsQueue[6]))
        rounds[i].push(match(teamsQueue[4], teamsQueue[5]))*/
        //console.log(teamsQueue)
    }
}


function reverseHome(a) {
    return {homeTeam: a.awayTeam, awayTeam: a.homeTeam, matchText: a.awayTeam.name + " - " + a.homeTeam.name}
}

function scheduleReverse() {
    for (let x = 0; x < rounds.length/2; x++) {
        for (let c = 0; c < rounds[0].length; c++) {
            rounds[x+rounds.length/2].push(reverseHome(rounds[x][c]))
        }
    }
}

roundsFunction()

//console.log(localStorage.names)
if(localStorage.names != undefined){
    rounds = JSON.parse(localStorage.names)
}

if(localStorage.names == undefined) {
    schedule()
    scheduleReverse()
    localStorage.setItem("names", JSON.stringify(rounds))
}

//schedule()
//scheduleReverse()

// ===============

let focusTeam
const teamDiv = document.getElementById('team')

function focusFunction(x) {
    teamDiv.innerHTML = ""
    
    let teamInfo = document.createElement("table")
    let baseInfo = teamInfo.insertRow();
    let goalInfo = teamInfo.insertRow();

    let nameTD = baseInfo.insertCell();
    nameTD.innerHTML += "<img src=" + x.img + ">";
    nameTD.innerHTML += x.name
    let posTD = baseInfo.insertCell();
    posTD.innerHTML += "Position: "; posTD.innerHTML += x.position;
    let ptsTD = baseInfo.insertCell();
    ptsTD.innerHTML += "Points: "; ptsTD.innerHTML += x.PTS;
    
    baseInfo.appendChild(nameTD);
    baseInfo.appendChild(posTD);
    baseInfo.appendChild(ptsTD);

    let GFTD = goalInfo.insertCell();
    GFTD.innerHTML += "Goals For: "; GFTD.innerHTML += x.GF;
    let GATD = goalInfo.insertCell();
    GATD.innerHTML += "Goals Against: "; GATD.innerHTML += x.GA;
    let GDTD = goalInfo.insertCell();
    GDTD.innerHTML += "Goal Difference: "; GDTD.innerHTML += x.GD;
    
    goalInfo.appendChild(GFTD);
    goalInfo.appendChild(GATD);
    goalInfo.appendChild(GDTD);


    let tbl = document.createElement("table")
    let headTr = tbl.insertRow();
    let homeTr = headTr.insertCell();
    homeTr.innerHTML += "Home Games:"
    let awayTr = headTr.insertCell();
    awayTr.innerHTML += "Away Games:"
    headTr.appendChild(homeTr);
    headTr.appendChild(awayTr);
    

    for (let i = 0; i < x.homeGames.length; i++) {
        let tr = tbl.insertRow();
        
        const tdHome = tr.insertCell();
        tdHome.innerHTML += "<img src=" + x.homeGames[i].homeTeam.img + ">";
        tdHome.innerHTML += '<a href="#team" onclick="focusFunction(teams['+x.homeGames[i].homeTeam.id+'])">'+x.homeGames[i].homeTeam.name+'</a>'+" "; tdHome.innerHTML += " "
        if(x.homeGames[i].homeScore != undefined && x.homeGames[i].awayScore != undefined && x.homeGames[i].homeScore != "" && x.homeGames[i].awayScore != ""){
            tdHome.innerHTML += x.homeGames[i].homeScore
            tdHome.innerHTML += "-"
            tdHome.innerHTML += x.homeGames[i].awayScore; tdHome.innerHTML += " "
        }else{
            tdHome.innerHTML += "- "
        }
        tdHome.innerHTML += "<img src=" + x.homeGames[i].awayTeam.img + ">";
        tdHome.innerHTML += '<a href="#team" onclick="focusFunction(teams['+x.homeGames[i].awayTeam.id+'])">'+x.homeGames[i].awayTeam.name+'</a>'+" "; tdHome.innerHTML += " "
        tr.appendChild(tdHome);

        const tdAway = tr.insertCell();
        tdAway.innerHTML += "<img src=" + x.awayGames[i].homeTeam.img + ">";
        tdAway.innerHTML += '<a href="#team" onclick="focusFunction(teams['+x.awayGames[i].homeTeam.id+'])">'+x.awayGames[i].homeTeam.name+'</a>'+" "; tdAway.innerHTML += " "
        if(x.awayGames[i].homeScore != undefined && x.awayGames[i].awayScore != undefined && x.awayGames[i].homeScore != "" && x.awayGames[i].awayScore != ""){
            tdAway.innerHTML += x.awayGames[i].homeScore
            tdAway.innerHTML += "-"
            tdAway.innerHTML += x.awayGames[i].awayScore; tdAway.innerHTML += " "
        }else{
            tdAway.innerHTML += "- "
        }
        tdAway.innerHTML += "<img src=" + x.awayGames[i].awayTeam.img + ">";
        tdAway.innerHTML += '<a href="#team" onclick="focusFunction(teams['+x.awayGames[i].awayTeam.id+'])">'+x.awayGames[i].awayTeam.name+'</a>'+" "; tdHome.innerHTML += " "
        tr.appendChild(tdAway);
    }

    teamDiv.appendChild(teamInfo)
    teamDiv.appendChild(tbl)

    //console.log(x.homeGames)
}

//focusFunction(teams[0])

// ===============

function print() {
    for (let y = 0; y < rounds.length; y++) {
        roundDivs[y] = document.createElement("div");
        roundDivs[y].classList.add("matchday");
        matches.appendChild(roundDivs[y])
        roundDivs[y].innerHTML += "<h1>" + "Round " + parseInt(y+1) + "</h1>";
        for (let i = 0; i < rounds[i].length; i++) {
            roundDivs[y].innerHTML += "<img src=" + rounds[y][i].homeTeam.img + ">";
            roundDivs[y].innerHTML += '<a href="#team" onclick="focusFunction(teams['+rounds[y][i].homeTeam.id+'])">'+rounds[y][i].homeTeam.name+'</a>'+" "

            

            home[i] = document.createElement("INPUT");
            home[i].type = "number";
            //home[i].onchange = checkResults()
            home[i].classList.add("form-home");
            roundDivs[y].appendChild(home[i])

            roundDivs[y].innerHTML += " - "

            away[i] = document.createElement("INPUT");
            away[i].type = "number";
            away[i].classList.add("form-away");
            //away[i].onchange = checkResults()
            roundDivs[y].appendChild(away[i])
            
            roundDivs[y].innerHTML += " "
            roundDivs[y].innerHTML += '<a href="#team" onclick="focusFunction(teams['+rounds[y][i].awayTeam.id+'])">'+rounds[y][i].awayTeam.name+'</a>'
            roundDivs[y].innerHTML += "<img src=" + rounds[y][i].awayTeam.img + ">";
            roundDivs[y].innerHTML += '<br>'
        }
    }
}

function checkResults() {
    for (let y = 0; y < rounds.length; y++) {
        for (let i = 0; i < rounds[i].length; i++) {
            rounds[y][i].homeScore = homeForms[y*rounds[i].length+i].value
            rounds[y][i].awayScore = awayForms[y*rounds[i].length+i].value

            if(rounds[y][i].homeScore > rounds[y][i].awayScore) {
                rounds[y][i].homePTS = 3
                rounds[y][i].awayPTS = 0
            }if(rounds[y][i].homeScore < rounds[y][i].awayScore) {
                rounds[y][i].homePTS = 0
                rounds[y][i].awayPTS = 3
            }if(rounds[y][i].homeScore == rounds[y][i].awayScore) {
                rounds[y][i].homePTS = 1
                rounds[y][i].awayPTS = 1
            }
        }
    }
}

function updateTable() {
    for (let x = 0; x < teams.length; x++) {
        teams[x].PTS = 0
        teams[x].GF = 0
        teams[x].GA = 0
        teams[x].GP = 0
    }

    for (let y = 0; y < rounds.length; y++) {
        for (let i = 0; i < rounds[i].length; i++) {

            if(rounds[y][i].homeScore != undefined && rounds[y][i].awayScore != undefined && rounds[y][i].homeScore != "" && rounds[y][i].awayScore != "") {
                teams[rounds[y][i].homeTeam.id].PTS += rounds[y][i].homePTS
                teams[rounds[y][i].awayTeam.id].PTS += rounds[y][i].awayPTS

                teams[rounds[y][i].homeTeam.id].GP ++
                teams[rounds[y][i].awayTeam.id].GP ++

                teams[rounds[y][i].homeTeam.id].GF += parseInt(rounds[y][i].homeScore)
                teams[rounds[y][i].homeTeam.id].GA += parseInt(rounds[y][i].awayScore)

                teams[rounds[y][i].awayTeam.id].GA += parseInt(rounds[y][i].homeScore)
                teams[rounds[y][i].awayTeam.id].GF += parseInt(rounds[y][i].awayScore)
            }
        }
    }

    for (let z = 0; z < teams.length; z++) {
        teams[z].GD = teams[z].GF - teams[z].GA
    }
}

print()

// ===============

homeForms = document.getElementsByClassName('form-home')
awayForms = document.getElementsByClassName('form-away')

updateBtn = document.getElementById('update')

function loadScore() {
    if(localStorage.homeScore != undefined) {
        homeValues = JSON.parse(localStorage.homeScore)

        for (let i = 0; i < homeForms.length; i++) {
            homeForms[i].value = homeValues[i]
        }
    }

    //

    if(localStorage.awayScore != undefined) {
        awayValues = JSON.parse(localStorage.awayScore)

        for (let i = 0; i < awayForms.length; i++) {
            awayForms[i].value = awayValues[i]
        }
    }
}

loadScore()

function saveScore() {
    for (let i = 0; i < homeForms.length; i++) {
        homeValues[i] = homeForms[i].value
    }
    
    localStorage.setItem("homeScore", JSON.stringify(homeValues))

    //console.log(localStorage.homeScore)

    for (let i = 0; i < awayForms.length; i++) {
        awayValues[i] = awayForms[i].value
    }
    
    localStorage.setItem("awayScore", JSON.stringify(awayValues))
}

// ===============

for (let y = 0; y < rounds.length; y++) {
    for (let i = 0; i < rounds[i].length; i++) {
        teams[rounds[y][i].homeTeam.id].homeGames.push(rounds[y][i])
        teams[rounds[y][i].awayTeam.id].awayGames.push(rounds[y][i])
    }
}

function tableCreate(){
    let teamsTable = [...teams]

    teamsTable.sort((a, b)=> {
        if (a.PTS < b.PTS) {
            return 1
        }if (a.PTS == b.PTS) {
            if (a.GD < b.GD) {
                return 1
            }if (a.GD == b.GD) {
                if (a.GF < b.GF) {
                    return 1
                }else {
                    return -1
                }
            }else {
                return -1
            }
        }else {
            return -1
        }
    });

    for (let i = 0; i < teamsTable.length; i++) {
        const tr = table.insertRow();

        const tdPosition = tr.insertCell();
        tdPosition.appendChild(document.createTextNode(i+1));
        teams[teamsTable[i].id].position = i+1
        tr.appendChild(tdPosition);

        const tdName = tr.insertCell();
        tdName.innerHTML += "<img src=" + teamsTable[i].img + ">";
        tdName.innerHTML += '<a href="#team" onclick="focusFunction(teams['+teamsTable[i].id+'])">'+teamsTable[i].name+'</a>'
        tr.appendChild(tdName);

        const tdGP = tr.insertCell();
        tdGP.appendChild(document.createTextNode(teamsTable[i].GP));
        tr.appendChild(tdGP);

        const tdGF = tr.insertCell();
        tdGF.appendChild(document.createTextNode(teamsTable[i].GF));
        tr.appendChild(tdGF);

        const tdGA = tr.insertCell();
        tdGA.appendChild(document.createTextNode(teamsTable[i].GA));
        tr.appendChild(tdGA);

        const tdGD = tr.insertCell();
        tdGD.appendChild(document.createTextNode(teamsTable[i].GD));
        tr.appendChild(tdGD);

        const tdPts = tr.insertCell();
        tdPts.appendChild(document.createTextNode(teamsTable[i].PTS));
        tr.appendChild(tdPts);

        tr.classList.add("generated")
        tdPosition.classList.add("generated")
        tdName.classList.add("generated")
        tdGP.classList.add("generated")
        tdGF.classList.add("generated")
        tdGA.classList.add("generated")
        tdGD.classList.add("generated")
        tdPts.classList.add("generated")
    }
}

function tableDelete(){
    const toRemove = document.querySelectorAll('.generated');

    toRemove.forEach(generated => {
        generated.remove();
    });
}

function tableDraw(){
    tableDelete()
    tableCreate()
}

// ===============

function clear() {
    localStorage.clear();

    rounds = []
    schedule()
    scheduleReverse()

    loadScore()
    location.reload();
}

updateBtn.onclick = function(){updateTable(); tableDraw()}

clearBtn.onclick = function(){clear(); updateTable(); tableDraw()}

checkResults(); updateTable(); tableDraw();

for (let i = 0; i < homeForms.length; i++) {
    homeForms[i].onchange = function(){checkResults(); updateTable(); tableDraw(); saveScore(); console.log(rounds[0])}
}

for (let i = 0; i < awayForms.length; i++) {
    awayForms[i].onchange = function(){checkResults(); updateTable(); tableDraw(); saveScore()}
}

//console.log(rounds[33][1])








