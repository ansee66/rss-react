import { useEffect, useState } from 'react';
import Card from '../Card/Card';
import { Species } from '../../types/types';
import { TriggerErrorType } from '../ErrorBoundary/ErrorBoundary';
import Pagination from '../Pagination/Pagination';
import './CardList.css';
import { getSpecies } from '../../api/fetchData';

type PropsType = {
  query: string;
  page: number;
  setPage: (page: number) => void;
  triggerError: TriggerErrorType;
};

const CardList = ({ query, page, setPage, triggerError }: PropsType) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState<Species[]>([]);
  const [cardsCount, setCardsCount] = useState<number>(0);

  useEffect(() => {
    getSpecies(query, page, triggerError, setIsLoading).then((data) => {
      if (data) {
        setCards(data.results);
        setCardsCount(Number(data.count));
      }
    });
  }, [query, page, triggerError]);

  return isLoading ? (
    <div className="cards-info">Loading...</div>
  ) : cards.length === 0 ? (
    <div className="cards-info">Nothing was found</div>
  ) : (
    <div>
      <div className="cards">
        {cards.map((card: Species, index: number) => {
          return (
            <Card
              key={index}
              name={card.name}
              classification={card.classification}
              designation={card.designation}
              average_height={card.average_height}
              average_lifespan={card.average_lifespan}
              language={card.language}
              url={card.url}
            />
          );
        })}
      </div>
      <Pagination count={cardsCount} currentPage={page} setPage={setPage} />
    </div>
  );
};

export default CardList;
