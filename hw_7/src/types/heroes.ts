export type Status = "Alive" | "Dead" | "unknown";

export interface LocationRef {
  name: string;
  url: string;
}

export interface Hero {
  id: number;
  name: string;
  status: Status;
  species: string;
  gender: string;
  image: string;
  origin: LocationRef;
  location: LocationRef;
}

export interface CharactersResponse {
  results: Hero[];
}