#!/usr/bin/env node

const fs = require('fs');

function  countAll(text, data, filename = ''){
    const lines = text.split('\n').length - (text.endsWith('\n') ? 1 : 0); // Count lines
    const words = text.match(/\S+/g) || []; // Match non-whitespace sequences
    const wordCount = words ? words.length : 0; // Count words
    const bytes = data.length;
    console.log(`      ${lines}     ${wordCount}    ${bytes} ${filename}`)
}
function processFile(option, filename){
    try {
        const data = fs.readFileSync(filename); // Reads entire file into a Buffer
        const text = data.toString();

        if (option === '-c') {
            console.log(`${data.length} ${filename}`); // Buffer length = bytes
        }
        else if (option === '-l'){
            const lines = text.split('\n').length - (text.endsWith('\n') ? 1 : 0); // Count lines
            console.log(`${lines} ${filename}`); // Number of lines
        }
        else if (option === '-w'){
            const words = text.match(/\S+/g) || [] ; // Match non-whitespace sequences
            const wordCount = words ? words.length : 0; // Count words
            console.log(`${wordCount} ${filename}`) // Number of words
        }
        else if (option === '-m'){
            const characters = [...text]; // Spread operator to get characters
            console.log(`${characters.length} ${filename}`); // Number of characters
        }
        else if(!option){
            countAll(text, data, filename);
        }
        else {
            console.error('Only the -c, -w, -m and -l options are supported.');
            process.exit(1);
        }
    } catch (err) {
        console.error(`Error reading file: ${err.message}`);
        process.exit(1);
    }
}

    const args = process.argv.slice(2);
    let option = null;
    let filename = null;


if(args.length === 1){
    if(args[0].startsWith('-')){
        option = args[0];
    } else {
        filename = args[0];
    }
}
else if (args.length === 2){
    option = args[0];
    filename = args[1];
}


if(filename){
    processFile(option, filename);
}
else {
    let input = [];
    process.stdin.on('data', chunk => input.push(chunk));
    process.stdin.on('end', () => {
        const data = Buffer.concat(input);
        const text = data.toString();

        if(option === '-c'){
            console.log(`${data.length}`);
        }
        else if(option === '-l'){
            const lines = text.split('\n').length - text.endsWith('\n') ? 1 : 0; // Count lines
            console.log(`${lines}`); // Number of lines
        }
        else if (option === '-w'){
            const words = text.match(/\S+/g) || []; // Match non-whitespace sequences
            const wordCount = words ? words.length : 0; // Count words
            console.log(`${wordCount}`) // Number of words
        }
        else if (option === '-m'){
            const characters = [...text];
            console.log(`${characters.length}`); // Number of characters
        } else { 
            countAll(text, data);
        }
       
    });
    process.stdin.resume();
}