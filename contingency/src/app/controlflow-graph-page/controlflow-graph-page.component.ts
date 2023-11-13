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
  astJsons : any[] = [];

  ngOnInit(): void {
    this.resultLoaded = this.resultStoreService.dataFlowFileResult;

    for(let i=0; i<this.resultLoaded.asts.length; i++){
      this.jsonLoadService.loadData(this.resultLoaded.asts[i]).subscribe(data => { //assets/data/7178354814366139251.json'
        this.astJsons.push(data);
        console.log(data);
        console.log("Done loading AST "+(i+1));
      });
    }
  }

  constructor(private resultStoreService: ResultStoreServiceService, private jsonLoadService: JsonLoadService){}
  
}