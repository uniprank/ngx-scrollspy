import { ElementRef } from '@angular/core';

export interface ScrollObjectInterface {
    id: string;
    scrollElement: string;
    elementRef: ElementRef;
    nativeElement: HTMLElement;
}
