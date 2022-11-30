import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidencijaClanarineComponent } from './evidencija-clanarine.component';

describe('EvidencijaClanarineComponent', () => {
  let component: EvidencijaClanarineComponent;
  let fixture: ComponentFixture<EvidencijaClanarineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvidencijaClanarineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvidencijaClanarineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
