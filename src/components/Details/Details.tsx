import { useEffect, useState } from 'react';
import { TriggerErrorType } from '../ErrorBoundary/ErrorBoundary';
import { getSpeciesDetails } from '../../api/fetchData';
import { SpeciesDetails } from '../../types/types';
import './Details.css';

type PropsType = {
  id: string;
  triggerError: TriggerErrorType;
};

const Details = ({ id, triggerError }: PropsType) => {
  const [isLoading, setIsLoading] = useState(false);
  const [species, setSpecies] = useState<SpeciesDetails | null>(null);

  useEffect(() => {
    if (id) {
      getSpeciesDetails(id, triggerError, setIsLoading).then((data) => {
        if (data) {
          console.log('data', data);
          setSpecies(data);
        }
      });
    }
  }, [id, triggerError]);

  return (
    <div className="details">
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        species && (
          <>
            <h2 className="details__name">Details about {species.name}</h2>

            <dl className="card__properties">
              <dt>Classification</dt>
              <dd>{species.classification}</dd>

              <dt>Designation</dt>
              <dd>{species.designation}</dd>

              <dt>Average height</dt>
              <dd>{species.average_height}</dd>

              <dt>Average lifespan</dt>
              <dd>{species.average_lifespan}</dd>

              <dt>Language</dt>
              <dd>{species.language}</dd>

              <dt>Hair colors</dt>
              <dd>{species.hair_colors}</dd>

              <dt>Eye colors</dt>
              <dd>{species.eye_colors}</dd>

              <dt>Skin colors</dt>
              <dd>{species.skin_colors}</dd>

              <dt>Url</dt>
              <dd>
                <a href={species.url}>link</a>
              </dd>
            </dl>
          </>
        )
      )}
    </div>
  );
};

export default Details;
