import { Component } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { ScrollSpyDirective } from './scroll-spy.directive';
import { SPY_CONFIG } from './scroll-spy.service';

export function advance(fixture: ComponentFixture<unknown>, tickCount = 1): void {
  tick(tickCount);
  fixture.detectChanges();
}

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

@Component({
  standalone: true,
  imports: [ScrollSpyDirective],
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

  it('should have a div with the id test', () => {
    const compiled: HTMLElement = fixture.debugElement.nativeElement;
    const div = compiled.querySelector('#test');
    expect(div!.id).toContain('test');
  });
});
