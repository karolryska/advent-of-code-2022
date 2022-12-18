const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'))
    .toString()
    .trim()
    .split('\r\n')
    .map((row) => row.split('').map((tree) => Number(tree)));

const getOthersInOrder = (row, column, trees) => {
    const treesInRow = trees[row];
    const left = [...treesInRow].slice(0, column).reverse();
    const right = [...treesInRow].slice(column + 1, treesInRow.length);

    const treesIsColumn = trees.map((item) => item[column]);
    const top = [...treesIsColumn].slice(0, row).reverse();
    const bottom = [...treesIsColumn].slice(row + 1, treesInRow.length);

    return [left, right, top, bottom];
};

// part 1
const visibleTrees = input.map((row, rowIndex, rows) => {
    if (rowIndex === 0 || rowIndex === rows.length - 1) {
        return row;
    }

    const mapped = row.map((tree, columnIndex, treesInRow) => {
        const [left, right, top, bottom] = getOthersInOrder(rowIndex, columnIndex, rows);

        if (columnIndex === 0 || columnIndex === treesInRow.length - 1) {
            return tree;
        }

        if (
            [left, right, top, bottom].filter(
                (group) => group.filter((treeToCheck) => treeToCheck >= tree).length,
            ).length === 4
        ) {
            return 'x';
        }

        return tree;
    });

    return mapped;
});

console.log(visibleTrees.flat().filter((tree) => tree !== 'x').length);

// part 2
const treesScenicScores = input.map((row, rowIndex, rows) => {
    return row.map((tree, columnIndex) => {
        const others = getOthersInOrder(rowIndex, columnIndex, rows);

        return others
            .map((group) =>
                group.length
                    ? Number(
                          group.findIndex((item, i, arr) => item >= tree || i === arr.length - 1),
                      ) + 1
                    : 0,
            )
            .reduce((a, b) => a * b);
    });
});

console.log(treesScenicScores.flat().sort((a, b) => b - a)[0]);
