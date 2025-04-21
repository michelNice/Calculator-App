const switchButton = document.querySelector('.switch')
const circle = document.querySelector('.circle')
const body = document.querySelector('body')
const button = document.querySelectorAll('.sign')

let currentTheme = 1;
let direction = 1
switchButton.addEventListener('click', ()=> {

    const themes = {
        1:{
            left:'4px',
            class:'theme-1'
        },
        2:{
            left:'22px',
            class:'theme-2'
            
        },
        3:{
            left:'44px',
            class:'theme-3'
        }
    }

    currentTheme += direction

    if(currentTheme === 3 || currentTheme === 1){
        direction *= -1;
    }
    
    const theme = themes[currentTheme]

    circle.style.left = theme.left;

    body.classList.remove('theme-1','theme-2','theme-3')


    body.classList.add(theme.class)
})