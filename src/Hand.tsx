import React from 'react';
import Card from './Card';

// Define props interface for Hand component
interface HandProps {
  cards: {
    rank: string;
    suit: string;
  }[];
}

const Hand: React.FC<HandProps> = ({ cards }) => {
  return (
    <div className="hand">
      {cards.map((card, index) => (
        <Card key={index} rank={card.rank} suit={card.suit} />
      ))}
    </div>
  );
};

export default Hand;
