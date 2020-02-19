import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'movie',
        loadChildren: () => import('./movie/movie.module').then(m => m.JhipsterDemoMovieModule)
      },
      {
        path: 'actor',
        loadChildren: () => import('./actor/actor.module').then(m => m.JhipsterDemoActorModule)
      },
      {
        path: 'director',
        loadChildren: () => import('./director/director.module').then(m => m.JhipsterDemoDirectorModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class JhipsterDemoEntityModule {}
