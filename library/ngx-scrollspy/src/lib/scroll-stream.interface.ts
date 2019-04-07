import { ElementRef } from '@angular/core';

import { ScrollDirectionEnum } from './scroll-direction.enum';

export interface ScrollStreamInterface {
    id: string;
    elementRef: ElementRef;
    direction: ScrollDirectionEnum;
    offset: number;
}
