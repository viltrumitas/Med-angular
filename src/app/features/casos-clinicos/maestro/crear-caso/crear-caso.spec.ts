import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCaso } from './crear-caso';

describe('CrearCaso', () => {
  let component: CrearCaso;
  let fixture: ComponentFixture<CrearCaso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearCaso],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearCaso);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
