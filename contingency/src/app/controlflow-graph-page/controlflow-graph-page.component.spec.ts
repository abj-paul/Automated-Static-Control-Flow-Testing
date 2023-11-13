import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlflowGraphPageComponent } from './controlflow-graph-page.component';

describe('ControlflowGraphPageComponent', () => {
  let component: ControlflowGraphPageComponent;
  let fixture: ComponentFixture<ControlflowGraphPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlflowGraphPageComponent]
    });
    fixture = TestBed.createComponent(ControlflowGraphPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
