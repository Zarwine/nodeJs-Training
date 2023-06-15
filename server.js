let http = require('http')
let fs = require('fs')
let url = require('url')

let server = http.createServer((request, response) => {

    let query= url.parse(request.url, true).query

    let name = query.name === undefined ? 'anonyme' : query.name
    
    fs.readFile('index.html', 'utf-8', (err,data) => {
        if(err) {
            response.writeHead(404)
            response.end("404 Page non trouvée")
        }

        response.writeHead(200, {
            'Content-type': 'text/html; charset=utf-8'
        })

        data = data.replace('{{name}}', name)
        response.end(data)
    })
    
}).listen(8080)