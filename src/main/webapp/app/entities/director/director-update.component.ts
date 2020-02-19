import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDirector, Director } from 'app/shared/model/director.model';
import { DirectorService } from './director.service';

@Component({
  selector: 'jhi-director-update',
  templateUrl: './director-update.component.html'
})
export class DirectorUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]]
  });

  constructor(protected directorService: DirectorService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ director }) => {
      this.updateForm(director);
    });
  }

  updateForm(director: IDirector): void {
    this.editForm.patchValue({
      id: director.id,
      name: director.name
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const director = this.createFromForm();
    if (director.id !== undefined) {
      this.subscribeToSaveResponse(this.directorService.update(director));
    } else {
      this.subscribeToSaveResponse(this.directorService.create(director));
    }
  }

  private createFromForm(): IDirector {
    return {
      ...new Director(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDirector>>): void {
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
