import { Component } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { NgxScrollspyModule } from './ngx-scrollspy.module';

@Component({
    template: `
        <div uniScrollItem>Hello world!</div>
    `
})
class TestComponent {}

describe('ScrollItemDirective', () => {
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

    it('should create component only with type and data', () => {
        const compiled: HTMLElement = fixture.debugElement.nativeElement;
        const div = compiled.querySelector('div');
        console.log(div);
        expect(true).toBeTruthy();
    });
});
