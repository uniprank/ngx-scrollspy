import { Component } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollElementDirective } from './scroll-element.directive';
import { SPY_CONFIG } from './scroll-spy.service';

@Component({
  standalone: true,
  imports: [ScrollElementDirective],
  template: ` <div [uniScrollElement]="'test-element'">Hello world!</div> `
})
class TestComponent {}

describe('ScrollElementDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [{ provide: SPY_CONFIG, useValue: { lookAhead: false } }]
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
    expect(div).toBeTruthy();
  });
});
