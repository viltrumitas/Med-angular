import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralSection } from './general-section';

describe('GeneralSection', () => {
  let component: GeneralSection;
  let fixture: ComponentFixture<GeneralSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralSection],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
