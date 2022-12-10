const path = require('path');
const fs = require('fs');

const [items, instructions] = fs
    .readFileSync(path.join(__dirname, 'input.txt'))
    .toString()
    .split('\r\n\r\n')
    .filter((data) => data);

const instructionsArr = instructions.split('\r\n').map((instruction) =>
    instruction
        .split(' ')
        .map((item) => Number(item))
        .filter((item) => item),
);

const createStacks = (data) => {
    const arr = data.split('\r\n').map((row) => row.split(''));

    const items = arr.splice(0, arr.length - 1);
    const numbers = arr[arr.length - 1];

    let stacks = numbers.filter((num) => Number(num)).map(() => []);
    items.forEach((row) => {
        row.forEach((item, i) => {
            if (Number(numbers[i]) && item !== ' ') stacks[Number(numbers[i]) - 1].push(item);
        });
    });

    return stacks;
};

const stacks = createStacks(items);

const rearrangeStacks = (stacks, instructions, newCrane) => {
    const rearrangedStacks = JSON.parse(JSON.stringify(stacks));

    instructions.forEach(([qty, from, to]) => {
        const [fromIndex, toIndex] = [from, to].map((stack) => stack - 1);
        const itemsToMove = rearrangedStacks[fromIndex].splice(0, qty);
        const itemsInProperOrder = newCrane ? itemsToMove : itemsToMove.reverse();

        rearrangedStacks[toIndex] = itemsInProperOrder.concat(rearrangedStacks[toIndex]);
    });

    return rearrangedStacks.map((stack) => stack[0]).join('');
};

console.log(rearrangeStacks(stacks, instructionsArr, false));
console.log(rearrangeStacks(stacks, instructionsArr, true));
