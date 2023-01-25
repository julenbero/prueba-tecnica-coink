export interface Characters {
  info: information[];
  results: results[];
}

export class information {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

export class results {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
}
