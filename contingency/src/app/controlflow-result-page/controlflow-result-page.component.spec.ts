import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlflowResultPageComponent } from './controlflow-result-page.component';

describe('ControlflowResultPageComponent', () => {
  let component: ControlflowResultPageComponent;
  let fixture: ComponentFixture<ControlflowResultPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlflowResultPageComponent]
    });
    fixture = TestBed.createComponent(ControlflowResultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
