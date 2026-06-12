import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Caso } from './caso';

describe('Caso', () => {
  let component: Caso;
  let fixture: ComponentFixture<Caso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Caso],
    }).compileComponents();

    fixture = TestBed.createComponent(Caso);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
