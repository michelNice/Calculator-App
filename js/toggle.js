const switchButton = document.querySelector('.switch');
const circle = document.querySelector('.circle');
const body = document.querySelector('body');

let currentTheme = 1;
let direction = 1;

const themes = {
    1: { left: '4px', class: 'theme-1' },
    2: { left: '22px', class: 'theme-2' },
    3: { left: '40px', class: 'theme-3' }
};

// Load saved theme from localStorage
function loadThemeFromLocalStorage() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && themes[savedTheme]) {
        currentTheme = Number(savedTheme);
        circle.style.left = themes[currentTheme].left;
        body.classList.add(themes[currentTheme].class);
        
        // Set direction to resume proper order (1 → 2 → 3 → 2 → 1 ...)
        direction = currentTheme === 3 ? -1 : 1;
    }
}

// Save current theme to localStorage
function saveThemeToLocalStorage(themeNumber) {

    localStorage.setItem('theme', themeNumber);
}

// Theme switch on click
switchButton.addEventListener('click', () => {
    currentTheme += direction;

    if (currentTheme === 3 || currentTheme === 1) {
        direction *= -1;
    }

    const theme = themes[currentTheme];

    circle.style.left = theme.left;

    body.classList.remove('theme-1', 'theme-2', 'theme-3');
    body.classList.add(theme.class);

    saveThemeToLocalStorage(currentTheme);
});


loadThemeFromLocalStorage();
