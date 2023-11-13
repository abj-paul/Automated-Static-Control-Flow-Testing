import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataflowProjectSubmitComponent } from './dataflow-project-submit.component';

describe('DataflowProjectSubmitComponent', () => {
  let component: DataflowProjectSubmitComponent;
  let fixture: ComponentFixture<DataflowProjectSubmitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataflowProjectSubmitComponent]
    });
    fixture = TestBed.createComponent(DataflowProjectSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
