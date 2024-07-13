import { useEffect, useState, useCallback } from 'react';
import Card, { CardProps } from '../Card/Card';
import { TriggerErrorType } from '../ErrorBoundary/ErrorBoundary';
import './CardList.css';

type PropsType = {
  query: string;
  triggerError: TriggerErrorType;
};

const CardList = ({ query, triggerError }: PropsType) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    fetch(`https://swapi.dev/api/species?search=${query}`)
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoading(false);
          setCards(data.results);
        },
        (error) => {
          triggerError(error);
        }
      );
  }, [query, triggerError]);

  useEffect(() => {
    fetchData();
  }, [fetchData, query]);

  return isLoading ? (
    <div className="cards-info">Loading...</div>
  ) : cards.length === 0 ? (
    <div className="cards-info">Nothing was found</div>
  ) : (
    <div className="cards">
      {cards.map((card: CardProps, index: number) => {
        return (
          <Card
            key={index}
            name={card.name}
            classification={card.classification}
            designation={card.designation}
            average_height={card.average_height}
            average_lifespan={card.average_lifespan}
            language={card.language}
          />
        );
      })}
    </div>
  );
};

export default CardList;
