const path = require('path');
const fs = require('fs');

const calories = fs
	.readFileSync(path.join(__dirname, 'input.txt'))
	.toString()
	.trim()
	.split('\r\n\r\n')
	.map((elf) =>
		elf
			.split('\r\n')
			.map((calories) => Number(calories))
			.reduce((a, b) => a + b, 0)
	)
	.sort((a, b) => b - a);

// part 1
console.log(calories[0]);

// part 2
console.log(calories.splice(0, 3).reduce((a, b) => a + b, 0));
