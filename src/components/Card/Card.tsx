import './Card.css';

export interface CardProps {
  name: string;
  classification: string;
  designation: string;
  average_height: number;
  average_lifespan: number;
  language: string;
}

const Card = ({
  name,
  classification,
  designation,
  average_height,
  average_lifespan,
  language,
}: CardProps) => {
  return (
    <div className="card">
      <h2 className="card__name">{name}</h2>
      <dl className="card__properties">
        <dt>Classification</dt>
        <dd>{classification}</dd>

        <dt>Designation</dt>
        <dd>{designation}</dd>

        <dt>Average height</dt>
        <dd>{average_height}</dd>

        <dt>Average lifespan</dt>
        <dd>{average_lifespan}</dd>

        <dt>Language</dt>
        <dd>{language}</dd>
      </dl>
    </div>
  );
};

export default Card;
