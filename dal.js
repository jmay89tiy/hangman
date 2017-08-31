const guessArray = require("./guessArray");
const fs = require('fs');
let words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
// choose = []
// under = []
let guessCount = 8;

function chooseWord() {
  var random = words[Math.floor(Math.random() * words.length)];
  console.log(random)
  let randomArr = [...random] //splits this word and puts the letters in an array
  console.log(randomArr) // shows the random word
  return randomArr
}

function underScoreArr(choose) {
  let randArr = [];
  for (i = 0; i < choose.length; i++) { //for each loop
    randArr[i] = "_" //for every index # in underScore turn the index to a "_"
    console.log(randArr[i]);
  }
  return randArr
}

function flip(under, choose, guessedLetter) {
  console.log(guessedLetter);
  console.log("function flip " + choose);
  let isCorrect = false
  for (let i = 0; i < choose.length; i++) { // reviews the word itself
    if (choose[i] === guessedLetter) { // if letter in word is equal to guessed letter
      under[i] = guessedLetter
      isCorrect = true // change letter from "_" back to that letter
    }
  }
  if (!isCorrect) {

    guessCount -= 1;
    if (guessCount === 0) {
      return
    }
  }
  console.log(guessCount)
  return under//sends back the finished product in this case the array, under.
}

//function for get guesscount and passes it in as data - returning guessCount

function getGuessCount () {
  return guessCount;
}


function pushToArray(letter) { //when called insert req.body.guess (located in game, name value)
  guessArray.push(letter) //pushes this letter to end of the array
}









//
//
// function wordMaker() { // random word generator
//   var words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n")
//   var random = Math.floor((Math.random()*(fs.length-1)));
//   var newWord = words[random]; // the word to guess will be chosen from the array above
//   var chosenWord = new Array(newWord.length);
//   var index = 0;
// }
module.exports = {
  pushToArray,
  guessArray,
  chooseWord,
  underScoreArr,
  flip,
  getGuessCount,


}
