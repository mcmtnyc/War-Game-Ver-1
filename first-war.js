let warPot = []

/// Define head cards... does this even work for my purposes?
const King = 13
const Queen = 12
const Jack = 11
const Ace = 1

/// Array of all cards, incl head cards
let fullDeck = [King, Queen, Jack, Ace, King, Queen, Jack, Ace, King, Queen, Jack, Ace, King, Queen, Jack, Ace, 2, 3, 4, 5, 6, 7, 8, 9, 10, 2, 3, 4, 5, 6, 7, 8, 9, 10, 2, 3, 4, 5, 6, 7, 8, 9, 10, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/// Shuffle the deck
let shuffledDeck = fullDeck.sort(() => Math.random() - 0.5);
console.log("Here is the shuffled deck: " + shuffledDeck + "!");

/// Split the deck evenly between two players
let half = Math.ceil(shuffledDeck.length / 2);
let playerOne = shuffledDeck.slice(0, half)
let playerTwo = shuffledDeck.slice(-half)
console.log("Here is Player One's hand:" + playerOne)
console.log("Here is Player Two's hand:" + playerTwo)

/// IF there is NO WAR in the round
function winOne() {
  console.log(playerOne[0] + " is greater than " + playerTwo[0] + ". Player One wins the round and takes the cards.");
  /// P1 gets P2s first card.
  playerOne.push(playerTwo[0]);
  /// P2 loses their first card.
  playerTwo.shift();
  console.log("Player One has " + playerOne.length + " cards. Player Two has " + playerTwo.length + " cards.");
  /// Remove these later when everything works.
  console.log(playerOne);
  console.log(playerTwo);
}
function winTwo() {
  console.log(playerTwo[0] + " is greater than " + playerOne[0] + ". Player Two wins the round and takes the cards.");
  playerTwo.push(playerOne[0]);
  playerOne.shift();
  console.log("Player One has " + playerOne.length + " cards. Player Two has " + playerTwo.length + " cards.");
  console.log(playerOne);
  console.log(playerTwo);
}

/// Functions within war();
/// Players put 3 facedown cards on the table plus a face up 4th, the round is played based on the 4th card
function makeWarPot() {
  let playerOnedown = playerOne.splice(0, 4);
  let playerTwodown = playerTwo.splice(0, 4);
  return warPot = playerOnedown.concat(playerTwodown, warPot);
}
/// P1's 4th card was >, so they get all cards in the pot.
function oneTakesWarPot() {
  playerOne = playerOne.concat(warPot);
}
/// P2's 4th card was >, so they get all cards in the pot.
function twoTakesWarPot() {
  playerTwo = playerTwo.concat(warPot)
}
/// Empty warPot, since someone has taken it.
function noPot() {
  return warPot = warPot.splice(0, warPot.length);
}

/// War function
function war() {

  console.log(playerOne[0] + " is the same as " + playerTwo[0] + "!")
  console.log("Yikes, War!")

  /// Check the 4th cards and P1 wins the round.
  if (playerOne[3] > playerTwo[3]) {
    console.log(playerOne[3] + " is greater than " + playerTwo[3] + ". Player One wins the War round and takes the cards.");
    /// Players place their 4 cards each into the pot.
    makeWarPot();
    console.log("The pot has: " + warPot)
    /// P1's card was >, so they add the pot to their hand.
    oneTakesWarPot();
    /// Now that P1 has the pot, delete everything in the pot.
    noPot();
    console.log("Player One takes pot.")
    console.log("Player One has " + playerOne.length + " cards. Player Two has " + playerTwo.length + " cards.");
    return warPot = []
  }
  /// If P1 doesnt win, P2 could win
  else if (playerTwo[3] > playerOne[3]) {
    console.log(playerTwo[3] + " is greater than " + playerOne[3] + ". Player Two wins the War round and takes the cards.");
    /// Players place their 4 cards each into the pot.
    makeWarPot();
    console.log("The pot has: " + warPot)
    /// P1's card was >, so they add the pot to their hand.
    twoTakesWarPot();
    /// Now that P1 has the pot, delete everything in the pot.
    noPot();
    console.log("Player Two takes pot.")
    console.log("Player One has " + playerOne.length + " cards. Player Two has " + playerTwo.length + " cards.");
    return warPot = []
  }
  else (playerOne[3] === playerTwo[3]);
  console.log("Yikes, War again!");
  console.log(playerOne[3] + " is the same as " + playerTwo[3] + "!")
  /// Players place their 4 cards each into the pot.
  makeWarPot();
  console.log("The pot has: " + warPot);
  /// Play War again
  makeWarPot();
  console.log("The pot has: " + warPot);
}

///////// GAME LOOP ///////////
/// While players both have cards, play the game.
while ((playerOne && playerOne.length) && (playerTwo && playerTwo.length)) {

  ///////// ANNOUNCE WINNER ///////////
  if (playerOne.length === 0) {
    console.log("Player Two wins!")
    console.log("Player One has " + playerOne.length + " cards. Player Two has " + playerTwo.length + " cards.");
  }
  if (playerTwo.length === 0) {
    console.log("Player One wins!")
    console.log("Player One has " + playerOne.length + " cards. Player Two has " + playerTwo.length + " cards.");
  }

  /// If cards played are equal, players go to War.
  if (playerOne[0] === playerTwo[0]) {
    console.log(playerOne[0] + " is the same as " + playerTwo[0] + "!")
    console.log("It's time for War!");
    /// If a War is initiated, but someone doesn't have enough cards to 
    if ((playerOne.length < 4) && (playerTwo.length < 4)) {
      console.log("Not enough cards for War!");
      if (playerOne.length === playerTwo.length) {
        console.log("It's a draw!")

        ///////return delete the hand(s)
      };
      if (playerOne.length > playerTwo.length) {
        console.log("Player One wins!")
        return playerTwo = [];
      };
      if (playerOne.length < playerTwo.length) {
        console.log("Player Two wins!")
        return playerOne = [];
      }
    }
    else war();
  }


  /// If Player One's card is worth more, -1 from Player Two to end of Player One's hand
  else if (playerOne[0] > playerTwo[0]) {
    winOne();
  }
  /// If Player Twos card is worth more, -1 from Player Onw to end of Player Two's hand
  else (playerTwo[0] > playerOne[0])
  winTwo();

}
