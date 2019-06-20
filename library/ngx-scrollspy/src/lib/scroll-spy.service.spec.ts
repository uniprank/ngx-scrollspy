import { TestBed } from '@angular/core/testing';

import { ScrollSpyService } from './scroll-spy.service';
import { NgxScrollspyModule } from './ngx-scrollspy.module';

describe('ScrollSpyService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgxScrollspyModule.forRoot()],
            providers: [ScrollSpyService]
        });
    });

    it('should be created', () => {
        const service: ScrollSpyService = TestBed.get(ScrollSpyService);
        expect(service).toBeTruthy();
    });
});
