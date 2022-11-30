import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidencijaPrometaComponent } from './evidencija-prometa.component';

describe('EvidencijaPrometaComponent', () => {
  let component: EvidencijaPrometaComponent;
  let fixture: ComponentFixture<EvidencijaPrometaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvidencijaPrometaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvidencijaPrometaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
