import { ElementRef } from '@angular/core';

export interface ScrollObjectInterface {
    id: string;
    scrollElementId: string;
    elementRef: ElementRef;
    nativeElement: HTMLElement;
}
