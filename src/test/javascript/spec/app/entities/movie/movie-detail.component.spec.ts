import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing'; // routerLink

import { JhipsterDemoTestModule } from '../../../test.module';
import { MovieDetailComponent } from 'app/entities/movie/movie-detail.component';
import { Movie } from 'app/shared/model/movie.model';

describe('Component Tests', () => {
  describe('Movie Management Detail Component', () => {
    let comp: MovieDetailComponent;
    let fixture: ComponentFixture<MovieDetailComponent>;
    const movieExisting = new Movie(123);
    const route = ({ data: of({ movie: movieExisting }) } as any) as ActivatedRoute;

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
        expect(compiled.querySelector("h2").textContent).toContain("Movie " + movieExisting.id);
      });    
  });
});
