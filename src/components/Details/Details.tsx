import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  const [searchParams, setSearchParams] = useSearchParams();
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      getSpeciesDetails(id, triggerError, setIsLoading).then((data) => {
        if (data) setSpecies(data);
      });
    }
  }, [id, triggerError]);

  const closeDetails = useCallback(() => {
    searchParams.delete('details');
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    const handleOutsideClick = (event: Event) => {
      if (species) {
        if (detailsRef.current && event.target instanceof Node) {
          if (!detailsRef.current.contains(event.target)) closeDetails();
        }
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [species, detailsRef, closeDetails]);

  return (
    <div className="details" ref={detailsRef}>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        species && (
          <>
            <button className="details__close" onClick={closeDetails}>
              X
            </button>
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
