import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZapisDolaskaComponent } from './zapis-dolaska.component';

describe('ZapisDolaskaComponent', () => {
  let component: ZapisDolaskaComponent;
  let fixture: ComponentFixture<ZapisDolaskaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZapisDolaskaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZapisDolaskaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
