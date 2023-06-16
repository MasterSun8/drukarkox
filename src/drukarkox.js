const posts = document.getElementById('contents')
let search = document.getElementById('searchBar')
let users

fetch('db/users')
    .then(res => res.json())
    .then(data => {
        users = data;
})

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
    fetch("db/posts")
    .then(v => v.text())
    .then(text => {
        text = JSON.parse(text)
        len = Object.keys(text).length
        let found = false
        for(let i in text){
            if(!(text[i]['Title'].includes(search.value))){
                continue
            }
            let user = users[text[i]['Owner_id']]['Username'] ? users[text[i]['Owner_id']]['Username'] : "holy moly"
            let t = document.createElement('div')
            t.classList.add('contentWrap')
            let html = '<div class="content">'
            html += "<h1>"+text[i]['Title']+"</h1>"
            html += '<div class="time">' + users[text[i]['Owner_id']]['Username'] + "</div>"
            html += text[i]['Content']+"<br>"
            html += '<div class="time">' + text[i]['Time'] + "</div>"

            /*
            <div class="contentWrap">

            <div class="contentWrap">
                <div class="content"></div>
            </div>
            */
            html += '</div>'
            t.innerHTML += html
            posts.appendChild(t)
        }
    })
}

update()
