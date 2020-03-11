import { Component } from '@angular/core';
import { Papa } from "ngx-papaparse";
import moment from 'moment';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IActor, Actor } from 'app/shared/model/actor.model';
import { ActorService } from './actor.service';

@Component({
  selector: 'jhi-actor-upload',
  templateUrl: './actor-upload.component.html'
})
export class ActorUploadComponent {
  dataList: any[] = [];
  isSaving = false;

  constructor(private papa: Papa, private actorService: ActorService) {}
  
  handleUpload($event: any): void {
    const fileList = $event.srcElement.files;
    this.parseCsvFile(fileList[0]);
  }

  parseCsvFile(file: any): void {
    this.papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      // worker: true,
      complete: result => {
        this.dataList = result.data;
      }
    });
  }
  
  saveAll(): void {
    this.isSaving = true;
    const actors = this.createFromDataList();
    // this.subscribeToSaveAllResponse(this.actorService.createAll(actors));
    for (const actor of actors) {
      if (actor.id !== undefined) {
        this.subscribeToSaveResponse(this.actorService.update(actor));
      } else {
        this.subscribeToSaveResponse(this.actorService.create(actor));
      }     
    }   
  }

  private createFromDataList(): IActor[] {
    const actors: IActor[] = [];
    for (const record of this.dataList) {
      actors.push({
      ...new Actor(),
      id: record.id || null,
      name: record.name || null,
      birthDate: record.birthDate || null,
      height: record.height || null});
    };
    return actors;    
  }
  
  protected subscribeToSaveAllResponse(result: Observable<HttpResponse<IActor[]>>): void {
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

  previousState(): void {
    window.history.back();
  }
  
}
