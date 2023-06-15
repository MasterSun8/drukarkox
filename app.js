const http = require('http')
const fs = require('fs')

const src = fs.readdirSync('src')
const img = fs.readdirSync('img')

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
    res.setHeader('Content-Type', 'text/html')
  
    let url = req.url
    console.log(url)
    
    
    if(src.includes(url.substring(1))){
        res.write(getSite('src'+url))
    }else if(img.includes(url.substring(1))){
        res.write(getSite('img'+url))
    }else if(public.includes(url.substring(1).split('.')[0])){
        url = url.substring(1).split('.')[0]
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