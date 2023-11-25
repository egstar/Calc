let userTheme = localStorage.getItem('userTheme')

window.addEventListener('load', () => {
    if(userTheme) { 
        document.documentElement.setAttribute('data-theme', userTheme)
        document.querySelector('#'+userTheme).checked = true
    } else {
        document.documentElement.setAttribute('data-theme', 'theme1')
        document.querySelector('#theme1').checked = true
    }
})
const switchTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('userTheme', theme)
}
