import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlflowProjectResultPageComponent } from './controlflow-project-result-page.component';

describe('ControlflowProjectResultPageComponent', () => {
  let component: ControlflowProjectResultPageComponent;
  let fixture: ComponentFixture<ControlflowProjectResultPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlflowProjectResultPageComponent]
    });
    fixture = TestBed.createComponent(ControlflowProjectResultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
