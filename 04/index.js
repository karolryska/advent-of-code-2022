const path = require('path');
const fs = require('fs');

const sumOverlapedPairs = (allPairs) => allPairs.filter((pair) => pair).length;

const checkIfOverlapAll = (allPairs) => {
    return allPairs.map((pair) => {
        const [firstElv, secondElv] = pair;
        return !firstElv.find((segment) => !secondElv.includes(segment));
    });
};

const checkIfOverlap = (allPairs) => {
    return allPairs.map((pair) => {
        const [firstElv, secondElv] = pair;
        return !!firstElv.find((segment) => secondElv.includes(segment));
    });
};

const pairs = fs
    .readFileSync(path.join(__dirname, 'input.txt'))
    .toString()
    .trim()
    .split('\r\n')
    .map((pair) => {
        const pairArr = pair.split(',').map((elv) => {
            const [first, last] = elv.split('-');

            let segment = Number(first);
            let segments = [];

            do {
                segments.push(segment);
                segment += 1;
            } while (segment <= last);

            return segments;
        });

        return pairArr.sort((a, b) => a.length - b.length);
    });

// part 1
console.log(sumOverlapedPairs(checkIfOverlapAll(pairs)));

// part 2
console.log(sumOverlapedPairs(checkIfOverlap(pairs)));
