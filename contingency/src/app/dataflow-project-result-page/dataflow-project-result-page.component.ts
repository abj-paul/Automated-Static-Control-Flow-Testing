import { Component, OnInit } from '@angular/core';
import { ResultStoreServiceService } from '../services/result-store-service.service';

@Component({
  selector: 'app-dataflow-project-result-page',
  templateUrl: './dataflow-project-result-page.component.html',
  styleUrls: ['./dataflow-project-result-page.component.css']
})
export class DataflowProjectResultPageComponent  implements OnInit{
  resultLoaded : any;

  ngOnInit(): void {
    this.resultLoaded = this.resultStoreService.dataFlowFileResult;
    console.log(this.resultLoaded);
  }

  constructor(private resultStoreService: ResultStoreServiceService){}
}
