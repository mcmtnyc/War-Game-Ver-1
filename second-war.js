/// Make card class and parameters
const suits = ['clubs', 'spades', 'diamonds', 'hearts']
const ranks = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King']
const scores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
let fullDeck = []

class Card {
  constructor(suit, rank, score) {
    this.suit = suit
    this.rank = rank
    this.score = score
  }
}

/// Make deck of cards w ranks, suits, values
function allCards() {
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < ranks.length; j++) {
      fullDeck.push(new Card(suits[i], ranks[j], scores[j]));
    }
  }
}

allCards();

/// Make the players and half decks for the players
class Player {
  constructor(cards) {
    this.cards = cards
    this.drawnCard;
  }

  draw() {
    this.drawnCard = this.cards.shift();
  }
}

let shuffledDeck = fullDeck.sort(() => Math.random() - 0.5)


/// Half decks
const half = Math.ceil(shuffledDeck.length / 2)
const playerOneDeck = shuffledDeck.slice(0, half)
const playerTwoDeck = shuffledDeck.slice(-half)


/// 2 players
let playerOne = new Player(playerOneDeck)
let playerTwo = new Player(playerTwoDeck)

let table = []

// War Function ///
/// Table has the 1st drawn cards.
// Add the 3 face down cards to the table.
function war() {
  console.log("Players each play 3 face down cards...")
  let playerOnedown = playerOne.cards.splice(0, 3);
  let playerTwodown = playerTwo.cards.splice(0, 3);
  table = table.concat(playerOnedown, playerTwodown)

  // Players draw cards again
  console.log("Both players draw cards again...")
  playerOne.draw();
  playerTwo.draw();

  // Evaluate cards to be different
  if (playerOne.drawnCard.score > playerTwo.drawnCard.score) {
    //Player one takes what is on the table
    console.log(playerOne.drawnCard.rank + " of " + playerOne.drawnCard.suit + " is greater than " + playerTwo.drawnCard.rank + " of " + playerTwo.drawnCard.suit + "!")
    console.log("Table has: ")
    console.log(table)
    playerOne.cards = playerOne.cards.concat(table)
    // No cards on the table
    console.log("Player One has: " + playerOne.cards.length)
    console.log("Player Two's Cards:" + playerTwo.cards)
    /*  console.log("Player Two has: " + playerTwo.cards.length) */
    return table = []
  }
  else if (playerOne.drawnCard.score < playerTwo.drawnCard.score) {
    //Player two takes what is on the table
    console.log(playerTwo.drawnCard.rank + " of " + playerTwo.drawnCard.suit + " is greater than " + playerOne.drawnCard.rank + " of " + playerOne.drawnCard.suit + "!")
    console.log("Table has: ")
    console.log(table)
    playerTwo = playerTwo.cards.concat(table)
    console.log("Player One has: " + playerOne.cards.length)
    console.log(playerTwo.cards)
    /*     console.log("Player Two has: " + playerTwo.cards.length) */
    // No cards on the table
    return table = []
  }

  // Evaluate cards to be the same
  else if (playerOne.drawnCard.score === playerTwo.drawnCard.score) {
    if (playerOne.cards.length < 4 && playerTwo.cards.score < 4) {
      if (playerOne.cards.length > playerTwo.cards.length) {
        //Player one takes game
        return playerTwo.cards = []
      }
      if (playerOne.cards.length < playerTwo.cards.length) {
        //Player two takes game
        return playerOne.score = []
      }
      if (playerOne.drawnCard.length === playerTwo.drawnCard.length) {
        playerOne.cards = []
        playerTwo.cards = []
      }
    }
    war();
  }


}

// GAME LOOP //
// while 
while ((playerOne.cards.length != 0) && (playerTwo.cards.length != 0)) {
  // players draw cards 
  playerOne.draw()
  playerTwo.draw()
  console.log("Player One played: " + playerOne.drawnCard.rank + " of " + playerOne.drawnCard.suit + ". And Player Two played: " + playerTwo.drawnCard.rank + " of " + playerTwo.drawnCard.suit + "!")
  // cards go on the table
  table.push(playerOne.drawnCard, playerTwo.drawnCard)
  console.log("Table has: ")
  console.log(table)
  // Evaluate cards to be different
  if (playerOne.drawnCard.score > playerTwo.drawnCard.score) {
    //Player one takes what is on the table
    console.log(playerOne.drawnCard.rank + " of " + playerOne.drawnCard.suit + " is greater than " + playerTwo.drawnCard.rank + " of " + playerTwo.drawnCard.suit + "!")
    playerOne.cards = playerOne.cards.concat(table)
    console.log("Player One has: " + playerOne.cards.length)
    console.log("Player Two has: " + playerTwo.cards.length)
    // No cards on the table
    table = []
  }
  else if (playerOne.drawnCard.score < playerTwo.drawnCard.score) {
    //Player two takes what is on the table
    console.log(playerTwo.drawnCard.rank + " of " + playerTwo.drawnCard.suit + " is greater than " + playerOne.drawnCard.rank + " of " + playerOne.drawnCard.suit + "!")
    playerTwo.cards = playerTwo.cards.concat(table)
    console.log("Player One has: " + playerOne.cards.length)
    console.log("Player Two has: " + playerTwo.cards.length)
    // No cards on the table
    table = []
  }

  // Evaluate cards to be the same
  if (playerOne.drawnCard.score === playerTwo.drawnCard.score) {
    if (playerOne.cards.length < 4 && playerTwo.cards.score < 4) {
      console.log("There are not enough cards to go to War!")
      if (playerOne.cards.length > playerTwo.cards.length) {
        //Player one takes game
        console.log("... but Player One has more cards...")
        return playerTwo.cards = []
      }
      if (playerOne.cards.length < playerTwo.cards.length) {
        //Player two takes game
        console.log("... but Player Two has more cards...")
        return playerOne.score = []
      }
      else if (playerOne.cards.length === playerTwo.cards.length) {
        playerOne.cards = []
        playerTwo.cards = []
      }
    }
    else war();
    console.log("Time for War!")
  }

}
/// Winner Announcement
if (playerOne.cards.length === 0) {
  console.log("Player One is the Winner of the Game of War.")
}
else if (playerTwo.cards.length === 0) {
  console.log("Player Two is the Winner of the Game of War.")
}
else if (playerOne.cards.length === 0 && playerTwo.cards.length === 0) {
  console.log("The Game ends in a Draw!")
}
