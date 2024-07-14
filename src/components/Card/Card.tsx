import { useSearchParams } from 'react-router-dom';
import { DATA_URL } from '../../api/fetchData';
import { Species } from '../../types/types';
import './Card.css';

const Card = ({
  name,
  classification,
  designation,
  average_height,
  average_lifespan,
  language,
  url,
}: Species) => {
  const id = url.replace(DATA_URL, '').replace(/^\/|\/$/g, '');
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div
      className="card"
      onClick={() => {
        searchParams.set('details', id);
        setSearchParams(searchParams);
      }}
    >
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
