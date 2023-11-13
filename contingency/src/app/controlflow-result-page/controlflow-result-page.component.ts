import { Component, OnInit } from '@angular/core';
import { ResultStoreServiceService } from '../services/result-store-service.service';

@Component({
  selector: 'app-controlflow-result-page',
  templateUrl: './controlflow-result-page.component.html',
  styleUrls: ['./controlflow-result-page.component.css']
})
export class ControlflowResultPageComponent implements OnInit{
  resultLoaded : any;

  ngOnInit(): void {
    this.resultLoaded = this.resultStoreService.dataFlowFileResult;
    console.log(this.resultLoaded);
  }

  constructor(private resultStoreService: ResultStoreServiceService){}
  
}