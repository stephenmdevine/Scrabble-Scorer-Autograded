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
   //wordCheck uses validateInput function to ensure user input contains only letters
   let wordCheck = validateInput(word);
   while (wordCheck) {
      word = input.question("Enter a word using only letters: ");
      wordCheck = validateInput(word);
   }
   return word;
};

//newPointStructure replaces oldPointScorer to more efficiently calculate point values
let newPointStructure = transform(oldPointStructure);
newPointStructure[" "] = 0;   //adds whitespace to the score with a value of 0

//simpleScorer counts individual characters to score an input word
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

//vowelBonusScorer behaves like simpleScorer, but vowels are worth 3 instead of 1
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

//scrabbleScorer uses the traditional Scrabble letter values to score the input word
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
      description: 'Vowels are 3 points, consonants are 1 point.',
      scorerFunction: vowelBonusScorer
   },
   {
      name: 'Scrabble',
      description: 'The traditional scoring algorithm.',
      scorerFunction: scrabbleScorer
   }
];

//prompts the user to select one of the three scoring algorithms
function scorerPrompt() {
   console.log(`Select which scoring algorithm to use.\n`);
   for (let i = 0; i < 3; i++) {
      console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`)
   }
   let selection = input.question(`Enter 0, 1, or 2: `);
   while (selection < 0 || selection > 2) {
      selection = input.question("Select either 0, 1, or 2: ");
   }
   return scoringAlgorithms[selection];
}

//transforms an object with point values as the key into an object with letters as the key
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

//function to validate that an input word contains only letters (or whitespace)
function validateInput(word) {
   let alpha = ' abcdefghijklmnopqrstuvwxyz';
  word = word.toLowerCase();
  for (let i = 0; i < word.length; i++) {
    if (alpha.match(word[i]) === null) {
      return true;
    }
  }
  return false;
}

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
