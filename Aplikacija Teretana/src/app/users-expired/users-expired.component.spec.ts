import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersExpiredComponent } from './users-expired.component';

describe('UsersExpiredComponent', () => {
  let component: UsersExpiredComponent;
  let fixture: ComponentFixture<UsersExpiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersExpiredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
