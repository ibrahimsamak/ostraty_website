import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonatesListComponent } from './donates-list.component';

describe('DonatesListComponent', () => {
  let component: DonatesListComponent;
  let fixture: ComponentFixture<DonatesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonatesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
