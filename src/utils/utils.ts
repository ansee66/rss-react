import { DATA_URL } from '../api/fetchData';

export const getIdFromUrl = (url: string): string => {
  return url.replace(DATA_URL, '').replace(/^\/|\/$/g, '');
};
