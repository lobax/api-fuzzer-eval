const fs = require('fs').promises;
const eval = require('./eval.js');

// Process input files
const files = process.argv.splice(process.execArgv.length + 2);
console.log(`Number of files: ${files.length}`);
const results = files.map(file =>
    fs.readFile(file)
        .then(data => JSON.parse(data))
);


const dict = [
    {
        id: 0,
        name: 'Type Error',
        path: /exception\/\d*[^\d\s]+\d*$/,
        method: /get/i,
        body: /[\s\S]*/
    },
]

Promise.all(results)
    .then(results => results.map(res => decode(res)))
    .then(results => eval(results, dict))

function decode(result) {
    return {
        ...result,
        request_url: decodeStr(result.request_url),
        request_method: decodeStr(result.request_method),
        request_body: decodeStr(result.request_body),
    }
}

function decodeStr(str) {
    if (str)
        return Buffer.from(str, 'base64').toString('utf8')
    else
        return ""
}

