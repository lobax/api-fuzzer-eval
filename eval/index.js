const argv = require('minimist')(process.argv.slice(2));
const parse = require('./src/parse.js');
const eval = require('./src/eval.js');

if (argv._.length < 1) {
    console.log(`Usage: [options] report-file...`);
    console.log(`\t-d \t Path to bug definition file`);
    return 1;
}

// Process input files
const files = argv._;
const dict_path = argv.d ? argv.d : './bugs.js';
const dict = require(dict_path);

parse(files)
    .then(results => eval(results, dict))
