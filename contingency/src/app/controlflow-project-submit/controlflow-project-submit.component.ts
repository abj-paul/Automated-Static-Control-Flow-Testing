import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ResultStoreServiceService } from '../services/result-store-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-controlflow-project-submit',
  templateUrl: './controlflow-project-submit.component.html',
  styleUrls: ['./controlflow-project-submit.component.css']
})
export class ControlflowProjectSubmitComponent {
  link : string = "./project-to-test/";

  constructor(private httpClient: HttpClient, private resultStoreService: ResultStoreServiceService, private router: Router ){}

  submitFile(){
    this.httpClient.post<any>("http://localhost:8000/api/v1/code/file", {
      "code_url": this.link
    }).subscribe((result)=>{
      this.resultStoreService.dataFlowFileResult = result;
      this.router.navigate(["controlflow/result/file/metrics"]);
    })
  }

  submitProject(){
    this.httpClient.post<any>("http://localhost:8000/api/v1/code/project", {
      "code_url": this.link
    }).subscribe((result)=>{
      this.resultStoreService.dataFlowFileResult = result;
      this.router.navigate(["controlflow/result/project"]);
    })
  }
}
