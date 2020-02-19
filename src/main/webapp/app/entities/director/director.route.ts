import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDirector, Director } from 'app/shared/model/director.model';
import { DirectorService } from './director.service';
import { DirectorComponent } from './director.component';
import { DirectorDetailComponent } from './director-detail.component';
import { DirectorUpdateComponent } from './director-update.component';

@Injectable({ providedIn: 'root' })
export class DirectorResolve implements Resolve<IDirector> {
  constructor(private service: DirectorService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDirector> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((director: HttpResponse<Director>) => {
          if (director.body) {
            return of(director.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Director());
  }
}

export const directorRoute: Routes = [
  {
    path: '',
    component: DirectorComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterDemoApp.director.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DirectorDetailComponent,
    resolve: {
      director: DirectorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterDemoApp.director.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DirectorUpdateComponent,
    resolve: {
      director: DirectorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterDemoApp.director.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DirectorUpdateComponent,
    resolve: {
      director: DirectorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterDemoApp.director.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
