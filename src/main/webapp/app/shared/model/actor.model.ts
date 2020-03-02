import { Moment } from 'moment';
import { IMovie } from 'app/shared/model/movie.model';

export interface IActor {
  id?: number;
  name?: string;
  birthDate?: Moment;
  height?: number;
  movies?: IMovie[];
}

export class Actor implements IActor {
  constructor(public id?: number, public name?: string, public birthDate?: Moment, public height?: number, public movies?: IMovie[]) {}
}
