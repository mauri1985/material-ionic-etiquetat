import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioContraseniaComponent } from './cambio-contrasenia.component';

describe('CambioContraseniaComponent', () => {
  let component: CambioContraseniaComponent;
  let fixture: ComponentFixture<CambioContraseniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambioContraseniaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioContraseniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
