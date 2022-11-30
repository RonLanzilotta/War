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


  /*----- state variables -----*/


  /*----- cached elements  -----*/


  /*----- event listeners -----*/
  //Connects button(playerHand) to the playRound func
  const playCard = document.getElementById('playerHand');

  playCard.addEventListener('click', () => {
    playRound();
  })
  /*----- functions -----*/

//This function generates a deck with 4 different suits and 14 different values and pushes each as an object into an array.
function deckInit() {
    for (let suit = 0; suit < 4; suit++) {
        for(let val = 2; val < 15; val++) {
          cards.push({
              suit: suit,
              val: val})
          };
     } return shuffle(cards);
  }

//The newly generated deck gets randomly shuffled by the Fisher-Yates function.
function shuffle(cards) {
    let j, x, i;
    for (i = cards.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = cards[i];
        cards[i] = cards[j];
        cards[j] = x;
    } return deal(cards);
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
function compareCards(){
  //player card wins
  if(gameBoardPlayer[gameBoardPlayer.length - 1].val > gameBoardComp[gameBoardComp.length - 1].val){
    playerDeck.push(...gameBoardPlayer);
    gameBoardPlayer.length = 0;
    playerDeck.push(...gameBoardComp);
    gameBoardComp.length = 0;
    console.log('player wins')
    //computer card wins
  } else if(gameBoardPlayer[gameBoardPlayer.length - 1].val < gameBoardComp[gameBoardComp.length - 1].val){
      computerDeck.push(...gameBoardPlayer);
      gameBoardPlayer.length = 0;
      computerDeck.push(...gameBoardComp);
      gameBoardComp.length = 0;
      console.log('computer wins');
  } else { // if it's a tie
    console.log('WAR');
    war();
    //if a hand reaches 0, the deck needs to become the hand
} 
if (playerHand.length = 0) {
  playerHand = playerDeck;
} if (computerHand.length = 0) {
  computerHand = computerDeck;
}console.log(playerDeck.length, playerHand.length, computerDeck.length, computerHand.length, gameBoardPlayer.length, gameBoardComp.length);
}

function playRound() {
  //this draws a player card and moves it to the gameBoard
  gameBoardPlayer.push(playerHand[0]);
  playerHand.splice(0, 1);
  gameBoardComp.push(computerHand[0]);
  computerHand.splice(0, 1);
  compareCards();
}

function war(){
  gameBoardPlayer = gameBoardPlayer.push(playerHand.slice(0, 4));
  playerHand.splice(0, 4);
  gameBardComp = gameBoardComp.push(computerHand.slice(0, 4));
  console.log(gameBoardComp, gameBoardPlayer)
  computerHand.splice(0, 4);
  compareCards();
}
//HYPOTHETICAL SHUFFLE DECK FUNCTION
// function shuffleDeck(cards)
// if(playerHand.length = 0) {
//   shuffle(playerDeck);
//   for(let i = 0; i < playerDeck.length; i++){
//     playerHand.push(playerDeck[i]);
//   }
// } 
// if(computerHand.length = 0) {
//   shuffle(computerDeck);
//   for(let i = 0; i < computerDeck.length; i++){
//     computerHand.push(computerDeck[i]);
//   }} 

//This mimics pushing the button to start the game for now
deckInit();
console.log(playerHand, computerHand)

//To exit game, make some kind of game termination function with "if playerHand.length = 52 => FUNCTION { else if (computerHand.length = 52 => FUNCTION

//Gameplay is working!!!! But there's a lot of redundant code. Try making a compareCards function that can be called from within the playRound and war functions to reduce code. Is there a better way to move objects between arrays?

//Init Page?
