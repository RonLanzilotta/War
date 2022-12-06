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
const startGame = document.getElementById("deckInit");
startGame.addEventListener("click", deckInit);

const playCard = document.getElementById("playerHand");
playCard.addEventListener("click", playRound);

let compCard = document.querySelector('#compCard');
let playerCard = document.querySelector('#playerCard')

//Two nested for loops conjure the deck and push each card object to an empty array called "cards".
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

//Takes the shuffled array and splits it in half, dealing the player/comp hands.
function deal(cards) {
  for (let i = 0; i < cards.length; i++) {
    if (i < cards.length / 2) {
      playerHand.push(cards[i]);
    } else {
      computerHand.push(cards[i]);
    }
  }
  cards = [];
  return document.querySelector('.messages').innerText = 'Let the battle commence!';
}

//This initiates the gameplay. First we check for an empty hand or win conditional. 
function playRound() {
  checkHandCheckWin();

  //Moves card images from hand (facedown) to gameboard( face up).
  switchCardImage(playerCard, playerHand[0]);
  // Player and computer push the first cards in their hands to the Game Board.
  playerGameBoard.push(playerHand.shift());

  switchCardImage(compCard, computerHand[0])
  computerGameBoard.push(computerHand.shift());
  
  compareCards();
}

//This compares the cards and pushes all cards on the gameboard to the winner's deck. Gameboard arrays are cleared after each round. If there's a tie, the war function is invoked.
function compareCards() {
  if ( //player card is high
    playerGameBoard[playerGameBoard.length - 1].val >
    computerGameBoard[computerGameBoard.length - 1].val
  ) {
    playerDeck.push(...playerGameBoard);
    playerGameBoard = [];
    playerDeck.push(...computerGameBoard);
    computerGameBoard = [];
    //console.logs left to display game logic. With more time, change these to counters for deck and hand
    console.log(
      `PLAYER: GB`,
      playerGameBoard.length, `H`,
      playerHand.length, `D`,
      playerDeck.length,
      `COMP: GB`,
      computerGameBoard.length, `H`,
      computerHand.length, `D`,
      computerDeck.length
    );
    document.querySelector('.messages').innerText = `Player wins`;
    return;
  } else if (//computer card is high
    playerGameBoard[playerGameBoard.length - 1].val <
    computerGameBoard[computerGameBoard.length - 1].val
  ) {
    computerDeck.push(...playerGameBoard);
    playerGameBoard = [];
    computerDeck.push(...computerGameBoard);
    computerGameBoard = [];
    console.log(
      `PLAYER: GB`,
      playerGameBoard.length, `H`,
      playerHand.length, `D`,
      playerDeck.length,
      `COMP: GB`,
      computerGameBoard.length, `H`,
      computerHand.length, `D`,
      computerDeck.length
    );
    document.querySelector('.messages').innerText = "Computer wins";
    return;
  } else { //otherwise, war!
    //We need to break the play button and re-assign it to the war function in order for WAR to be apparent in browser.
    playCard.removeEventListener('click', playRound)
    playCard.addEventListener("click", war)
    document.querySelector('.messages').innerText = "WAR";
    return;
  }
}

//Initiates a war
function war() {
  //fix Play button now that we are in war function.
  playCard.removeEventListener('click', war)
  playCard.addEventListener("click", playRound);

  // Check if there are enough cards between player/comp hand and deck to conduct war.
  if (playerHand.length + playerDeck.length < 4) {
    playerGameBoard = [];
    computerGameBoard = [];
    document.querySelector('.messages').innerText = "Defeat! Player has lost the war";
    playCard.removeEventListener('click', playRound)
    return;
  }
  if (computerHand.length + computerDeck.length < 4) {
    playerGameBoard = [];
    computerGameBoard = [];
    document.querySelector('.messages').innerText = "Victory! We've won the war";
    playCard.removeEventListener('click', playRound)
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
  //pushes the top card's image to compare during war.
  switchCardImage(playerCard, playerHand[3]);

  //Each player pushes 4 cards to the field with the final card to be compared.
  playerGameBoard.push(
    playerHand[0],
    playerHand[1],
    playerHand[2],
    playerHand[3]
  );
  playerHand.splice(0, 4);

  switchCardImage(compCard, computerHand[3]);

  computerGameBoard.push(
    computerHand[0],
    computerHand[1],
    computerHand[2],
    computerHand[3]
  );
  computerHand.splice(0, 4);

  console.log(
    `PLAYER: GB`,
    playerGameBoard.length, `H`,
    playerHand.length, `D`,
    playerDeck.length,
    `COMP: GB`,
    computerGameBoard.length, `H`,
    computerHand.length, `D`,
    computerDeck.length
  );
  compareCards();
}

//Checks first to see if player/comp has any cards in hand. If there are no cards left between their deck and hand, trigger the win conditional below. Break Play button.
function checkHandCheckWin() {
  if (playerHand.length == 0) {
    if (playerDeck.length == 0) {
      document.querySelector('.messages').innerText = "Defeat! Player has lost the war";
      playCard.removeEventListener('click', playRound)
      return;
    } else {
      //If player/comp has cards in their deck, but not their hand, the deck is shuffled and returned to their hand
      playerHand = shuffle(playerDeck);
      playerDeck = [];
    }
  }
  if (computerHand.length == 0) {
    if (computerDeck.length == 0) {
      document.querySelector('.messages').innerText = "Victory! We've won the war";
      playCard.removeEventListener('click', playRound)
      return;
    } else {
      computerHand = shuffle(computerDeck);
      computerDeck = [];
    }
  }
}

// Turns the JS card objects into a class string that displays the card images on the game board.
function switchCardImage(gbPosition, card) {

  let suitArray = ['d', 'h', 'c', 's']
  let valArray = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A']
  let classString = suitArray[card.suit] + valArray[card.val - 2];

  gbPosition.className = 'card ' + classString;
  }
