const http = require('http')
const fs = require('fs')

const src = fs.readdirSync('src')
const img = fs.readdirSync('img')
const db = fs.readdirSync('db')

const public = ['drukarkox', 'leaderboard', 'graph', 'myprinters', 'settings']

console.log(public)

function getSite(site){
    let file = fs.readFileSync(site, { encoding: 'utf8', flag: 'r'})
    return file
}

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET')
    res.setHeader('Access-Control-Max-Age', 2592000)
    res.setHeader('Content-Type', 'text/html')
  
    let url = req.url.substring(1)

    let d = url.split('/')
    let site = url.split('.')
    
    if(src.includes(url)){
        res.write(getSite('src/'+url))
    }else if(img.includes(url)){
        res.write(getSite('img/'+url))
    }else if(db.includes(d[1]) && d[0] == 'db'){
        res.write(getSite('db/'+d[1]))
    }else if(site[0]=='settings'){
        res.write(getSite('public/'+'settings.html'))
    }else if(public.includes(site[0])){
        url = url.split('.')[0]
        console.log(url)
        res.write('<html><head><link rel="stylesheet" href="main.css"><link rel="stylesheet" href="'+url+'.css"><script src="'+url+'.js"></script></head>')
        res.write(getSite('public/template.html'))
        res.write('<script src="main.js"></script></body></html>')
    }else{
        res.write(getSite('public/default.html'))
    }
    res.end('')
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})