import { IActor } from 'app/shared/model/actor.model';
import { IDirector } from 'app/shared/model/director.model';

export interface IMovie {
  id?: number;
  name?: string;
  actors?: IActor[];
  director?: IDirector;
}

export class Movie implements IMovie {
  constructor(public id?: number, public name?: string, public actors?: IActor[], public director?: IDirector) {}
}
