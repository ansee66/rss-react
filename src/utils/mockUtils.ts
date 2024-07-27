import { SpeciesDetails, SpeciesResponse } from '../types/types';

export const mockedSpeciesResponse: SpeciesResponse = {
  results: [
    {
      average_height: '180',
      average_lifespan: '120',
      classification: 'mammal',
      designation: 'sentient',
      language: 'Galactic Basic',
      name: 'Human',
      url: 'https://swapi.dev/api/species/1/',
    },
    {
      average_height: 'n/a',
      average_lifespan: 'indefinite',
      classification: 'artificial',
      designation: 'sentient',
      language: 'n/a',
      name: 'Droid',
      url: 'https://swapi.dev/api/species/2/',
    },
  ],
  count: 2,
};

export const mockedEmptySpeciesResponse: SpeciesResponse = {
  results: [],
  count: 0,
};

export const mockedDetailsResponse: SpeciesDetails = {
  average_height: '180',
  average_lifespan: '120',
  classification: 'mammal',
  created: '2014-12-10T13:52:11.567000Z',
  designation: 'sentient',
  edited: '2014-12-20T21:36:42.136000Z',
  eye_colors: 'brown, blue, green, hazel, grey, amber',
  hair_colors: 'blonde, brown, black, red',
  homeworld: 'https://swapi.dev/api/planets/9/',
  language: 'Galactic Basic',
  name: 'Human',
  skin_colors: 'caucasian, black, asian, hispanic',
  url: 'https://swapi.dev/api/species/1/',
};
