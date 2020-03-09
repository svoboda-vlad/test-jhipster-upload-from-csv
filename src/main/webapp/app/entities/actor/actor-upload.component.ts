import { Component, OnInit } from '@angular/core';
import { Papa } from "ngx-papaparse";

@Component({
  selector: 'jhi-actor-upload',
  templateUrl: './actor-upload.component.html'
})
export class ActorUploadComponent implements OnInit {

  dataList: any[] = [];

  constructor(private papa: Papa) {}

  ngOnInit(): void { }  
  
  handleUpload($event: any): void {
    const fileList = $event.srcElement.files;
    this.parseCsvFile(fileList[0]);
  }

  parseCsvFile(file: any): void {
    this.papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: "greedy",
      worker: true,
      complete: result => {
        this.dataList = result.data;
        console.log("Parsed:", this.dataList);
      }
    });
  }

}
