const url = location.pathname.substring(1).split('.')[0]
const elem = document.getElementById(url)

console.log(url)
console.log(elem)

elem.classList.add('active')