const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString();

const findFourDifferent = (string, uniqueStringLength) => {
    const arr = string.split('');

    let i = uniqueStringLength - 1;
    let markerFound = false;

    do {
        const arrToCheck = JSON.parse(JSON.stringify(arr)).splice(
            i - uniqueStringLength + 1,
            uniqueStringLength,
        );
        let withoutDuplicates = [...new Set(arrToCheck)];

        if (withoutDuplicates.length === uniqueStringLength) {
            markerFound = true;
        } else {
            i += 1;
        }
    } while (i < arr.length && !markerFound);

    console.log(i + 1);
};

// part 1
findFourDifferent(input, 4);

// part 2
findFourDifferent(input, 14);
