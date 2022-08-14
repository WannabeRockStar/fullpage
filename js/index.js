const container = document.getElementById('container')
const dotsContainer = document.getElementById('page-dots')
const sections = document.querySelectorAll('.section')
let counter = 0
let isScrolled = false
let touchY = 0
createPageDots()
const dots = document.querySelectorAll('.page-dot')

for(let i = 0; i < sections.length; i++) {
    sections[i].style.height = window.innerHeight + 'px'
}

document.addEventListener('wheel', (e) => {
    pageScroll(e, e.type)
})

document.addEventListener('touchstart', (e) => {
    touchY = e.changedTouches[0].pageY
})

document.addEventListener('touchmove', (e) => {
    pageScroll(e, e.type)
})

dots.forEach((item, index) => {
    item.addEventListener('click', (e) => pageScroll(e, e.type, index))

})

function createPageDots() {
    for(let i = 0; i < sections.length; i++) {
        const li = document.createElement('LI')
        li.className = 'page-dot'
        dotsContainer.append(li)
    }

    document.querySelector('.page-dot').classList.add('active')
}


function pageScroll(e, type, index) {
    
    
    if(isScrolled) return

    isScrolled = true

    for(let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active')
    }
    
    if(e.deltaY > 0 && type === 'wheel') {
        counter++
    } else if(e.deltaY < 0 && type === 'wheel') {
        counter--
    } else if(type === 'touchmove' && e.changedTouches[0].pageY < touchY) {
        counter++
    } else if(type === 'touchmove' && e.changedTouches[0].pageY > touchY) {
        counter--
    } else {
        counter = index
    }
    

    if(counter < 0) {
        counter = 0
    }
    
    
    if(counter === sections.length) {
        counter = sections.length - 1
    }

    // console.log(counter, 'Touched')
    dots[counter].classList.add('active')
    
    // console.log(counter, e.deltaY, window.innerHeight * counter, 'Carbon');
    let scrollArea = window.innerHeight * counter

    setTimeout(() => isScrolled = false, 1000)

    container.style.transform = `translateY(-${scrollArea}px)`
        
}