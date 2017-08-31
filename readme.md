tasks:

1. when you go to page = starts new session
   - stores game in current session
   - app must select a chosen word from word file.

   "app.use(session({
     secret: 'secret word',
     resave: false,
     saveUninitialized: false
   }))"

   app.get('/', function(req, res) {
         res.render('game');



2. generate a random word from var FS then show the number of letters in the word in underscore fashion
 create an array that maps all letters to __

3. validate 1 letter per guess at a time (check)
   - validate if guess = character (check)

4. let user know if guess appears in word
    - replace underscore with word letter

5. display partially guessed word

6. 8 guesses, display how many are left

7. game ends when loser runs out of guesses or if player constructs full word
