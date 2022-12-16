const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().trim().split('\r\n');

const setPaths = (arr) => {
    const paths = [];
    const currentPath = [];

    arr.forEach((line) => {
        if (line === '$ cd ..') {
            currentPath.pop();
            return;
        }

        if (line.startsWith('$ cd')) {
            currentPath.push('-');
            paths.push(`${currentPath.join('')} ${line.slice(-1)}`);
            return;
        }

        if (Number(line.split(' ')[0])) {
            paths.push(`${currentPath.join('')}- ${line.split(' ')[0]}`);
            return;
        }
    });

    return paths;
};

const dirsWithSums = setPaths(input)
    .map((line, i, arr) => {
        [nest, dir] = line.split(' ');

        if (Number(dir)) {
            return line;
        }

        const sum = [];
        let index = i;

        do {
            sum.push(arr[index]);
            index += 1;
        } while (arr[index]?.split(' ')[0].length > nest.length);

        return sum
            .filter((item) => item)
            .filter((item) => Number(item.split(' ')[1]))
            .map((item) => Number(item.split(' ')[1]))
            .reduce((a, b) => a + b, 0);
    })
    .filter((item) => typeof item == 'number');

console.log(dirsWithSums.filter((item) => item < 100000).reduce((a, b) => a + b, 0));

console.log(
    dirsWithSums
        .filter((item) => 70000000 - dirsWithSums[0] + item >= 30000000)
        .sort((a, b) => a - b)[0],
);
