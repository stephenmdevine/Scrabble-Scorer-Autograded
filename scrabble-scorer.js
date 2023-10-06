// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!\n");
   let word = input.question("Enter a word to score: ");
   return word;
};

let newPointStructure = transform(oldPointStructure);

let simpleScorer = function(word) {
   word = word.toUpperCase();
	let letterPoints = "";
   let totalScore = 0;
   for (let i = 0; i < word.length; i++) {
      letterPoints += `Points for '${word[i]}': 1\n`;
      totalScore++;
   }
   letterPoints += `Total points for '${word}': ${totalScore}`;
   return totalScore;
};

let vowelBonusScorer = function(word) {
   let vowels = ['A', 'E', 'I', 'O', 'U'];
   word = word.toUpperCase();
	let letterPoints = "";
   let totalScore = 0;
   for (let i = 0; i < word.length; i++) {
      if (vowels.includes(word[i])) {
         letterPoints += `Points for '${word[i]}': 3\n`;
         totalScore += 3;
      }  else {
         letterPoints += `Points for '${word[i]}': 1\n`;
         totalScore++;
      }
   }
   letterPoints += `Total points for '${word}': ${totalScore}`;
   return totalScore;
};

let scrabbleScorer = function(word) {
   word = word.toLowerCase();
   let ptsScored = 0;
   for (i = 0; i < word.length; i++) {
      for (const letter in newPointStructure) {
         if (letter === word[i]) {
            ptsScored += newPointStructure[letter];
         }
      }
   }
   return ptsScored;
};

const scoringAlgorithms = [
   {
      name: 'Simple Score',
      description: 'Each letter is worth 1 point.',
      scorerFunction: simpleScorer
   },
   {
      name: 'Bonus Vowels',
      description: 'Vowels are 3 pts, consonants are 1 pt.',
      scorerFunction: vowelBonusScorer
   },
   {
      name: 'Scrabble',
      description: 'The traditional scorign algorithm.',
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt() {
   let selection = input.question(`\nSelect which scoring algorithm to use.\n
0. Simple: One point per character
1. Bonus Vowels: Vowels are worth 3 points
2. Scrabble: Standard Scrabble points\n
Enter 0, 1, or 2: `);
   while (selection < 0 || selection > 3) {
      selection = input.question("Select either 0, 1, or 2: ");
   }
   return scoringAlgorithms[selection];
}

function transform(oldPoints) {
   let newPoints = {};
   let char = "";
   for (item in oldPoints) {
      for (let i = 0; i < oldPoints[item].length; i++) {
         char = oldPoints[item][i];
         newPoints[char.toLowerCase()] = Number(item);
      }
   }
   return newPoints;
};

function runProgram() {
   let word = initialPrompt();
   let scorer = scorerPrompt();
   console.log(`Score for '${word}': ${scorer.scorerFunction(word)}`);
}

// console.log(vowelBonusScorer(initialPrompt()));
// console.log(newPointStructure);

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
