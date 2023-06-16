const posts = document.getElementById('contents')
var search = document.getElementById('searchBar')

var o = document.cookie.split(';')[1]
o = o.split('=')[1]
o = o.split(',')
o = [...o]
console.log(o)

function tf(){
    let k = document.getElementById('print').value
    if(k){
        o.push(k)
        document.cookie = "printers="+o.toString()
    }
    o = document.cookie.split(';')[1]
    o = o.split('=')[1]
    o = o.split(',')
    o = [...o]
    console.log(o)

}
            
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
        let op = document.createElement('div')
        op.classList.add('contentWrap')
        let ht = '<div class="content">'
        ht += "<h1>Dodaj drukarke</h1>"
        ht += '<select id="print">'
        let i
        for(i in text){
            if(!o.includes(i)){
                ht += '<option value="'+i+'">'+i+'</option>'
                continue
            }else{}

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
        ht += '</select><button id="tf" onclick="tf()">buttonz</button></div>'
        op.innerHTML += ht
        posts.appendChild(op)
    })
}

update()
