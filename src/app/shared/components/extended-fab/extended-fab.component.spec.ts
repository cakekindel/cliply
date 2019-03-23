import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendedFabComponent } from './extended-fab.component';

describe('ExtendedFabComponent', () => {
  let component: ExtendedFabComponent;
  let fixture: ComponentFixture<ExtendedFabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendedFabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedFabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
