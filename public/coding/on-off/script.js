const pic = document.getElementsByClassName('pic')

let xPos
let yPos

function mouseCoordinates(event){
    xPos = event.clientX;
    yPos = event.clientY;

    //console.log(xPos, yPos)
}

function createSwitches() {
    for(let i = 0; i < pic.length; i++){
        const container = document.createElement('div')
        const buttonsDiv = document.createElement('div'); buttonsDiv.classList.add('buttons')
        const buttonOn = document.createElement('button'); buttonOn.classList.add('btn-class'); buttonsDiv.appendChild(buttonOn)
        const buttonOff = document.createElement('button'); buttonOff.classList.add('btn-class'); buttonsDiv.appendChild(buttonOff)

        const switchDivDiv = document.createElement('div'); switchDivDiv.classList.add('switch'); switchDivDiv.classList.add('switch-inactive')
        const toggleDiv = document.createElement('div'); toggleDiv.classList.add('toggle'); toggleDiv.classList.add('toggle-inactive')

        container.appendChild(buttonsDiv); container.appendChild(switchDivDiv); switchDivDiv.appendChild(toggleDiv)
        document.querySelector('nav').appendChild(container)
    }
}

createSwitches()

const buttons = document.getElementsByClassName('btn-class')
const toggle = document.getElementsByClassName('toggle')
const switchDiv = document.getElementsByClassName('switch')
// 0 = off, 1 = on
buttons[0].disabled = true

function create(x) {
    const heart = document.createElement("div");
    heart.innerHTML = '<img src="'+x+'_heart.png">'

    heart.classList.add('heart')

    document.body.appendChild(heart);

    //console.log(xPos)
    heart.style.position = 'fixed'
    heart.style.left = xPos - 20 + 'px'//'${xPos}px'
    heart.style.top = yPos + 'px'//'${}px'
    
    setTimeout(() => {
        heart.remove();
    }, "2000")
}

let y = 0; let i = 0;

while (i < buttons.length) {
    console.log(i, y)
    let ib = i; let yb = y;

    buttons[ib].onclick = function(){
        pic[yb].classList.remove('active')
        pic[yb].classList.add('inactive')

        toggle[yb].classList.remove('toggle-active')
        toggle[yb].classList.add('toggle-inactive')
        
        switchDiv[yb].classList.remove('switch-active')
        switchDiv[yb].classList.add('switch-inactive')

        buttons[ib].disabled = true
        buttons[ib+1].disabled = false
    };

    buttons[ib+1].onclick = function(){
        pic[yb].classList.add('active')
        pic[yb].classList.remove('inactive')

        toggle[yb].classList.add('toggle-active')
        toggle[yb].classList.remove('toggle-inactive')
        
        switchDiv[yb].classList.add('switch-active')
        switchDiv[yb].classList.remove('switch-inactive')

        buttons[ib+1].disabled = true
        buttons[ib].disabled = false
    };

        
    pic[yb].onclick = function(){
        create(yb)
    }

    pic[yb].onmousemove = mouseCoordinates

    y++
    i+=2
}

