import { useSearchParams } from 'react-router-dom';
import { Species } from '../../types/types';
import { getIdFromUrl } from '../../utils/utils';
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
  const id = getIdFromUrl(url);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (): void => {
    searchParams.set('details', id);
    setSearchParams(searchParams);
  };

  return (
    <li className="card" onClick={handleClick}>
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
    </li>
  );
};

export default Card;
