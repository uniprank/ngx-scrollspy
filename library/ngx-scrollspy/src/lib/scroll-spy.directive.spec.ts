import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { NgxScrollspyModule } from './ngx-scrollspy.module';

export function advance(fixture: ComponentFixture<any>, tickCount = 1): void {
    tick(tickCount);
    fixture.detectChanges();
}

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

@Component({
    template: `
        <div style="height:3000px;">
            <p style="height:250px;"></p>
            <div [uniScrollSpy]="'test'" style="height:350px;">Hello world!</div>
            <div [uniScrollSpy]="'test2'" style="height:350px;">Hello world 2!</div>
        </div>
    `
})
class TestComponent {}

describe('ScrollSpyDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NgxScrollspyModule.forRoot()],
            declarations: [TestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a div with the id test', () => {
        const compiled: HTMLElement = fixture.debugElement.nativeElement;
        const div = compiled.querySelector('#test');
        expect(div.id).toContain('test');
    });

    // it('should have a directive which is in focus after scrolling', fakeAsync(() => {
    //     const compiled: HTMLElement = fixture.debugElement.nativeElement;
    //     const div = compiled.querySelector('#test');
    //     const div2 = compiled.querySelector('#test');
    //     advance(fixture);

    //     window.scrollTo(0, 700);
    //     var evt = document.createEvent('UIEvents');
    //     evt.initUIEvent('scroll', true, true, window, 1);
    //     window.dispatchEvent(evt);
    //     advance(fixture, 50);

    //     console.log(div, div2);
    //     expect(div.className).toContain('active');

    //     window.scrollTo(0, 1400);
    //     var evt = document.createEvent('UIEvents');
    //     evt.initUIEvent('scroll', true, true, window, 1);
    //     window.dispatchEvent(evt);
    //     advance(fixture, 50);

    //     console.log(div, div2);
    //     expect(div2.className).toContain('active');
    // }));
});
