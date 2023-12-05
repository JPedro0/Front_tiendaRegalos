import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPersonalComponent } from './info-personal.component';

describe('InfoPersonalComponent', () => {
  let component: InfoPersonalComponent;
  let fixture: ComponentFixture<InfoPersonalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoPersonalComponent]
    });
    fixture = TestBed.createComponent(InfoPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
