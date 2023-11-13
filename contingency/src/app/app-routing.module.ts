import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { DataflowProjectSubmitComponent } from './dataflow-project-submit/dataflow-project-submit.component';
import { DataflowResultPageComponent } from './dataflow-result-page/dataflow-result-page.component';
import { DataflowProjectResultPageComponent } from './dataflow-project-result-page/dataflow-project-result-page.component';

const routes: Routes = [
  {path: "home", component: HomePageComponent},
  {path: "dataflow",  children: [
    {path: "submit", component: DataflowProjectSubmitComponent},
    {path: "result", children: [
      {path: "file", component: DataflowResultPageComponent},
      {path: "project", component: DataflowProjectResultPageComponent}
    ]},
  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
