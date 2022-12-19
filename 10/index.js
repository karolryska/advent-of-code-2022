const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'))
    .toString()
    .trim()
    .split('\r\n')
    .map((instruction) => {
        const [command, value] = instruction.split(' ');

        return [[command], [Number(value)]].filter(([a, b]) => a);
    })
    .flat(2);

// part 1
let cycleP1 = 0;
let sum = 1;
let values = [];

input.forEach((value) => {
    cycleP1 += 1;

    if (cycleP1 === 20 || (cycleP1 + 20) % 40 === 0) {
        values.push(sum * cycleP1);
    }

    if (typeof value === 'number') {
        sum += Number(value);
    }
});

console.log(values.reduce((a, b) => a + b, 0));

// part 2
const crt = [[], [], [], [], [], []];
let position = 1;

let cycleP2 = 0;
let row = 0;

input.forEach((value, i) => {
    if (cycleP2 === 40) {
        cycleP2 = 0;
        row++;
    }

    cycleP2 += 1;

    if ([position, position + 2, position + 1].includes(cycleP2)) {
        crt[row].push('#');
    } else {
        crt[row].push('.');
    }

    if (typeof value === 'number') {
        position += Number(value);
    }
});

console.log(crt.map((item) => item.join('')));
