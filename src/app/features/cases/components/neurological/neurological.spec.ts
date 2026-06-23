import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Neurological } from './neurological';

describe('Neurological', () => {
  let component: Neurological;
  let fixture: ComponentFixture<Neurological>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Neurological],
    }).compileComponents();

    fixture = TestBed.createComponent(Neurological);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
