import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFirstClipComponent } from './create-first-clip.component';

describe('CreateFirstClipComponent', () => {
  let component: CreateFirstClipComponent;
  let fixture: ComponentFixture<CreateFirstClipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFirstClipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFirstClipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
