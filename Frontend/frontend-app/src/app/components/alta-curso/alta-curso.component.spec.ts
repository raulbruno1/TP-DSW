import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaCursoComponent } from './alta-curso.component';

describe('AltaCursoComponent', () => {
  let component: AltaCursoComponent;
  let fixture: ComponentFixture<AltaCursoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AltaCursoComponent]
    });
    fixture = TestBed.createComponent(AltaCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
