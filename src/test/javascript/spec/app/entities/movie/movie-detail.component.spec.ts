import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing'; // routerLink

import { JhipsterDemoTestModule } from '../../../test.module';
import { MovieDetailComponent } from 'app/entities/movie/movie-detail.component';
import { Movie } from 'app/shared/model/movie.model';
import { Director } from 'app/shared/model/director.model';

describe('Component Tests', () => {
  describe('Movie Management Detail Component', () => {
    let comp: MovieDetailComponent;
    let fixture: ComponentFixture<MovieDetailComponent>;
    const movie1 = {
      id: 123,
      name: 'movie123',
      actors: [
        {
          id: 125,
          name: 'actor125'
        },
        {
          id: 126,
          name: 'actor126'
        }
      ],
      director: {
        id: 124,
        name: 'director124'
      }
    };
    const route = ({ data: of({ movie: movie1 }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterDemoTestModule, ReactiveFormsModule, RouterTestingModule],
        declarations: [MovieDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
        schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
      })
        // .overrideTemplate(MovieDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MovieDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load movie on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.movie).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
    
      it("Should have h2 with movie id when existing movie", () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector("h2").textContent).toContain("Movie " + movie1.id);
      });
    
      it("Should have div with director name when existing movie and director", () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector("div#movie-director").textContent).toContain(movie1.director.name);
      });
    
      it("Should have dd with actors names when existing movie and actors", () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector("dd#movie-actors").textContent).toContain(movie1.actors.map(actor => actor.name).join(", "));
      });
    
  });
});
