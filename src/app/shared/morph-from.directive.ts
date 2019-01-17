import { Directive, Input, ElementRef } from '@angular/core';
import { interval, timer } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Directive({
    selector: '[morphFrom]'
})
export class MorphFromDirective {
    private morphed = false;
    private readonly fadeDuration = 200;
    private srcElementRef: ElementRef<HTMLElement>;

    @Input('morphFrom') set srcElement(nativeElement: HTMLElement) {
        this.srcElementRef = new ElementRef<HTMLElement>(nativeElement);
    }
    @Input() set morph(shouldMorph: boolean) {
        this.morphHandler(shouldMorph);
    }

    constructor(private destElementRef: ElementRef<HTMLElement>) {
        destElementRef.nativeElement.classList.add('morph-hidden');

        timer(1500).subscribe(() => this.morphHandler(true));
        timer(3500).subscribe(() => this.morphHandler(false));
    }

    morphHandler(shouldMorph: boolean) {
        if (shouldMorph && !this.morphed) {
            this.morphElements();
            this.morphed = true;
        } else if (!shouldMorph && this.morphed) {
            this.unmorphElements();
            this.morphed = false;
        }
    }

    unmorphElements() {
        const morphTimer = timer(0, 200).pipe(takeWhile(step => step <= 5));

        morphTimer.subscribe(
            step => {
                switch (step) {
                    case 1:
                        this.fadeOutContents(this.destElementRef);
                        break;
                    case 2:
                        // move destelement back
                        this.setDestElementStylesToSrcElement();
                        break;
                    case 3:
                        // do nothing; transition lasts 400ms, 2 steps
                        break;
                    case 4:
                        // show srcelement and fade destelement out
                        this.srcElementRef.nativeElement.classList.remove('morph-hidden');
                        this.destElementRef.nativeElement.classList.add('fade-out-fast');

                        break;
                    case 5:
                        this.fadeInContents(this.srcElementRef);
                        break;
                }
            }
        );
    }

    morphElements() {
        const morphTimer = timer(0, 200).pipe(takeWhile(step => step <= 5));

        morphTimer.subscribe(
            step => {
                switch (step) {
                    case 1:
                        // set contents hidden so it's just the bg that fades in
                        this.setContentsHidden(this.destElementRef);
                        // set to be identical to srcelement
                        this.setDestElementStylesToSrcElement();
                        // fade in
                        this.fadeOutContents(this.srcElementRef);
                        this.destElementRef.nativeElement.classList.add('fade-in-fast');
                        break;
                    case 2:
                        // hide src and set dest to transition
                        this.srcElementRef.nativeElement.classList.add('morph-hidden');
                        this.destElementRef.nativeElement.classList.add('morphable');

                        // move destelement to where it goes
                        this.destElementRef.nativeElement.removeAttribute('style');

                        // cleanup classes
                        this.destElementRef.nativeElement.classList.remove('fade-in-fast');
                        this.destElementRef.nativeElement.classList.remove('morph-hidden');
                        break;
                    case 3:
                        // do nothing; transition lasts 400ms, 2 steps
                        break;
                    case 4:
                        this.fadeInContents(this.destElementRef);
                        break;
                    case 5:
                        // cleanup
                        this.resetContents(this.destElementRef);
                        break;
                }
            }
        );
    }

    private setDestElementStylesToSrcElement() {
        this.destElementRef.nativeElement.setAttribute(
            'style',
            `left: ${this.srcElementRef.nativeElement.offsetLeft}px;
            top: ${this.srcElementRef.nativeElement.offsetTop}px;
            width: ${this.srcElementRef.nativeElement.offsetWidth}px;
            height: ${this.srcElementRef.nativeElement.offsetHeight}px;`
        );
    }

    setContentsHidden(el: ElementRef<HTMLElement>) {
        const children = Array.from(el.nativeElement.children);

        // fade out contents while leaving background
        children.forEach(child => {
            child.classList.add('morph-hidden');
        });
    }
    resetContents(el: ElementRef<HTMLElement>) {
        const children = Array.from(el.nativeElement.children);

        // fade out contents while leaving background
        children.forEach(child => {
            child.classList.remove('morph-hidden');
            child.classList.remove('fade-in-fast');
            child.classList.remove('fade-out-fast');
        });
    }
    fadeOutContents(el: ElementRef<HTMLElement>) {
        const children = Array.from(el.nativeElement.children);

        // fade out contents while leaving background
        children.forEach(child => {
            child.classList.remove('fade-in-fast');
            child.classList.add('fade-out-fast');
        });
    }
    fadeInContents(el: ElementRef<HTMLElement>) {
        const children = Array.from(el.nativeElement.children);

        // fade in contents while leaving background
        children.forEach(child => {
            child.classList.remove('fade-out-fast');
            child.classList.add('fade-in-fast');
        });
    }
}
