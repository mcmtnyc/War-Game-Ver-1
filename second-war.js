/// Make card class and parameters
const suits = ['clubs', 'spades', 'diamonds', 'hearts']
const ranks = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King']
const scores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

class Card {
  constructor(suit, rank, score) {
    this.suit = [suit]
    this.rank = [rank]
    this.score = [score]
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
fullDeck = []
allCards();

/// Shuffle the deck
shuffledDeck = fullDeck.sort(() => Math.random() - 0.5)

/// Make the players and half decks for the players
class Player {
  constructor(cards) {
    this.cards = cards
    this.drawnCard;
  }
  draw = function () {
    this.drawnCard = this.cards.shift();
  }
}
/// Half decks
const half = Math.ceil(shuffledDeck.length / 2);
const playerOneDeck = shuffledDeck.slice(0, half)
const playerTwoDeck = shuffledDeck.slice(-half)

/// 2 players
let playerOne = new Player(playerOneDeck)
let playerTwo = new Player(playerTwoDeck)

// WAR //
// players draw cards 
/* playerOne.draw();
playerTwo.draw();

console.log(playerOne.drawnCard)
console.log(playerTwo.drawnCard) */
// players place cards on table array

let table = []

// 