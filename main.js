  /*----- player objects -----*/
//Empty array to initialize, shuffle, and deal the deck.
let cards = [];
//These are the two spots where players can play cards
let gameBoardPlayer = [];
let gameBoardComp = [];
//Each player has their hand and their deck
let playerHand = [];
let playerDeck =[];
let computerHand = [];
let computerDeck = [];

  /*----- event listeners -----*/
  //Connects button(playerHand) to the playRound func
  const playCard = document.getElementById('playerHand');

  playCard.addEventListener('click', () => {
    playRound();
  })

  const startGame = document.getElementById('deckInit');

  startGame.addEventListener('click', () => {
    deckInit();
  })
  /*----- functions -----*/
  

//This function generates a deck with 4 different suits and 14 different values and pushes each as an object into an array.
function deckInit() {
    // for (let suit = 0; suit < 4; suit++) {
    //     for(let val = 2; val < 15; val++) {
      for (let suit = 0; suit < 2; suit++) {
        for(let val = 2; val < 10; val++) {
          cards.push({
              suit: suit,
              val: val})
          };
     } return deal(shuffle(cards));
  }

//The newly generated deck gets randomly shuffled by the Fisher-Yates function.
function shuffle(arr) {
    let j, x, i;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = arr[i];
        arr[i] = arr[j];
        arr[j] = x;
    } return arr;
}

//This function splits the randomized deck in half and deals them to the playerHand and computerHand respectively.

function deal(cards) {
  for (let i = 0; i < cards.length; i++) {
    if(i < cards.length / 2) {
    playerHand.push(cards[i]);  
    } else {
    computerHand.push(cards[i]);
    } 
  } return console.log("Let the battle commence!");
}

//This is the gameplay logic that is triggered by a click on the player's hand. First, we move the top card in the hand to the gameBoard. Next we run through these logical statements. Whichever player wins gets the cards pushed to their deck array.

function playRound() {
  //checks for a win condition first anytime the Player deck button is pushed
  if ((playerHand.length + playerDeck.length) == 0) {
    return console.log("Player wins the war");
  } else if ((computerHand.length + computerDeck.length) == 0) {
    return console.log("Computer wins the war");
  } else {
    //this draws a player card and moves it to the gameBoard
      gameBoardPlayer.push(playerHand.shift());
      gameBoardComp.push(computerHand.shift());
      console.log(`playerBoard`, gameBoardPlayer, `computerBoard`, gameBoardComp)
      compareCards();
  }
}

function compareCards(){
  //player card wins
  if(gameBoardPlayer[gameBoardPlayer.length - 1].val > gameBoardComp[gameBoardComp.length - 1].val){
    playerDeck.push(...gameBoardPlayer);
    gameBoardPlayer = [];
    playerDeck.push(...gameBoardComp);
    gameBoardComp = [];
    // console.log(playerHand)
    console.log('player wins')
    //computer card wins
  } else if(gameBoardPlayer[gameBoardPlayer.length - 1].val < gameBoardComp[gameBoardComp.length - 1].val){
      computerDeck.push(...gameBoardPlayer);
      gameBoardPlayer = [];
      computerDeck.push(...gameBoardComp);
      gameBoardComp = [];
      // console.log(computerHand)
      console.log('computer wins');
  } else {
    console.log('WAR');
    war();
    //this checks if the computer/player hand has reached 0 and sends their deck to their shuffle function if the condition is met.
}
console.log(`PD: ${playerDeck.length} PH: ${playerHand.length} CD: ${computerDeck.length} CH: ${computerHand.length}`);
}

function war(){
  console.log(gameBoardComp[0], gameBoardPlayer[0]);
  gameBoardPlayer.push(playerHand[0], playerHand[1], playerHand[2], playerHand[3]);
  gameBoardComp.push(computerHand[0], computerHand[1], computerHand[2], computerHand[3]);
  console.log(gameBoardComp, gameBoardPlayer)
  compareCards();
}


//To exit game, make some kind of game termination function with "if playerHand.length = 52 => FUNCTION { else if (computerHand.length = 52 => FUNCTION

//Gameplay is working!!!! But there's a lot of redundant code. Try making a compareCards function that can be called from within the playRound and war functions to reduce code. Is there a better way to move objects between arrays?

//Init Page?
