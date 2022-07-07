import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileLoaderComponent } from './mobile-loader.component';

describe('MobileLoaderComponent', () => {
  let component: MobileLoaderComponent;
  let fixture: ComponentFixture<MobileLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
