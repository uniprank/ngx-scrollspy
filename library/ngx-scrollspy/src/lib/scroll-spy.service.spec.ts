import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ScrollSpyService, SPY_CONFIG } from './scroll-spy.service';
import { ScrollDirectionEnum } from './scroll-direction.enum';

/**
 * Creates a detached ElementRef (not in the DOM, isConnected = false).
 * Simulates an element from a destroyed routed component.
 */
function createDetachedElementRef(tag = 'div'): ElementRef {
  return new ElementRef(document.createElement(tag));
}

/**
 * Creates an ElementRef attached to the DOM (isConnected = true).
 * Simulates an element that is currently visible on the page.
 */
function createConnectedElementRef(tag = 'div'): ElementRef {
  const el = document.createElement(tag);
  document.body.appendChild(el);
  return new ElementRef(el);
}

describe('ScrollSpyService', () => {
  let service: ScrollSpyService;
  const connectedElements: HTMLElement[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: SPY_CONFIG, useValue: { lookAhead: false } }]
    });
    service = TestBed.inject(ScrollSpyService);
  });

  afterEach(() => {
    // Clean up any elements we appended to the DOM
    connectedElements.forEach((el) => el.remove());
    connectedElements.length = 0;
  });

  function trackConnected(tag = 'div'): ElementRef {
    const ref = createConnectedElementRef(tag);
    connectedElements.push(ref.nativeElement);
    return ref;
  }

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('re-registration after routing (element no longer in DOM)', () => {
    it('should allow re-registering an item when the old element is detached', () => {
      const oldEl = createDetachedElementRef();
      const newEl = createDetachedElementRef();
      service.setItem('section1', oldEl);
      // Old element is not connected to DOM → re-registration is allowed
      expect(() => service.setItem('section1', newEl)).not.toThrow();
    });

    it('should allow re-registering a scroll element when the old element is detached', () => {
      const oldEl = createDetachedElementRef();
      const newEl = createDetachedElementRef();
      service.setScrollElement('container1', oldEl, ScrollDirectionEnum.vertical);
      // Old element is not connected to DOM → re-registration is allowed
      expect(() => service.setScrollElement('container1', newEl, ScrollDirectionEnum.vertical)).not.toThrow();
    });
  });

  describe('duplicate detection (element still in DOM)', () => {
    it('should throw when registering a duplicate item while the original is still connected', () => {
      const el1 = trackConnected();
      const el2 = trackConnected();
      service.setItem('section1', el1);
      expect(() => service.setItem('section1', el2))
        .toThrowError(/already exists in the DOM/);
    });

    it('should throw when registering a duplicate scroll element while the original is still connected', () => {
      const el1 = trackConnected();
      const el2 = trackConnected();
      service.setScrollElement('container1', el1, ScrollDirectionEnum.vertical);
      expect(() => service.setScrollElement('container1', el2, ScrollDirectionEnum.vertical))
        .toThrowError(/already exists in the DOM/);
    });
  });

  describe('simulate route change lifecycle', () => {
    it('should handle destroy and re-create cycle (route away and back)', () => {
      const el = createDetachedElementRef();

      // Initial route: register items
      service.setItem('section1', el);
      service.setItem('section2', el);

      // Route away: destroy items
      service.deleteItem('section1');
      service.deleteItem('section2');

      // Route back: re-register same items
      expect(() => {
        service.setItem('section1', el);
        service.setItem('section2', el);
      }).not.toThrow();

      // Cleanup
      service.deleteItem('section1');
      service.deleteItem('section2');
    });

    it('should handle re-registration without prior cleanup (race condition)', () => {
      const oldEl = createDetachedElementRef();
      const newEl = createDetachedElementRef();

      // Initial route: register items
      service.setItem('section1', oldEl);

      // Race condition: new component registers before old one is destroyed
      // Old element is detached (not in DOM) → allowed
      expect(() => service.setItem('section1', newEl)).not.toThrow();

      // Late cleanup from old component (should not throw)
      service.deleteItem('section1');
    });
  });
});
