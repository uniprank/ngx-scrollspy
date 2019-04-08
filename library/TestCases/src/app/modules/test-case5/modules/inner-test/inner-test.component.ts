import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { ScrollSpyService } from '@uniprank/ngx-scrollspy';

@Component({
    selector: 'app-inner-test',
    templateUrl: './inner-test.component.html',
    styleUrls: ['./inner-test.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InnerTestComponent implements OnInit {
    @Input() sections: Array<{ id: string; name: string }> = [];

    constructor() {}

    ngOnInit() {}
}
