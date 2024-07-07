import React from 'react';
import Card, { CardProps } from '../Card/Card';
import { TriggerErrorType } from '../ErrorBoundary/ErrorBoundary';
import './CardList.css';

type PropsType = {
  query: string;
  triggerError: TriggerErrorType;
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
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData() {
    this.setState({ isLoaded: false });
    fetch(`https://swapi.dev/api/species?search=${this.props.query}`)
      .then((res) => res.json())
      .then(
        (data) => {
          this.setState({
            isLoaded: true,
            cards: data.results,
          });
        },
        (error) => {
          this.props.triggerError(error);
        }
      );
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps: PropsType) {
    if (prevProps.query !== this.props.query) {
      this.fetchData();
    }
  }

  render() {
    return !this.state.isLoaded ? (
      <div className="cards-info">Loading...</div>
    ) : this.state.cards.length === 0 ? (
      <div className="cards-info">Nothing was found</div>
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
