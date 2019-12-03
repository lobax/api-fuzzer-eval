const fs = require('fs').promises;

module.exports = function parse(files, dict) {

    console.log(`Number of files: ${files.length}`);
    const results = files.map(file =>
        fs.readFile(file)
        .then(data =>
            data.length ? JSON.parse(data) : null
        )
    );

    return Promise.all(results)
        .then(results => results.filter(obj => obj ? true : false))
}

