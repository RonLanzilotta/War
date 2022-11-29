  /*----- player objects -----*/

const gameBoardPlayer = {};
const gameBoardComp = {};

let cards = [];

let playerHand = [];
let computerHand = [];

  /*----- state variables -----*/


  /*----- cached elements  -----*/


  /*----- event listeners -----*/
  // const playCard = document.getElementById('playerHand');

 

  // playCard.addEventListener('click', () => {
  //   console.log('hi');
  // })




  /*----- functions -----*/

//This function generates a deck with 4 different suits and 14 different values and pushes each as an object into an array.
function deckInit() {
    for (let suit = 0; suit < 4; suit++) {
        for(let val = 2; val < 15; val++) {
          cards.push({
              suit: suit,
              val: val
          })
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

// function playCard() {
//   playerHand[0] = gameBoardPlayer;
//   computerHand[0] = gameBoardComp;
// }


deckInit();
console.log(computerHand);
console.log(playerHand);
