const express = require('express')
const app = express()
const dal = require('./dal')
const guessArray = require("./guessArray");
let under = []
let choose = []


const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const fs = require('fs');
let words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

app.use(bodyParser.json()); //tell the app what to do i.e. parses json and urls
app.use(bodyParser.urlencoded({
  extended: false
})) // false parses strings and arrays

app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set('views', __dirname + '/views') // mustache is turned on
app.use('/assets', express.static('public')) //public check


// every time they post a letter you want to check functions for valid letter,
// check if already used
// check if letter matches word
// app.post("/game")
// in if else statement

//session below
app.use(session({
  secret: 'secret word',
  resave: false,
  saveUninitialized: false
})) // session above




app.get('/', function(req, res) {
  let guessCounter = dal.getGuessCount();
  // console.log(dal);
  let choose = dal.chooseWord()
  req.session.word = choose;
  // console.log(choose)        // defined up top in global
  under = dal.underScoreArr(choose) // defined up top in global
  res.render("game", {
    guessArray: guessArray,
    under: under,
    guessCounter: guessCounter
  })
})


app.post('/', function(req, res) {
  let guessedLetter = req.body.guess
  let match = false
  for (let i = 0; i < guessArray.length; i++) {
    if (guessedLetter === guessArray[i]) {
      match = true
      console.log(match)
    }
  }
  if (match === true) {
    let message = "Already Guessed This Letter";
    let guessCounter = dal.getGuessCount()
    return res.render('game', {
      guessArray: guessArray,
      under: under,
      message: message,
      guessCounter: guessCounter
    })
  } else { // the letter has not been guessed twice
    dal.pushToArray(req.body.guess)
    let flipper = dal.flip(under, req.session.word, guessedLetter)
    if (flipper === undefined) {
      return res.render("gameOver")
    }
  under = flipper
  res.redirect("/game")
  ///Basic flow of this section should be:
  //1. See if the guess is correct.
  //2a. If correct, flip the letters
  //2b. If incorrect, add to the list of wrong guesses and decrement remaining guesses

}
});




app.get('/game', function(req, res) {
  // const guesses = dal.getGuessCount()
  let guessCounter = dal.getGuessCount()
  res.render("game", {
    guessArray: guessArray,
    under: under,
    guessCounter: guessCounter,
  })
})

app.listen(3000, function() {});
