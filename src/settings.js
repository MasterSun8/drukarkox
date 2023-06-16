function register(){
    let pass = document.getElementById('password').value
    let reppass = document.getElementById('reppassword').value
    let name = document.getElementById('name').value
    if(pass!=reppass || !name){
        alert("Passwords or username incorrect.")
        return
    }
    let mail = document.getElementById('mail').value
    fetch("add/users?Username="+name+"&Mail="+mail+"&Password="+pass+"&Printers=0&admin=false")
    .then(v => v.text())
    .then(text => {
        console.log(text)
        if(text=='true'){
            alert("Account created")
        }else{
            alert("This mail is already in use")
        }
    })
}

function login(){
    let pass = document.getElementById('passwordLog').value
    let mail = document.getElementById('nameLog').value

    fetch("db/users")
    .then(v => v.text())
    .then(text => {
        text = JSON.parse(text)
        for(let i in text){
            console.log(text[i]['Mail'])
            if (text[i]['Mail'] == mail && text[i]['Password'] == pass){
                document.getElementById('contents').innerHTML = '<div class="bg"></div>'
                return true
            }
        }
        
    })
}