const url = location.pathname.substring(1).split('.')[0]
const elem = document.getElementById(url)

elem.classList.add('active')