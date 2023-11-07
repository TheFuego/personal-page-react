const images = document.getElementsByClassName('img')
const box = document.getElementsByClassName('box')

for(let i = 0; i< images.length; i++){
    images[i].addEventListener("click", function() {
        for(let j = 0; j < images.length; j++){
            images[j].classList.remove('active'); images[j].classList.add('inactive')
            box[j].classList.remove('text-active'); box[j].classList.add('text-inactive')
        }
        images[i].classList.remove('inactive'); images[i].classList.add('active')
        box[i].classList.remove('text-inactive'); box[i].classList.add('text-active')
    });
}

console.log(images[0])