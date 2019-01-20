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
    private destElementAttrs: { top: number, left: number, width: number, height: number };

    @Input('morphFrom') srcElement: HTMLElement;
    @Input() set morph(shouldMorph: boolean) {
        this.morphHandler(shouldMorph);
    }

    constructor(private renderer: Renderer2, destElementRef: ElementRef<HTMLElement>) {
        this.destElement = destElementRef.nativeElement;

        this.renderer.addClass(this.destElement, 'morph-hidden');
    }

    private morphHandler(shouldMorph: boolean) {
        if (shouldMorph && !this.morphed) {
            this.morphElements();
            this.morphed = true;
        } else if (!shouldMorph && this.morphed) {
            this.unmorphElements();
            this.morphed = false;
        }
    }

    private morphElements() {
        const morphTimer = timer(0, this.fadeDuration).pipe(takeWhile(step => step <= 3));

        this.destElementAttrs = {
            top: this.destElement.offsetTop,
            left: this.destElement.offsetLeft,
            width: this.destElement.offsetWidth,
            height: this.destElement.offsetHeight,
        };

        morphTimer.subscribe(
            step => {
                switch (step) {
                    case 0:
                        // set contents hidden so it's just the bg that fades in
                        this.setContentsHidden(this.destElement);
                        // set to be identical to srcelement
                        this.setDestElementStylesToSrcElement();
                        // fade in
                        this.fadeOutContents(this.srcElement);
                        this.renderer.addClass(this.destElement, 'fade-in-fast');
                        break;
                    case 1:
                        // hide src and set dest to transition
                        this.renderer.addClass(this.srcElement, 'morph-hidden');
                        this.renderer.addClass(this.destElement, 'morphable');

                        // move destelement to where it goes
                        this.setDestElementStyles();

                        // cleanup classes
                        this.renderer.removeClass(this.destElement, 'fade-in-fast');
                        this.renderer.removeClass(this.destElement, 'morph-hidden');
                        break;
                    case 2:
                        this.fadeInContents(this.destElement);
                        break;
                    case 3:
                        // cleanup
                        this.resetContents(this.destElement);
                        break;
                }
            }
        );
    }
    private unmorphElements() {
        const unmorphTimer = timer(0, this.fadeDuration).pipe(takeWhile(step => step <= 3));

        unmorphTimer.subscribe(
            step => {
                switch (step) {
                    case 0:
                        this.fadeOutContents(this.destElement);
                        this.setDestElementStyles();
                        break;
                    case 1:
                        // move destelement back
                        this.setDestElementStylesToSrcElement();
                        break;
                    case 2:
                        // show srcelement and fade destelement out
                        this.renderer.removeClass(this.srcElement, 'morph-hidden');
                        this.renderer.addClass(this.destElement, 'fade-out-fast');
                        break;
                    case 3:
                        this.fadeInContents(this.srcElement);
                        break;
                }
            }
        );
    }

    private setDestElementStylesToSrcElement() {
        this.renderer.setAttribute(
            this.destElement,
            'style',
            `position: absolute;
            left: ${this.srcElement.offsetLeft}px;
            top: ${this.srcElement.offsetTop}px;
            width: ${this.srcElement.offsetWidth}px;
            height: ${this.srcElement.offsetHeight}px;`
        );
    }
    private setDestElementStyles() {
        this.renderer.setAttribute(
            this.destElement,
            'style',
            `position: absolute;
            left: ${this.destElementAttrs.left}px;
            top: ${this.destElementAttrs.top}px;
            width: ${this.destElementAttrs.width}px;
            height: ${this.destElementAttrs.height}px;`
        );
    }

    private setContentsHidden(el: HTMLElement) {
        const children = Array.from(el.children);

        // fade out contents while leaving background
        children.forEach(child => {
            this.renderer.addClass(child, 'morph-hidden');
        });
    }
    private resetContents(el: HTMLElement) {
        const children = Array.from(el.children);

        // fade out contents while leaving background
        children.forEach(child => {
            this.renderer.removeClass(child, 'morph-hidden');
            this.renderer.removeClass(child, 'fade-in-fast');
            this.renderer.removeClass(child, 'fade-out-fast');
        });
    }
    private fadeOutContents(el: HTMLElement) {
        const children = Array.from(el.children);

        // fade out contents while leaving background
        children.forEach(child => {
            this.renderer.removeClass(child, 'fade-in-fast');
            this.renderer.addClass(child, 'fade-out-fast');
        });
    }
    private fadeInContents(el: HTMLElement) {
        const children = Array.from(el.children);

        // fade in contents while leaving background
        children.forEach(child => {
            this.renderer.removeClass(child, 'fade-out-fast');
            this.renderer.addClass(child, 'fade-in-fast');
        });
    }
}

export const MORPH_DURATION_MS = 600;
