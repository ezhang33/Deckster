import React from 'react';
import './Card.css';

// Define props interface for Card component
interface CardProps {
  rank: string;
  suit: string;
}

const Card: React.FC<CardProps> = ({ rank, suit }) => {
  return (
    <div className="card">
      <div className="card-rank">{rank}</div>
      <div className="card-suit">{suit}</div>
    </div>
  );
};

export default Card;
