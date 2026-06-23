import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSection } from './patient-section';

describe('PatientSection', () => {
  let component: PatientSection;
  let fixture: ComponentFixture<PatientSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientSection],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
