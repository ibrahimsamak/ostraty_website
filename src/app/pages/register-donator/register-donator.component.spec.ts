import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDonatorComponent } from './register-donator.component';

describe('RegisterDonatorComponent', () => {
  let component: RegisterDonatorComponent;
  let fixture: ComponentFixture<RegisterDonatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterDonatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDonatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
