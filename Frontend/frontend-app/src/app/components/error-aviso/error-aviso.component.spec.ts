import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorAvisoComponent } from './error-aviso.component';

describe('ErrorAvisoComponent', () => {
  let component: ErrorAvisoComponent;
  let fixture: ComponentFixture<ErrorAvisoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorAvisoComponent]
    });
    fixture = TestBed.createComponent(ErrorAvisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
