import { Component } from '@angular/core';
import { Papa } from "ngx-papaparse";

@Component({
  selector: 'jhi-actor-upload',
  templateUrl: './actor-upload.component.html'
})
export class ActorUploadComponent {
  dataList: any[] = [];

  constructor(private papa: Papa) {}
  
  handleUpload($event: any): void {
    const fileList = $event.srcElement.files;
    this.parseCsvFile(fileList[0]);
  }

  parseCsvFile(file: any): void {
    this.papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      worker: true,
      complete: result => {
        this.completeStatus = "Finished";
        this.dataList = result.data;
      }
    });
  }

}
