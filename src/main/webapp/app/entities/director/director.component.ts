import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDirector } from 'app/shared/model/director.model';
import { DirectorService } from './director.service';
import { DirectorDeleteDialogComponent } from './director-delete-dialog.component';

@Component({
  selector: 'jhi-director',
  templateUrl: './director.component.html'
})
export class DirectorComponent implements OnInit, OnDestroy {
  directors?: IDirector[];
  eventSubscriber?: Subscription;

  constructor(protected directorService: DirectorService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.directorService.query().subscribe((res: HttpResponse<IDirector[]>) => (this.directors = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDirectors();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDirector): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDirectors(): void {
    this.eventSubscriber = this.eventManager.subscribe('directorListModification', () => this.loadAll());
  }

  delete(director: IDirector): void {
    const modalRef = this.modalService.open(DirectorDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.director = director;
  }
}
