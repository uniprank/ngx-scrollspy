import { ElementRef } from '@angular/core';

export interface ScrollObjectInterface {
    id: string;
    stream: string;
    elementRef: ElementRef;
    nativeElement: HTMLElement;
}
