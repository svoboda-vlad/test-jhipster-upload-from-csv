import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IActor } from 'app/shared/model/actor.model';
import { ActorService } from './actor.service';
import { ActorDeleteDialogComponent } from './actor-delete-dialog.component';

@Component({
  selector: 'jhi-actor',
  templateUrl: './actor.component.html'
})
export class ActorComponent implements OnInit, OnDestroy {
  actors?: IActor[];
  eventSubscriber?: Subscription;

  constructor(protected actorService: ActorService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.actorService.query().subscribe((res: HttpResponse<IActor[]>) => (this.actors = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInActors();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IActor): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInActors(): void {
    this.eventSubscriber = this.eventManager.subscribe('actorListModification', () => this.loadAll());
  }

  delete(actor: IActor): void {
    const modalRef = this.modalService.open(ActorDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.actor = actor;
  }
}
