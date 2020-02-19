import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDirector } from 'app/shared/model/director.model';
import { DirectorService } from './director.service';

@Component({
  templateUrl: './director-delete-dialog.component.html'
})
export class DirectorDeleteDialogComponent {
  director?: IDirector;

  constructor(protected directorService: DirectorService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.directorService.delete(id).subscribe(() => {
      this.eventManager.broadcast('directorListModification');
      this.activeModal.close();
    });
  }
}
