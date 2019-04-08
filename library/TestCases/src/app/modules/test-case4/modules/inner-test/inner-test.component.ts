import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-inner-test',
    templateUrl: './inner-test.component.html',
    styleUrls: ['./inner-test.component.scss']
})
export class InnerTestComponent implements OnInit {
    @Input() sections: Array<{ id: string; name: string }> = [];

    showSection: Array<{ id: string; name: string; base: boolean }> = [];

    constructor() {}

    ngOnInit() {
        this.showSection = this._generateMenu();
    }

    private _generateMenu(): Array<{ id: string; name: string; base: boolean }> {
        const _sections: Array<{ id: string; name: string; base: boolean }> = [];
        _sections.push({
            id: null,
            name: 'Main category',
            base: true
        });
        for (let i = 1; i <= this.sections.length; i++) {
            if (i % 3 == 0) {
                _sections.push({
                    id: null,
                    name: 'Sub category ' + i / 3,
                    base: true
                });
            }
            _sections.push({
                id: this.sections[i - 1].id,
                name: this.sections[i - 1].name,
                base: false
            });
        }
        return _sections;
    }
}
