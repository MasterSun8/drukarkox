const posts = document.getElementById('contents')
var search = document.getElementById('searchBar')

var o = document.cookie.split(';')[1]
o = o.split('=')[1]
o = o.split(',')
o = [...o]
console.log(o)
            
var lastClickedTime

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function changed(){
    lastClickedTime = Date.now()
    console.log(lastClickedTime)
    await sleep(1000)
    if(Date.now() - lastClickedTime > 1000){
        let te = [...document.getElementsByClassName('contentWrap')]
        te.forEach(element => {
            element.remove()
        })
        update()
    }
}

function update(){
    fetch("db/printers")
    .then(v => v.text())
    .then(text => {
        text = JSON.parse(text)
        len = Object.keys(text).length
        let found = false
        for(let i in text){
            console.log(i)
            if(!o.includes(i)){
                continue
            }

            if(!(text[i]['company'].includes(search.value)) && !(text[i]['model'].includes(search.value)) && !(text[i]['type'].includes(search.value))){
                continue
            }
            
            let t = document.createElement('div')
            t.classList.add('contentWrap')
            let html = '<div class="content">'
            html += "<h1>"+text[i]['model']+"</h1>"
            html += '<div class="company">' + text[i]['company'] + "</div>"
            html += '<div class="type">' + text[i]['type'] + "</div>"
            html += '</div>'
            t.innerHTML += html
            posts.appendChild(t)
        }
    })
}

update()
