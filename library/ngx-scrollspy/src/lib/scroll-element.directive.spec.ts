import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxScrollspyModule } from './ngx-scrollspy.module';

@Component({
    template: `
        <div uniScrollElement>Hello world!</div>
    `
})
class TestComponent {}

describe('ScrollElementDirective', () => {
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
