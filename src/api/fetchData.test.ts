/**
 * @jest-environment node
 */

import '@testing-library/jest-dom';
import { DATA_URL } from '../constants';
import { getSpecies, getSpeciesDetails } from './fetchData';
import {
  mockedDetailsResponse,
  mockedSpeciesResponse,
} from '../utils/mockUtils';

describe('fetchData function', () => {
  const query = '';
  const page = 1;
  const id = '1';
  const triggerError = jest.fn();
  const setIsLoading = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch data by getSpecies with the specified params', async () => {
    const mockedFetchResponse = {
      json: async () => mockedSpeciesResponse,
    } as Response;

    jest.spyOn(globalThis, 'fetch').mockResolvedValue(mockedFetchResponse);
    const species = await getSpecies(query, page, triggerError, setIsLoading);

    expect(globalThis.fetch).toHaveBeenCalledWith(
      `${DATA_URL}?search=${query}&page=${page}`
    );
    expect(setIsLoading).toHaveBeenCalled();
    expect(species).toEqual(mockedSpeciesResponse);
  });

  it('should fetch data by getSpeciesDetails with correct id', async () => {
    const mockedFetchResponse = {
      json: async () => mockedDetailsResponse,
    } as Response;

    jest.spyOn(globalThis, 'fetch').mockResolvedValue(mockedFetchResponse);
    const details = await getSpeciesDetails(id, triggerError, setIsLoading);

    expect(globalThis.fetch).toHaveBeenCalledWith(`${DATA_URL}/${id}`);
    expect(setIsLoading).toHaveBeenCalled();
    expect(details).toEqual(mockedDetailsResponse);
  });

  it('should trigger error if fetching fails', async () => {
    jest.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Error'));
    await getSpeciesDetails(id, triggerError, setIsLoading);
    expect(globalThis.fetch).toHaveBeenCalledWith(`${DATA_URL}/${id}`);
    expect(setIsLoading).toHaveBeenCalled();
    expect(triggerError).toHaveBeenCalled();
  });
});
