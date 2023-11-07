const sneakers = document.getElementsByClassName('sneaker-img')
const h = document.getElementsByClassName('h-class')
const hdiff = document.getElementsByClassName('h-diff')
const text = document.getElementById('text')
const lines = document.getElementById('lines')

const objects = [
    {color: '#f9000a', name: 'nike'},
    {color: '#0048ff', name: 'adidas'},
    {color: 'black', name: 'puma'}
]


for(let i = 0; i < sneakers.length; i++) {
    sneakers[i].addEventListener("click", function(){
        for(let k = 0; k < h.length; k++) {
            h[k].style.transition = 'all 0s'
            h[k].style.marginBottom = null
        }
        
        for(let j = 0; j < sneakers.length; j++) {
            sneakers[j].classList.remove('sneaker-active')
            sneakers[j].style.transform = null
            sneakers[j].style.opacity = '0.6'
        }
    
        let translate = (i*200)-200
        sneakers[i].classList.add('sneaker-active')
        sneakers[i].style.transform = 'translateX('+translate+'px) translateY(255px) scale(4.4)'
        sneakers[i].style.opacity = null;
        text.style.opacity = '1'

        lines.style.opacity = '1'
        lines.style.transform = 'translateX('+i*368+'px)'
        
        myInt = setInterval(function () {
            for(let k = 0; k < h.length; k++) {
                h[k].style.transition = 'all 0.8s'
                h[k].style.color = objects[i].color
                h[k].innerText = objects[i].name
                h[k].style.marginBottom = '-20vw'
            }
            clearInterval(myInt)
        }, 1);
           
        hdiff[0].innerText = objects[i].name
        hdiff[0].style.textShadow = "-2px -2px 0 "+objects[i].color+", 2px -2px 0 "+objects[i].color+", -2px 2px 0 "+objects[i].color+", 2px 2px 0 "+objects[i].color+""
    });
}