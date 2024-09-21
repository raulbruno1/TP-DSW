import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnseniaComponent } from './ensenia.component';

describe('EnseniaComponent', () => {
  let component: EnseniaComponent;
  let fixture: ComponentFixture<EnseniaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnseniaComponent]
    });
    fixture = TestBed.createComponent(EnseniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
