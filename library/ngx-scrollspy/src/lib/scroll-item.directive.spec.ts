import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScrollItemDirective } from './scroll-item.directive';
import { ScrollSpyDirective } from './scroll-spy.directive';
import { SPY_CONFIG } from './scroll-spy.service';

@Component({
  standalone: true,
  imports: [ScrollItemDirective, ScrollSpyDirective],
  template: `
    <div [uniScrollSpy]="'test-item'">Spy target</div>
    <div [uniScrollItem]="'test-item'">Hello world!</div>
  `
})
class TestComponent {}

describe('ScrollItemDirective', () => {
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
