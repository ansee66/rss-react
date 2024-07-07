import React from 'react';
import Card, { CardProps } from '../Card/Card';
import './CardList.css';

type PropsType = {
  query: string | null;
};

type StateType = {
  isLoaded: boolean;
  cards: CardProps[];
};

class CardList extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      isLoaded: false,
      cards: [],
    };
  }

  componentDidMount() {
    fetch('https://swapi.dev/api/species?page=1')
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          isLoaded: true,
          cards: data.results,
        });
      });
  }

  render() {
    return !this.state.isLoaded ? (
      <div className="cards-loader">Loading...</div>
    ) : (
      <div className="cards">
        {this.state.cards.map((card: CardProps, index: number) => {
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
  }
}

export default CardList;
