import { IMovie } from 'app/shared/model/movie.model';

export interface IDirector {
  id?: number;
  name?: string;
  movies?: IMovie[];
}

export class Director implements IDirector {
  constructor(public id?: number, public name?: string, public movies?: IMovie[]) {}
}
