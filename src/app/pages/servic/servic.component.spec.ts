import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicComponent } from './servic.component';

describe('ServicComponent', () => {
  let component: ServicComponent;
  let fixture: ComponentFixture<ServicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
