import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataflowProjectResultPageComponent } from './dataflow-project-result-page.component';

describe('DataflowProjectResultPageComponent', () => {
  let component: DataflowProjectResultPageComponent;
  let fixture: ComponentFixture<DataflowProjectResultPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataflowProjectResultPageComponent]
    });
    fixture = TestBed.createComponent(DataflowProjectResultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
