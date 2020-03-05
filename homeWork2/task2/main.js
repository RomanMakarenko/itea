const http = require('http');
const myMath = require('math_roman_itea');
const fs = require('fs');
const path = require('path');
const url = require('url');
const app = http.createServer();
const port = 8001;
let filesInDir = [];

const isArrayNum = function(dataArray) {
    let acceptedValues = [];
    dataArray.forEach(element => {
        acceptedValues.push(!isNaN(element))
    })
    return !acceptedValues.includes(false);
};

const setDocsInDirToList = function(currentDir = __dirname) {
    const dir = fs.readdirSync(currentDir);
    dir.forEach(document => {
        if (!fs.lstatSync(currentDir + '/' + document).isDirectory()) {
            filesInDir.push(`Item: ${document}`);
        } else {
            setDocsInDirToList(currentDir + '/' + document);
        }
    })
}

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});

app.on('request', function(request, response) {
    switch (request.method) {
        case 'POST': {
            switch (url.parse(request.url).pathname) {
                case '/min': {
                    request.on('data', function (data) {
                        const setData = data.toString();
                        const dataArray = setData.split(',');
                        if (isArrayNum(dataArray)) {
                            response.writeHead(200);
                            const dataForResponse = myMath.min(dataArray).toString();
                            response.end(dataForResponse);
                        } else {
                            response.writeHead(202);
                            response.end('Pls set only integer numbers');
                        }
                    });
                    break;
                }
                case '/dir': {
                    setDocsInDirToList();
                    response.writeHead(200);
                    response.end(filesInDir.toString());
                    break;       
                }
                default: {
                    response.writeHead(404);
                    response.end('Method is not available!!!');
                }
            }
            break;
        }
        case 'GET': {
            switch (url.parse(request.url).pathname) {
                case '/dir': {
                    response.writeHead(200);
                    setDocsInDirToList();
                    response.end('XxxxxxxX');
                    break;
                }
            }
        }
    }
    fs.readFile(path.join(__dirname, 'index.html'), function (err, data) {
        if(err) console.log(err);
        response.writeHead(200, {"first": "second"})
        response.end(data);
    });
})