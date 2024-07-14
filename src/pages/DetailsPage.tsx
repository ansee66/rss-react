import { useSearchParams } from 'react-router-dom';
import {
  ErrorBoundaryContext,
  TriggerErrorType,
} from '../components/ErrorBoundary/ErrorBoundary';
import Details from '../components/Details/Details';

const DetailsPage = () => {
  const [searchParams] = useSearchParams();
  const detailsId: string | null = searchParams.get('details');

  return (
    <ErrorBoundaryContext.Consumer>
      {(triggerError: TriggerErrorType) =>
        detailsId && <Details id={detailsId} triggerError={triggerError} />
      }
    </ErrorBoundaryContext.Consumer>
  );
};

export default DetailsPage;
