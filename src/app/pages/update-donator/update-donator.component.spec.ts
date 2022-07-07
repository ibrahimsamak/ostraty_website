import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDonatorComponent } from './update-donator.component';

describe('UpdateDonatorComponent', () => {
  let component: UpdateDonatorComponent;
  let fixture: ComponentFixture<UpdateDonatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDonatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDonatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
