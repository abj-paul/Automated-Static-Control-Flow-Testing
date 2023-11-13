import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlflowProjectSubmitComponent } from './controlflow-project-submit.component';

describe('ControlflowProjectSubmitComponent', () => {
  let component: ControlflowProjectSubmitComponent;
  let fixture: ComponentFixture<ControlflowProjectSubmitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlflowProjectSubmitComponent]
    });
    fixture = TestBed.createComponent(ControlflowProjectSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
