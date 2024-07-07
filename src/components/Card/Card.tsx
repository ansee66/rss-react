import React from 'react';
import './Card.css';

type CardProps = {
  name: string;
  classification: string;
  designation: string;
  average_height: number;
  average_lifespan: number;
  language: string;
};

class Card extends React.Component<CardProps> {
  render() {
    return (
      <div className="card">
        <h2 className="card__name">{this.props.name}</h2>
        <dl className="card__properties">
          <dt>Classification</dt>
          <dd>{this.props.classification}</dd>

          <dt>Designation</dt>
          <dd>{this.props.designation}</dd>

          <dt>Average height</dt>
          <dd>{this.props.average_height}</dd>

          <dt>Average lifespan</dt>
          <dd>{this.props.average_lifespan}</dd>

          <dt>Language</dt>
          <dd>{this.props.language}</dd>
        </dl>
      </div>
    );
  }
}

export default Card;
