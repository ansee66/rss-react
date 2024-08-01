import { TriggerErrorType } from '../components/ErrorBoundary/ErrorBoundary';
import { DATA_URL } from '../constants';
import { SpeciesDetails, SpeciesResponse } from '../types/types';

export const getSpecies = async (
  query: string,
  page: number,
  triggerError: TriggerErrorType,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<SpeciesResponse | undefined> => {
  try {
    setIsLoading(true);
    const response: Response = await fetch(
      `${DATA_URL}?search=${query}&page=${page}`
    );
    const data = await response.json();
    setIsLoading(false);
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) triggerError(error);
  }
};

export const getSpeciesDetails = async (
  id: string,
  triggerError: TriggerErrorType,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<SpeciesDetails | undefined> => {
  try {
    setIsLoading(true);
    const response: Response = await fetch(`${DATA_URL}/${id}`);
    const data = await response.json();
    setIsLoading(false);
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) triggerError(error);
  }
};
