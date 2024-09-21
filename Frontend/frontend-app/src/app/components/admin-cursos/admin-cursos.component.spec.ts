import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCursosComponent } from './admin-cursos.component';

describe('AdminCursosComponent', () => {
  let component: AdminCursosComponent;
  let fixture: ComponentFixture<AdminCursosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCursosComponent]
    });
    fixture = TestBed.createComponent(AdminCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
