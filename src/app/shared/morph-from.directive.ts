import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';
import { timer } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Directive({
    selector: '[morphFrom]'
})
export class MorphFromDirective {
    private morphed = false;
    private readonly fadeDuration = 200;
    private destElement: HTMLElement;

    @Input('morphFrom') srcElement: HTMLElement;
    @Input() set morph(shouldMorph: boolean) {
        this.morphHandler(shouldMorph);
    }

    constructor(private renderer: Renderer2, destElementRef: ElementRef<HTMLElement>) {
        this.destElement = destElementRef.nativeElement;

        this.renderer.addClass(this.destElement, 'morph-hidden');

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
                        this.fadeOutContents(this.destElement);
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
                        this.renderer.removeClass(this.srcElement, 'morph-hidden');
                        this.renderer.addClass(this.destElement, 'fade-out-fast');

                        break;
                    case 5:
                        this.fadeInContents(this.srcElement);
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
                        this.setContentsHidden(this.destElement);
                        // set to be identical to srcelement
                        this.setDestElementStylesToSrcElement();
                        // fade in
                        this.fadeOutContents(this.srcElement);
                        this.renderer.addClass(this.destElement, 'fade-in-fast');
                        break;
                    case 2:
                        // hide src and set dest to transition
                        this.renderer.addClass(this.srcElement, 'morph-hidden');
                        this.renderer.addClass(this.destElement, 'morphable');

                        // move destelement to where it goes
                        this.renderer.removeAttribute(this.destElement, 'style');

                        // cleanup classes
                        this.renderer.removeClass(this.destElement, 'fade-in-fast');
                        this.renderer.removeClass(this.destElement, 'morph-hidden');
                        break;
                    case 3:
                        // do nothing; transition lasts 400ms, 2 steps
                        break;
                    case 4:
                        this.fadeInContents(this.destElement);
                        break;
                    case 5:
                        // cleanup
                        this.resetContents(this.destElement);
                        break;
                }
            }
        );
    }

    private setDestElementStylesToSrcElement() {
        this.renderer.setAttribute(
            this.destElement,
            'style',
            `left: ${this.srcElement.offsetLeft}px;
            top: ${this.srcElement.offsetTop}px;
            width: ${this.srcElement.offsetWidth}px;
            height: ${this.srcElement.offsetHeight}px;`
        );
    }

    setContentsHidden(el: HTMLElement) {
        const children = Array.from(el.children);

        // fade out contents while leaving background
        children.forEach(child => {
            this.renderer.addClass(child, 'morph-hidden');
        });
    }
    resetContents(el: HTMLElement) {
        const children = Array.from(el.children);

        // fade out contents while leaving background
        children.forEach(child => {
            this.renderer.removeClass(child, 'morph-hidden');
            this.renderer.removeClass(child, 'fade-in-fast');
            this.renderer.removeClass(child, 'fade-out-fast');
        });
    }
    fadeOutContents(el: HTMLElement) {
        const children = Array.from(el.children);

        // fade out contents while leaving background
        children.forEach(child => {
            this.renderer.removeClass(child, 'fade-in-fast');
            this.renderer.addClass(child, 'fade-out-fast');
        });
    }
    fadeInContents(el: HTMLElement) {
        const children = Array.from(el.children);

        // fade in contents while leaving background
        children.forEach(child => {
            this.renderer.removeClass(child, 'fade-out-fast');
            this.renderer.addClass(child, 'fade-in-fast');
        });
    }
}
