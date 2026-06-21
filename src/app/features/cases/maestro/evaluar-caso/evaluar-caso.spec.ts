import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluarCaso } from './evaluar-caso';

describe('EvaluarCaso', () => {
  let component: EvaluarCaso;
  let fixture: ComponentFixture<EvaluarCaso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluarCaso],
    }).compileComponents();

    fixture = TestBed.createComponent(EvaluarCaso);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
