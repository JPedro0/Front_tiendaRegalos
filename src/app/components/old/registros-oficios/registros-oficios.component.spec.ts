import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrosOficiosComponent } from './registros-oficios.component';

describe('RegistrosOficiosComponent', () => {
  let component: RegistrosOficiosComponent;
  let fixture: ComponentFixture<RegistrosOficiosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrosOficiosComponent]
    });
    fixture = TestBed.createComponent(RegistrosOficiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
