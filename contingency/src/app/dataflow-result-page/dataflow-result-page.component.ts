import { Component, OnInit } from '@angular/core';
import { ResultStoreServiceService } from '../services/result-store-service.service';

@Component({
  selector: 'app-dataflow-result-page',
  templateUrl: './dataflow-result-page.component.html',
  styleUrls: ['./dataflow-result-page.component.css']
})
export class DataflowResultPageComponent implements OnInit{
  resultLoaded : any;

  ngOnInit(): void {
    this.resultLoaded = this.resultStoreService.dataFlowFileResult;
    console.log(this.resultLoaded);
  }

  constructor(private resultStoreService: ResultStoreServiceService){}
  
}
