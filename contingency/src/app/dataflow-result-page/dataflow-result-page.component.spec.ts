import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataflowResultPageComponent } from './dataflow-result-page.component';

describe('DataflowResultPageComponent', () => {
  let component: DataflowResultPageComponent;
  let fixture: ComponentFixture<DataflowResultPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataflowResultPageComponent]
    });
    fixture = TestBed.createComponent(DataflowResultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
