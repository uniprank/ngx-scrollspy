import { Injectable, ElementRef, Inject, InjectionToken, Optional } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, Observable, Subject, fromEvent } from 'rxjs';
import { auditTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { ScrollObjectInterface } from './scroll-object.interface';
import { ScrollElementInterface } from './scroll-element.interface';
import { ScrollDirectionEnum } from './scroll-direction.enum';

const defaultElementId = 'window';

export const SPY_CONFIG = new InjectionToken<SpyConfig>(null);

export interface SpyConfig {
    lookAhead?: boolean;
}

@Injectable()
export class ScrollSpyService {
    private _scrollItems: { [itemId: string]: ScrollObjectInterface } = {};
    private _scrollElements: { [scrollElementId: string]: ScrollElementInterface } = {};
    private _$scrollElementListener: { [scrollElementId: string]: BehaviorSubject<ScrollObjectInterface> } = {};

    private _scrollElementListener: { [scrollElementId: string]: ScrollObjectInterface } = {};

    private onStopListening = new Subject();
    private resizeEvents = fromEvent(window, 'resize').pipe(
        auditTime(300),
        takeUntil(this.onStopListening)
    );
    private scrollEvents = fromEvent(window, 'scroll').pipe(
        auditTime(10),
        takeUntil(this.onStopListening)
    );

    private _lookAhead: boolean;

    constructor(@Inject(SPY_CONFIG) @Optional() config: SpyConfig, @Inject(DOCUMENT) private doc: any) {
        this._initScrollElementListener(
            defaultElementId,
            this._generateScrollElement(defaultElementId, new ElementRef(doc.documentElement || doc.body), ScrollDirectionEnum.vertical)
        );

        this.resizeEvents.subscribe(() => this._windowScroll());
        this.scrollEvents.subscribe(() => this._windowScroll());
        this._windowScroll();
        this._lookAhead = config.lookAhead;
    }

    private _initScrollElementListener(scrollElementId: string, scrollElement: ScrollElementInterface): void {
        this._scrollElements[scrollElementId] = scrollElement;
        this._scrollElementListener[scrollElementId] = null;
        this._$scrollElementListener[scrollElementId] = new BehaviorSubject(null);
    }

    private _windowScroll() {
        this.updateScrollElement(defaultElementId);
    }

    private _generateScrollElement(
        scrollElementId: string,
        elementRef: ElementRef,
        direction: ScrollDirectionEnum,
        offset: number = 0
    ): ScrollElementInterface {
        return {
            id: scrollElementId,
            elementRef,
            direction,
            offset
        };
    }

    public setOffset(scrollElementId: string, offset: number): void {
        this._checkScrollElementExists(scrollElementId);
        this._scrollElements[scrollElementId].offset = offset;
    }

    public setScrollElement(scrollElementId: string, elementRef: ElementRef, direction: ScrollDirectionEnum, offset: number = 0): void {
        this._checkScrollElementNotExists(scrollElementId);
        this._initScrollElementListener(scrollElementId, this._generateScrollElement(scrollElementId, elementRef, direction, offset));
    }

    private _checkScrollElementNotExists(scrollElementId: string): void {
        if (this._scrollElements[scrollElementId] != null) {
            throw new Error(`ScrollSpyService: The scroll element with the id [${scrollElementId}] exists.`);
        }
    }

    public setItem(itemId: string, elementRef: ElementRef, scrollElementId = defaultElementId): void {
        this._checkItemNotExists(itemId);
        this._scrollItems[itemId] = this._generateScrollObject(itemId, elementRef, scrollElementId);
        this._setDefaultItem(itemId, scrollElementId);
    }

    private _checkItemNotExists(itemId: string): void {
        if (this._scrollItems[itemId] != null) {
            throw new Error(`ScrollSpyService: The scroll item with the id [${itemId}] exists.`);
        }
    }

    private _generateScrollObject(id: string, elementRef: ElementRef, scrollElementId: string): ScrollObjectInterface {
        return {
            id,
            scrollElementId,
            elementRef,
            nativeElement: elementRef.nativeElement
        };
    }

    private _setDefaultItem(itemId: string, scrollElementId: string): void {
        if (this._lookAhead) return;
        const _value = this._scrollElementListener[scrollElementId];
        if (_value == null) {
            this._setScrollElementListener(scrollElementId, this._scrollItems[itemId]);
        }
    }

    private _setScrollElementListener(scrollElementId: string, scrollObject: ScrollObjectInterface): void {
        this._scrollElementListener[scrollElementId] = scrollObject;
        setTimeout(() => this._$scrollElementListener[scrollElementId].next(scrollObject));
    }

    public changeScrollElement(itemId: string, oldElementId: string, newElementId: string, override = false) {
        this._checkScrollElementExists(oldElementId);
        this._checkScrollElementExists(newElementId);
        this._checkItemExists(itemId);

        const _scrollItem = this._scrollItems[itemId];
        if ((_scrollItem.scrollElementId !== defaultElementId && override) || _scrollItem.scrollElementId === defaultElementId) {
            this._scrollItems[itemId].scrollElementId = newElementId;
        }

        this._setDefaultItem(itemId, newElementId);

        const _oldElements = this._getElementItems(oldElementId);
        if (_oldElements.length > 0) {
            this._setDefaultItem(_oldElements[0].id, oldElementId);
        }
    }

    private _getElementItems(scrollElementId: string): Array<ScrollObjectInterface> {
        const _items = [];
        for (let key in this._scrollItems) {
            const value = this._scrollItems[key];
            if (value.scrollElementId === scrollElementId) {
                _items.push(value);
            }
        }
        return _items;
    }

    private _checkItemExists(itemId: string): void {
        if (this._scrollItems[itemId] == null) {
            throw new Error(`ScrollSpyService: The scroll item with the id [${itemId}] doesn't exist.`);
        }
    }

    public observe(scrollElementId: string = defaultElementId): Observable<ScrollObjectInterface> {
        this._checkScrollElementExists(scrollElementId);
        return this._$scrollElementListener[scrollElementId].asObservable();
    }

    private _checkScrollElementExists(scrollElementId: string): void {
        if (this._scrollElements[scrollElementId] == null) {
            throw new Error(`ScrollSpyService: The scroll element with the id [${scrollElementId}] doesn't exist.`);
        }
    }

    public updateScrollElement(scrollElementId: string): void {
        this._checkScrollElementExists(scrollElementId);

        const _element = this._scrollElements[scrollElementId];
        const _elementItems = this._getElementItems(scrollElementId);

        const _nextActiveItem = this._getActiveItem(_element, _elementItems);
        const _currentActiveItem = this._scrollElementListener[scrollElementId];

        if (_currentActiveItem == null) {
            if (_nextActiveItem != null) {
                this._setScrollElementListener(scrollElementId, _nextActiveItem);
            }
        } else if (_nextActiveItem != null) {
            if (_currentActiveItem.id !== _nextActiveItem.id) {
                this._setScrollElementListener(scrollElementId, _nextActiveItem);
            }
        } else if (_nextActiveItem == null && this._lookAhead) {
            this._setScrollElementListener(scrollElementId, null);
        }
    }

    private _getActiveItem(scrollElement: ScrollElementInterface, listOfElements: Array<ScrollObjectInterface>): ScrollObjectInterface {
        const _direction = scrollElement.direction;
        let _scrollObject = null;

        const nativeElement = scrollElement.elementRef.nativeElement;
        listOfElements.forEach(_element => {
            let _active: boolean = false;
            switch (_direction) {
                case ScrollDirectionEnum.horizontal:
                    const _scrollLeft =
                        scrollElement.id.toLowerCase() === 'window' ? (window && window.pageXOffset) || 0 : nativeElement.scrollLeft;
                    _active = _element.nativeElement.offsetLeft <= _scrollLeft + scrollElement.offset;
                    break;

                default: {
                    const _scrollTop =
                        scrollElement.id.toLowerCase() === 'window' ? (window && window.pageYOffset) || 0 : nativeElement.scrollTop;
                    _active = _element.nativeElement.offsetTop <= _scrollTop + scrollElement.offset;
                }
            }
            if (_active) {
                _scrollObject = _element;
            }
        });
        return _scrollObject;
    }

    public deleteScrollElement(scrollElementId: string): void {
        if (scrollElementId === 'window') {
            this._setScrollElementListener(scrollElementId, null);
        } else {
            this._checkScrollElementExists(scrollElementId);
            delete this._scrollElements[scrollElementId];
            delete this._$scrollElementListener[scrollElementId];
            delete this._scrollElementListener[scrollElementId];
        }
    }

    public deleteItem(itemId: string): void {
        if (this._scrollItems[itemId] != null) {
            delete this._scrollItems[itemId];
        }
    }
}
