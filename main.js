  /*----- player objects -----*/

const gameBoard = '';

const player = {
  playerHand: [],
  playCard: () => {
    //play card function goes here
  } 
}

const computer = {
  computerHand: '',
  playCard: () => {
    //play card function goes here
  } 
}



// const cards = [];
// for (let suit = 0; suit < 4; suit++) {
//   for(let val = 2; val < 15; val++) {
//     cards.push({
//         suit: suit,
//         val: val
//     })
//     };
// }

//console.log(cards);

// const deck = {
//     hearts: {
//         heartsAce: 14,
//         hearts2: 2,
//         hearts3: 3,
//         hearts4: 4,
//         hearts5: 5,
//         hearts6: 6,
//         hearts7: 7,
//         hearts8: 8,
//         hearts9: 9,
//         hearts10: 10,
//         heartsJack: 11,
//         heartsQueen: 12,
//         heartsKing: 13
//     },
//     diamonds: {
//         diamondsAce: 14,
//         diamonds2: 2,
//         diamonds3: 3,
//         diamonds4: 4,
//         diamonds5: 5,
//         diamonds6: 6,
//         diamonds7: 7,
//         diamonds8: 8,
//         diamonds9: 9,
//         diamonds10: 10,
//         diamondsJack: 11,
//         diamondsQueen: 12,
//         diamondsKing: 13
//     },
//     spades: {
//         spadesAce: 14,
//         spades2: 2,
//         spades3: 3,
//         spades4: 4,
//         spades5: 5,
//         spades6: 6,
//         spades7: 7,
//         spades8: 8,
//         spades9: 9,
//         spades10: 10,
//         spadesJack: 11,
//         spadesQueen: 12,
//         spadesKing: 13
//     },
//     clubs: {
//         clubsAce: 14,
//         clubs2: 2,
//         clubs3: 3,
//         clubs4: 4,
//         clubs5: 5,
//         clubs6: 6,
//         clubs7: 7,
//         clubs8: 8,
//         clubs9: 9,
//         clubs10: 10,
//         clubsJack: 11,
//         clubsQueen: 12,
//         clubsKing: 13
//     }
// }

  /*----- state variables -----*/


  /*----- cached elements  -----*/


  /*----- event listeners -----*/


  /*----- functions -----*/

//This function generates a deck with 4 different suits and 14 different values.
function deck() {
    let cards = [];
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

function deal(cards) {
  for (let i = 0; i < cards.length / 2; i++) {
    player.playerHand.push()
  }
}

console.log(deck());