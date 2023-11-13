import { Component, OnInit } from '@angular/core';
import { ResultStoreServiceService } from '../services/result-store-service.service';
import { JsonLoadService } from '../services/json-load.service';

@Component({
  selector: 'app-controlflow-graph-page',
  templateUrl: './controlflow-graph-page.component.html',
  styleUrls: ['./controlflow-graph-page.component.css']
})
export class ControlflowGraphPageComponent  implements OnInit{
  resultLoaded : any;
  astJson: any;

  ngOnInit(): void {
    this.resultLoaded = this.resultStoreService.dataFlowFileResult;
    this.jsonLoadService.loadData('assets/data.json').subscribe(data => {
      this.astJson = data;
      console.log(this.astJson);
    });
    console.log(this.resultLoaded);
  }

  constructor(private resultStoreService: ResultStoreServiceService, private jsonLoadService: JsonLoadService){}
  
}