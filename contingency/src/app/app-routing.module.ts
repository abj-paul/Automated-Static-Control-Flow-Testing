import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { DataflowProjectSubmitComponent } from './dataflow-project-submit/dataflow-project-submit.component';
import { DataflowResultPageComponent } from './dataflow-result-page/dataflow-result-page.component';
import { DataflowProjectResultPageComponent } from './dataflow-project-result-page/dataflow-project-result-page.component';
import { ControlflowProjectSubmitComponent } from './controlflow-project-submit/controlflow-project-submit.component';
import { ControlflowResultPageComponent } from './controlflow-result-page/controlflow-result-page.component';
import { ControlflowProjectResultPageComponent } from './controlflow-project-result-page/controlflow-project-result-page.component';
import { ControlflowGraphPageComponent } from './controlflow-graph-page/controlflow-graph-page.component';

const routes: Routes = [
  {path: "home", component: HomePageComponent},
  {path: "dataflow",  children: [
    {path: "submit", component: DataflowProjectSubmitComponent},
    {path: "result", children: [
      {path: "file", component: DataflowResultPageComponent},
      {path: "project", component: DataflowProjectResultPageComponent}
    ]},
  ]},
  {path: "controlflow",  children: [
    {path: "submit", component: ControlflowProjectSubmitComponent},
    {path: "result", children: [
      {path: "file", children: [
        {path: "metrics", component: ControlflowResultPageComponent},
        {path: "graph", component: ControlflowGraphPageComponent}
      ]},
      {path: "project", component: ControlflowProjectResultPageComponent}
    ]},
  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
