import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ResultStoreServiceService } from '../services/result-store-service.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-dataflow-project-submit',
  templateUrl: './dataflow-project-submit.component.html',
  styleUrls: ['./dataflow-project-submit.component.css']
})
export class DataflowProjectSubmitComponent {
  link : string = "./project-to-test/";

  constructor(private httpClient: HttpClient, private resultStoreService: ResultStoreServiceService, private router: Router ){}

  submitFile(){
    this.httpClient.post<any>("http://localhost:8000/api/v1/dataflow/code/file", {
      "code_url": this.link
    }).subscribe((result)=>{
      this.resultStoreService.dataFlowFileResult = result;
      this.router.navigate(["dataflow/result/file"]);
    })
  }

  submitProject(){
    this.httpClient.post<any>("http://localhost:8000/api/v1/dataflow/code/project", {
      "code_url": this.link
    }).subscribe((result)=>{
      this.resultStoreService.dataFlowFileResult = result;
      this.router.navigate(["dataflow/result/project"]);
    })
  }
}
