//An empty array that is used during shuffling.
let cards =[];
//Each player has their hand from which they play cards and their deck from which they shuffle and draw cards when their hand runs out.
let playerHand = [];
let playerDeck = [];
let computerHand = [];
let computerDeck = [];

//This is where cards are played and compared.
let playerGameBoard = [];
let computerGameBoard = [];

//Event Listeners
const playCard = document.getElementById("playerHand");

playCard.addEventListener("click", () => {
  playRound();
});

const startGame = document.getElementById("deckInit");

startGame.addEventListener("click", () => {
  deckInit();
});

// const warRed = document.getElementsByClassName('table');

//Two nested for loops conjures the deck and pushes each card object to an empty array called "cards".
function deckInit() {
  for (let i = 0; i < 4; i++) {
    for (let j = 2; j < 15; j++) {
      cards.push({
        suit: i,
        val: j,
      });
    }
  }
  return deal(shuffle(cards));
}

//This is a Fisher-Yates algorithm that shuffles the cards.
function shuffle(arr) {
  let j, x, i;
  for (i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = arr[i];
    arr[i] = arr[j];
    arr[j] = x;
  }
  return arr;
}

//On game init, takes the shuffled deck and splits it in two. Clears the array "cards" once dealt so that there are no duplicates.
function deal(cards) {
  for (let i = 0; i < cards.length; i++) {
    if (i < cards.length / 2) {
      playerHand.push(cards[i]);
    } else {
      computerHand.push(cards[i]);
    }
  }
  cards = [];
  return console.log("Let the battle commence!");
}

//This initiates the gameplay. First we check for an empty hand or win conditional. Player and computer push the first cards in their hands to the Game Board.
function playRound() {
  checkHandCheckWin();
  playerGameBoard.push(playerHand.shift());
  computerGameBoard.push(computerHand.shift());
  compareCards();
}

//This compares the cards and pushes all cards on the Game Board to the winner's deck. Game Board is cleared after each turn. In case of a tie, the war function is invoked.
function compareCards() {
  if (
    playerGameBoard[playerGameBoard.length - 1].val >
    computerGameBoard[computerGameBoard.length - 1].val
  ) {
    playerDeck.push(...playerGameBoard);
    playerGameBoard = [];
    playerDeck.push(...computerGameBoard);
    computerGameBoard = [];
    console.log(
      `PLAYER:`,
      playerGameBoard.length,
      playerHand.length,
      playerDeck.length,
      `COMP:`,
      computerGameBoard.length,
      computerHand.length,
      computerDeck.length
    );
    console.log(`Player wins.`);
    return;
  } else if (
    playerGameBoard[playerGameBoard.length - 1].val <
    computerGameBoard[computerGameBoard.length - 1].val
  ) {
    computerDeck.push(...playerGameBoard);
    playerGameBoard = [];
    computerDeck.push(...computerGameBoard);
    computerGameBoard = [];
    console.log(
      `PLAYER:`,
      playerGameBoard.length,
      playerHand.length,
      playerDeck.length,
      `COMP:`,
      computerGameBoard.length,
      computerHand.length,
      computerDeck.length
    );
    console.log("computer wins");
    return;
  } else {
    console.log("WAR");
    war();
  }
}

//This initiates a War.
function war() {
  // First we check to see if there are enough cards between the player/comp hand and deck to conduct a war. If not, the game ends with the reset().

  if (playerHand.length + playerDeck.length < 4) {
    playerGameBoard = [];
    computerGameBoard = [];
    console.log("Arrrgh, Player has lost the war!");
    return;
  }
  if (computerHand.length + computerDeck.length < 4) {
    playerGameBoard = [];
    computerGameBoard = [];
    console.log("Victory! We've won the war");
    return;
  }
  //If the player/comp's hand is empty, but there are cards in their deck, shuff
  if (playerHand.length < 4) {
    playerDeck.push(...playerHand);
    playerHand = shuffle(playerDeck);
    playerDeck = [];
    cards = [];
  }
  if (computerHand.length < 4) {
    computerDeck.push(...computerHand);
    computerHand = shuffle(computerDeck);
    computerDeck = [];
    cards = [];
  }

  playerGameBoard.push(
    playerHand[0],
    playerHand[1],
    playerHand[2],
    playerHand[3]
  );
  playerHand.splice(0, 4);

  computerGameBoard.push(
    computerHand[0],
    computerHand[1],
    computerHand[2],
    computerHand[3]
  );
  computerHand.splice(0, 4);

  console.log(
    `PLAYER: `,
    playerGameBoard.length,
    playerHand.length,
    playerDeck.length,

    `COMP:`,
    computerGameBoard.length,
    computerHand.length,
    computerDeck.length
  );
  compareCards();
}

//Checks first to see if player/comp has any cards. If no cards, run reset function.
function checkHandCheckWin() {
  if (playerHand.length == 0) {
    if (playerDeck.length == 0) {
      console.log("Arrrgh, Player has lost the war!");
      return;
    } else {
      //If player/comp has cards in their deck, but not their hand, shuffle deck and return to hand. Clear deck.
      playerHand = shuffle(playerDeck);
      playerDeck = [];
    }
  }
  if (computerHand.length == 0) {
    if (computerDeck.length == 0) {
      console.log("Victory! We've won the war");
      return;
    } else {
      computerHand = shuffle(computerDeck);
      computerDeck = [];
    }
  }
}