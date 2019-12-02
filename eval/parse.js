const fs = require('fs').promises;
const eval = require('./eval.js');

// Process input files
const files = process.argv.splice(process.execArgv.length + 2);
console.log(`Number of files: ${files.length}`);
const results = files.map(file =>
    fs.readFile(file)
        .then(data =>
            data.length ? JSON.parse(data) : null
        )
);


const dict = [
    {
        id: 0,
        name: 'Type Error',
        path: /exception\/.*[^\d\s]+.*$/,
        method: /get/i,
        body: /[\s\S]*/
    },
    {
        id: 1,
        name: 'Type Error',
        path: /exception\/.*[^\d\s]+.*$/,
        method: /get/i,
        body: /[\s\S]*/
    },
]

Promise.all(results)
    .then(results => results.filter(obj => obj ? true : false))
    .then(results => eval(results, dict))
