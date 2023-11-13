import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DataflowProjectSubmitComponent } from './dataflow-project-submit/dataflow-project-submit.component';
import { ControlflowProjectSubmitComponent } from './controlflow-project-submit/controlflow-project-submit.component';
import { DataflowResultPageComponent } from './dataflow-result-page/dataflow-result-page.component';
import { ControlflowResultPageComponent } from './controlflow-result-page/controlflow-result-page.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ControlflowProjectResultPageComponent } from './controlflow-project-result-page/controlflow-project-result-page.component';
import { DataflowProjectResultPageComponent } from './dataflow-project-result-page/dataflow-project-result-page.component';
import { ControlflowGraphPageComponent } from './controlflow-graph-page/controlflow-graph-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    DataflowProjectSubmitComponent,
    ControlflowProjectSubmitComponent,
    DataflowResultPageComponent,
    ControlflowResultPageComponent,
    ControlflowProjectResultPageComponent,
    DataflowProjectResultPageComponent,
    ControlflowGraphPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
