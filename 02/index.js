const path = require('path');
const fs = require('fs');

const symbols = {
	A: 'R',
	B: 'P',
	C: 'S',
	X: 'R',
	Y: 'P',
	Z: 'S',
};

const points = {
	R: 1,
	P: 2,
	S: 3,
};

const resultsEncrypted = {
	X: 0,
	Y: 3,
	Z: 6,
};

const possibleResults = [
	{ game: ['R', 'S'], points: 0 },
	{ game: ['R', 'R'], points: 3 },
	{ game: ['R', 'P'], points: 6 },
	{ game: ['P', 'R'], points: 0 },
	{ game: ['P', 'P'], points: 3 },
	{ game: ['P', 'S'], points: 6 },
	{ game: ['S', 'P'], points: 0 },
	{ game: ['S', 'S'], points: 3 },
	{ game: ['S', 'R'], points: 6 },
];

const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().trim().split('\r\n');

// part 1
const points1 = input
	.map((game) => game.split(' ').map((symbol) => symbols[symbol]))
	.map((game) => {
		const movePoints = points[game[1]];
		const gamePoints = possibleResults.find(
			(result) => JSON.stringify(result.game) === JSON.stringify(game)
		).points;

		return movePoints + gamePoints;
	})
	.reduce((a, b) => a + b, 0);

console.log(points1);

// part 2
const points2 = input
	.map((game) => game.split(' '))
	.map((game) => {
		const [opponentSymbol, resultSymbol] = game;
		const opponentMove = symbols[opponentSymbol];

		const gameResult = resultsEncrypted[resultSymbol];

		const myMove = possibleResults.find(
			({ game, points }) => game[0] === opponentMove && points === gameResult
		).game[1];

		return gameResult + points[myMove];
	})
	.reduce((a, b) => a + b, 0);

console.log(points2);
