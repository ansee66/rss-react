import { DATA_URL } from '../constants';

export const getIdFromUrl = (url: string): string => {
  return url.replace(DATA_URL, '').replace(/^\/|\/$/g, '');
};
