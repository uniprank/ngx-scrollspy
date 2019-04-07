import { ElementRef } from '@angular/core';

import { ScrollDirectionEnum } from './scroll-direction.enum';

export interface ScrollElementInterface {
    id: string;
    elementRef: ElementRef;
    direction: ScrollDirectionEnum;
    offset: number;
}
