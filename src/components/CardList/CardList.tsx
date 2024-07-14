import { useEffect, useState } from 'react';
import Card, { CardProps } from '../Card/Card';
import { TriggerErrorType } from '../ErrorBoundary/ErrorBoundary';
import Pagination from '../Pagination/Pagination';
import './CardList.css';

type PropsType = {
  query: string;
  page: number;
  setPage: (page: number) => void;
  triggerError: TriggerErrorType;
};

const CardList = ({ query, page, setPage, triggerError }: PropsType) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [cardsCount, setCardsCount] = useState(0);

  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      fetch(`https://swapi.dev/api/species?search=${query}&page=${page}`)
        .then((res) => res.json())
        .then(
          (data) => {
            setIsLoading(false);
            setCards(data.results);
            setCardsCount(data.count);
          },
          (error) => {
            triggerError(error);
          }
        );
    };

    fetchData();
  }, [query, page, triggerError]);

  return isLoading ? (
    <div className="cards-info">Loading...</div>
  ) : cards.length === 0 ? (
    <div className="cards-info">Nothing was found</div>
  ) : (
    <>
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
      <Pagination count={cardsCount} currentPage={page} setPage={setPage} />
    </>
  );
};

export default CardList;
