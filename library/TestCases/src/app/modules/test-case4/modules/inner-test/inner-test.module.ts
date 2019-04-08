import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InnerTestComponent } from './inner-test.component';

import { NgxScrollspyModule } from '@uniprank/ngx-scrollspy';

@NgModule({
    declarations: [InnerTestComponent],
    imports: [CommonModule, NgxScrollspyModule],
    exports: [InnerTestComponent]
})
export class InnerTestModule {}
