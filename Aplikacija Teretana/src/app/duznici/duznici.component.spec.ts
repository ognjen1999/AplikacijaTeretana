import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuzniciComponent } from './duznici.component';

describe('DuzniciComponent', () => {
  let component: DuzniciComponent;
  let fixture: ComponentFixture<DuzniciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuzniciComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuzniciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
