import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDirector } from 'app/shared/model/director.model';

@Component({
  selector: 'jhi-director-detail',
  templateUrl: './director-detail.component.html'
})
export class DirectorDetailComponent implements OnInit {
  director: IDirector | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ director }) => (this.director = director));
  }

  previousState(): void {
    window.history.back();
  }
}
