import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IMovie, Movie } from 'app/shared/model/movie.model';
import { MovieService } from './movie.service';
import { IActor } from 'app/shared/model/actor.model';
import { ActorService } from 'app/entities/actor/actor.service';
import { IDirector } from 'app/shared/model/director.model';
import { DirectorService } from 'app/entities/director/director.service';

type SelectableEntity = IActor | IDirector;

@Component({
  selector: 'jhi-movie-update',
  templateUrl: './movie-update.component.html'
})
export class MovieUpdateComponent implements OnInit {
  isSaving = false;
  actors: IActor[] = [];
  directors: IDirector[] = [];
  selectedActors: IActor[] = [];
  selectedDirector: IDirector | undefined = undefined;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]]
  });

  constructor(
    protected movieService: MovieService,
    protected actorService: ActorService,
    protected directorService: DirectorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ movie }) => {
      this.updateForm(movie);

      this.actorService.query().subscribe((res: HttpResponse<IActor[]>) => (this.actors = res.body || []));

      this.directorService.query().subscribe((res: HttpResponse<IDirector[]>) => (this.directors = res.body || []));
    });
  }

  updateForm(movie: IMovie): void {
    this.editForm.patchValue({
      id: movie.id,
      name: movie.name
    });
    // this.selectedActors = movie.actors || [];
    this.selectedActors = [{id: 1051, name: 'Sigourney Weaver'}];
    this.selectedDirector = movie.director;
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const movie = this.createFromForm();
    if (movie.id !== undefined) {
      this.subscribeToSaveResponse(this.movieService.update(movie));
    } else {
      this.subscribeToSaveResponse(this.movieService.create(movie));
    }
  }

  private createFromForm(): IMovie {
    return {
      ...new Movie(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      actors: this.selectedActors,
      director: this.selectedDirector
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMovie>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

}
