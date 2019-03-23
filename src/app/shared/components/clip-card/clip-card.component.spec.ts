import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipCardComponent } from './clip-card.component';

describe('VideoCardComponent', () => {
    let component: ClipCardComponent;
    let fixture: ComponentFixture<ClipCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ClipCardComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ClipCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
