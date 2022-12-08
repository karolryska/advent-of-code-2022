const path = require('path');
const fs = require('fs');

const setItemPriority = (letter) => {
    const ascii = letter.charCodeAt(0);

    return ascii < 97 ? ascii - 38 : ascii - 96;
};

// part 1
const doubledItems = fs
    .readFileSync(path.join(__dirname, 'input.txt'))
    .toString()
    .trim()
    .split('\r\n')
    .map((rucksack) => {
        const rucksackArr = rucksack.split('');
        const left = rucksackArr.slice(0, rucksackArr.length / 2);
        const right = rucksackArr.slice(rucksackArr.length / 2);

        const additionalItem = left.find((item) => right.includes(item));

        return setItemPriority(additionalItem);
    })
    .reduce((a, b) => a + b, 0);

console.log(doubledItems);

// part 2
const badges = fs
    .readFileSync(path.join(__dirname, 'input.txt'))
    .toString()
    .trim()
    .split('\r\n')
    .reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / 3);

        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [];
        }

        resultArray[chunkIndex].push(item);

        return resultArray;
    }, [])
    .map((group) => {
        [first, second, third] = group.map((elv) => elv.split(''));
        const badge = first.find((item) => second.includes(item) && third.includes(item));

        return setItemPriority(badge);
    })
    .reduce((a, b) => a + b, 0);

console.log(badges);
