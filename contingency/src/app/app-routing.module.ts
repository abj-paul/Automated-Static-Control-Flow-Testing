import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { DataflowProjectSubmitComponent } from './dataflow-project-submit/dataflow-project-submit.component';
import { DataflowResultPageComponent } from './dataflow-result-page/dataflow-result-page.component';

const routes: Routes = [
  {path: "home", component: HomePageComponent},
  {path: "dataflow",  children: [
    {path: "submit", component: DataflowProjectSubmitComponent},
    {path: "result", component: DataflowResultPageComponent}
  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
