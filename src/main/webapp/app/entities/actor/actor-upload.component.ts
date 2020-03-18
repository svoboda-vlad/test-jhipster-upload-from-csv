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
  actors?: IActor[];

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
    const actors: IActor[] = this.createFromDataList();
    this.subscribeToSaveAllResponse(this.actorService.createAll(actors));
  }

  private createFromDataList(): IActor[] {
    const actors: IActor[] = [];
    for (const record of this.dataList) {
      actors.push({
      ...new Actor(),
      id: record.id,
      name: record.name,
      birthDate: record.birthDate ? moment(record.birthDate) : undefined,
      height: record.height});
    };
    return actors;
  }

  protected subscribeToSaveAllResponse(result: Observable<HttpResponse<IActor[]>>): void {
    result.subscribe(
      (res: HttpResponse<IActor[]>) => { this.onSaveSuccess(res) },
  
      () => this.onSaveError()
    );
  }
  
  protected onSaveSuccess(res: HttpResponse<IActor[]>): void {
    this.actors = res.body || [];
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
