import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSelector } from './student-selector';

describe('StudentSelector', () => {
  let component: StudentSelector;
  let fixture: ComponentFixture<StudentSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
