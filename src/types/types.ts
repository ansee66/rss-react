export interface Species {
  name: string;
  classification: string;
  designation: string;
  average_height: number;
  average_lifespan: number;
  language: string;
  url: string;
}

export interface SpeciesResponse {
  results: Species[];
  count: string | null;
}

export interface SpeciesDetails {
  average_height: string;
  average_lifespan: string;
  classification: string;
  created: string;
  designation: string;
  edited: string;
  eye_colors: string;
  hair_colors: string;
  homeworld: string;
  language: string;
  name: string;
  skin_colors: string;
  url: string;
}
