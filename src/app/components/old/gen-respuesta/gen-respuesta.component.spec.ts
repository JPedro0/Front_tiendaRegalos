import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenRespuestaComponent } from './gen-respuesta.component';

describe('GenRespuestaComponent', () => {
  let component: GenRespuestaComponent;
  let fixture: ComponentFixture<GenRespuestaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenRespuestaComponent]
    });
    fixture = TestBed.createComponent(GenRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
