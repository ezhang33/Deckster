import React, { useState } from 'react';
import Hand from './Hand';

// Type definitions for card and deck
interface Card {
  rank: string;
  suit: string;
}

const suits: string[] = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const ranks: string[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

const values: { [key: string]: number } = {
  '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
  'J': 10, 'Q': 10, 'K': 10, 'A': 11
};

const createDeck = (): Card[] => {
  let deck: Card[] = [];
  suits.forEach(suit => {
    ranks.forEach(rank => {
      deck.push({ rank, suit });
    });
  });
  return deck.sort(() => Math.random() - 0.5);
};

const calculateHandValue = (hand: Card[]): number => {
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

const Blackjack: React.FC = () => {
  const [deck, setDeck] = useState<Card[]>(createDeck());
  const [playerHand, setPlayerHand] = useState<Card[]>([deck.pop() as Card, deck.pop() as Card]);
  const [dealerHand, setDealerHand] = useState<Card[]>([deck.pop() as Card, deck.pop() as Card]);
  const [playerValue, setPlayerValue] = useState<number>(calculateHandValue(playerHand));
  const [dealerValue, setDealerValue] = useState<number>(calculateHandValue(dealerHand));
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [result, setResult] = useState<string>('');

  const hit = (): void => {
    const newCard = deck.pop() as Card;
    const newHand = [...playerHand, newCard];
    const newValue = calculateHandValue(newHand);
    setPlayerHand(newHand);
    setPlayerValue(newValue);

    if (newValue > 21) {
      setGameOver(true);
      setResult('Player Busts! Dealer Wins.');
    }
  };

  const stand = (): void => {
    let newDealerValue = dealerValue;
    while (newDealerValue < 17) {
      const newCard = deck.pop() as Card;
      const newHand = [...dealerHand, newCard];
      newDealerValue = calculateHandValue(newHand);
      setDealerHand(newHand);
      setDealerValue(newDealerValue);
    }

    if (newDealerValue > 21 || playerValue > newDealerValue) {
      setResult('Player Wins!');
    } else if (newDealerValue > playerValue) {
      setResult('Dealer Wins!');
    } else {
      setResult('Push!');
    }
    setGameOver(true);
  };

  const resetGame = (): void => {
    const newDeck = createDeck();
    const newPlayerHand = [newDeck.pop() as Card, newDeck.pop() as Card];
    const newDealerHand = [newDeck.pop() as Card, newDeck.pop() as Card];
    setDeck(newDeck);
    setPlayerHand(newPlayerHand);
    setDealerHand(newDealerHand);
    setPlayerValue(calculateHandValue(newPlayerHand));
    setDealerValue(calculateHandValue(newDealerHand));
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
