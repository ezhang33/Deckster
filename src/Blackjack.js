import React, { useState } from 'react';
import Hand from './Hand';

const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const values = {
  '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
  'J': 10, 'Q': 10, 'K': 10, 'A': 11
};

const createDeck = () => {
  let deck = [];
  suits.forEach(suit => {
    ranks.forEach(rank => {
      deck.push({ rank, suit });
    });
  });
  return deck.sort(() => Math.random() - 0.5);
};

const calculateHandValue = (hand) => {
  let value = 0;
  let numAces = 0;
  hand.forEach(card => {
    value += values[card.rank];
    if (card.rank === 'A') numAces++;
  });
  while (value > 21 && numAces > 0) {
    value -= 10;
    numAces--;
  }
  return value;
};

const Blackjack = () => {
  const [deck, setDeck] = useState(createDeck());
  const [playerHand, setPlayerHand] = useState([deck.pop(), deck.pop()]);
  const [dealerHand, setDealerHand] = useState([deck.pop(), deck.pop()]);
  const [playerValue, setPlayerValue] = useState(calculateHandValue(playerHand));
  const [dealerValue, setDealerValue] = useState(calculateHandValue(dealerHand));
  const [gameOver, setGameOver] = useState(false);
  const [result, setResult] = useState('');

  const hit = () => {
    const newCard = deck.pop();
    const newHand = [...playerHand, newCard];
    const newValue = calculateHandValue(newHand);
    setPlayerHand(newHand);
    setPlayerValue(newValue);

    if (newValue > 21) {
      setGameOver(true);
      setResult('Player Busts! Dealer Wins.');
    }
  };

  const stand = () => {
    while (dealerValue < 17) {
      const newCard = deck.pop();
      const newHand = [...dealerHand, newCard];
      const newValue = calculateHandValue(newHand);
      setDealerHand(newHand);
      setDealerValue(newValue);
    }

    if (dealerValue > 21 || playerValue > dealerValue) {
      setResult('Player Wins!');
    } else if (dealerValue > playerValue) {
      setResult('Dealer Wins!');
    } else {
      setResult('Push!');
    }
    setGameOver(true);
  };

  const resetGame = () => {
    const newDeck = createDeck();
    setDeck(newDeck);
    setPlayerHand([newDeck.pop(), newDeck.pop()]);
    setDealerHand([newDeck.pop(), newDeck.pop()]);
    setPlayerValue(calculateHandValue(playerHand));
    setDealerValue(calculateHandValue(dealerHand));
    setGameOver(false);
    setResult('');
  };

  return (
    <div className="blackjack">
      <h1>Blackjack</h1>
      <h2>Dealer's Hand</h2>
      <Hand cards={dealerHand} />
      <h2>Your Hand</h2>
      <Hand cards={playerHand} />
      <h3>Your Hand Value: {playerValue}</h3>
      {gameOver ? (
        <>
          <h2>{result}</h2>
          <button onClick={resetGame}>Play Again</button>
        </>
      ) : (
        <>
          <button onClick={hit}>Hit</button>
          <button onClick={stand}>Stand</button>
        </>
      )}
    </div>
  );
};

export default Blackjack;
