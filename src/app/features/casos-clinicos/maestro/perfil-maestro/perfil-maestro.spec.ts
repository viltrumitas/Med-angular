import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilMaestro } from './perfil-maestro';

describe('PerfilMaestro', () => {
  let component: PerfilMaestro;
  let fixture: ComponentFixture<PerfilMaestro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilMaestro],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilMaestro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
