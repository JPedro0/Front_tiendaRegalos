import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPromocionesComponent } from './menu-promociones.component';

describe('MenuPromocionesComponent', () => {
  let component: MenuPromocionesComponent;
  let fixture: ComponentFixture<MenuPromocionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuPromocionesComponent]
    });
    fixture = TestBed.createComponent(MenuPromocionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
