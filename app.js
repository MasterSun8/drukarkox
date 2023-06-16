const http = require('http')
const fs = require('fs')

const src = fs.readdirSync('src')
//const img = fs.readdirSync('img')

const db = ['comments', 'posts', 'printers', 'projects', 'users']
const public = ['drukarkox', 'leaderboard', 'graph', 'myprinters', 'settings']

console.log(db)

function getSite(site) {
    let file = fs.readFileSync(site, { encoding: 'utf8', flag: 'r' })
    return file
}

function saveNew(base, data) {
    let file = 'db/' + base + '.json'
    let json = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' })
    json = JSON.parse(json)
    if (base == 'users') {
        for (let i in json) {
            if (json[i]['Mail'] == data['Mail']) {
                return 'false'
            }
        }
    }
    let len = Object.keys(json).length
    json[parseInt(len)] = data
    json = JSON.stringify(json)
    fs.writeFileSync(file, json, { encoding: 'utf8', flag: 'w' })
    return 'true'
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

    console.log(url)

    if (d[0] == 'add' && db.includes(d[1].split('?')[0])) {

        let target = d[1].split('?')
        let arr = target[1].split('&')
        let obj = {}
        let temp
        arr.forEach(el => {
            temp = el.split('=')
            obj[temp[0]] = temp[1]
        })

        res.setHeader('Content-Type', 'text/plain')
        res.write(saveNew(d[1].split('?')[0], obj))

    } else if (src.includes(url)) {
        res.write(getSite('src/' + url))
    }/* else if (img.includes(url)) {
        res.write(getSite('img/' + url))
    }*/ else if (db.includes(d[1]) && d[0] == 'db') {
        res.setHeader('Content-Type', 'application/json')
        res.write(getSite('db/' + d[1] + '.json'))
    } else if (site[0] == 'settings') {
        res.write(getSite('public/' + 'settings.html'))
    } else if (public.includes(site[0])) {
        url = url.split('.')[0]
        res.write('<html><head><link rel="stylesheet" href="main.css"><link rel="stylesheet" href="' + url + '.css"></head>')
        res.write(getSite('public/template.html'))
        res.write('<script src="' + url + '.js"></script><script src="main.js"></script></body></html>')
    } else {
        res.write(getSite('public/default.html'))
    }
    res.end('')
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})