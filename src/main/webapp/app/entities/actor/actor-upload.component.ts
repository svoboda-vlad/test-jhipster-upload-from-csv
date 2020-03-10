import { Component } from '@angular/core';
import { Papa } from "ngx-papaparse";
import moment from 'moment';

import { IActor, Actor } from 'app/shared/model/actor.model';
import { ActorService } from './actor.service';

@Component({
  selector: 'jhi-actor-upload',
  templateUrl: './actor-upload.component.html'
})
export class ActorUploadComponent {
  dataList: any[] = [];

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
    const actors = this.createFromDataList();
    this.actorService.createAll(actors);
  }

  private createFromDataList(): IActor[] {
    const actors: IActor[] = [];  
    for (const record of this.dataList) {
      actors.push(new Actor(null, record.name, moment(record.birthDate), null));
    }
    return actors;
  }  

}
