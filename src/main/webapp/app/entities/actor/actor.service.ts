import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IActor } from 'app/shared/model/actor.model';

type EntityResponseType = HttpResponse<IActor>;
type EntityArrayResponseType = HttpResponse<IActor[]>;

@Injectable({ providedIn: 'root' })
export class ActorService {
  public resourceUrl = SERVER_API_URL + 'api/actors';
  public resourceUrlSaveAll = SERVER_API_URL + 'api/actors/all';  

  constructor(protected http: HttpClient) {}

  create(actor: IActor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(actor);
    return this.http
      .post<IActor>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(actor: IActor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(actor);
    return this.http
      .put<IActor>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IActor>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IActor[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(actor: IActor): IActor {
    const copy: IActor = Object.assign({}, actor, {
      birthDate: actor.birthDate && actor.birthDate.isValid() ? actor.birthDate.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.birthDate = res.body.birthDate ? moment(res.body.birthDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((actor: IActor) => {
        actor.birthDate = actor.birthDate ? moment(actor.birthDate) : undefined;
      });
    }
    return res;
  }
  
  createAll(actors: IActor[]): Observable<EntityArrayResponseType> {
    let copies = [];
    let actor;
    for (actor of actors) {
      copies.push(this.convertDateFromClient(actor));
    }
    return this.http
      .post<IActor[]>(this.resourceUrlSaveAll, copies, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }  
}
