import { Injectable, ElementRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ScrollObjectInterface } from './scroll-object.interface';
import { ScrollElementInterface } from './scroll-element.interface';
import { ScrollDirectionEnum } from './scroll-direction.enum';

const defaultElement = 'window';

@Injectable()
export class ScrollSpyService {
    private _items: { [itemId: string]: ScrollObjectInterface } = {};
    private _scrollElements: { [scrollElementId: string]: ScrollElementInterface } = {};
    private _$scrollElementListener: { [scrollElementId: string]: BehaviorSubject<ScrollObjectInterface> } = {};

    constructor() {
        this._scrollElements[defaultElement] = this._generateElement(
            defaultElement,
            new ElementRef(document.documentElement || document.body),
            ScrollDirectionEnum.vertical
        );
        this._$scrollElementListener[defaultElement] = new BehaviorSubject(null);
        window.addEventListener('scroll', event => {
            this._windowScroll(event);
        });
    }

    private _windowScroll($event) {
        this.updateScrollElement(defaultElement);
    }

    private _generateElement(
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

        this._scrollElements[scrollElementId] = this._generateElement(scrollElementId, elementRef, direction, offset);
        this._$scrollElementListener[scrollElementId] = new BehaviorSubject(null);
    }

    private _checkScrollElementNotExists(scrollElementId: string): void {
        if (this._scrollElements[scrollElementId] != null) {
            throw new Error(`ScrollSpyService: The scroll element with the id [${scrollElementId}] exists.`);
        }
    }

    public setItem(iteamId: string, elementRef: ElementRef, scrollElement = defaultElement): void {
        this._checkItemNotExists(iteamId);
        this._items[iteamId] = this._generateScrollObject(iteamId, elementRef, scrollElement);
    }

    private _checkItemNotExists(iteamId: string): void {
        if (this._items[iteamId] != null) {
            throw new Error(`ScrollSpyService: The scroll item with the id [${iteamId}] exists.`);
        }
    }

    private _generateScrollObject(id: string, elementRef: ElementRef, scrollElement: string): ScrollObjectInterface {
        return {
            id,
            scrollElement: scrollElement,
            elementRef,
            nativeElement: elementRef.nativeElement
        };
    }

    public observe(scrollElementId: string = defaultElement): Observable<ScrollObjectInterface> {
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
        const _currentActiveItem = this._$scrollElementListener[scrollElementId].getValue();

        if (_currentActiveItem == null) {
            if (_nextActiveItem != null) {
                setTimeout(() => this._$scrollElementListener[scrollElementId].next(_nextActiveItem));
            }
        } else if (_nextActiveItem != null) {
            if (_currentActiveItem.id !== _nextActiveItem.id) {
                setTimeout(() => this._$scrollElementListener[scrollElementId].next(_nextActiveItem));
            }
        }
    }

    private _getElementItems(scrollElement: string): Array<ScrollObjectInterface> {
        const _items = [];
        for (let key in this._items) {
            const value = this._items[key];
            if (value.scrollElement === scrollElement) {
                _items.push(value);
            }
        }
        return _items;
    }

    private _getActiveItem(scrollElement: ScrollElementInterface, listOfElements: Array<ScrollObjectInterface>): ScrollObjectInterface {
        const _direction = scrollElement.direction;
        let _scrollObject = null;

        const nativeElement = scrollElement.elementRef.nativeElement;
        listOfElements.forEach(_element => {
            let _active: boolean = false;
            switch (_direction) {
                case ScrollDirectionEnum.horizontal:
                    _active = _element.nativeElement.offsetLeft <= nativeElement.scrollLeft + scrollElement.offset;
                    break;

                default: {
                    _active = _element.nativeElement.offsetTop <= nativeElement.scrollTop + scrollElement.offset;
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
            this._$scrollElementListener[scrollElementId].next(null);
        } else {
            this._checkScrollElementExists(scrollElementId);
            delete this._scrollElements[scrollElementId];
            delete this._$scrollElementListener[scrollElementId];
        }
    }

    public deleteItem(itemId: string): void {
        this._checkItemExists(itemId);
        delete this._items[itemId];
    }

    private _checkItemExists(iteamId: string): void {
        if (this._items[iteamId] == null) {
            throw new Error(`ScrollSpyService: The scroll item with the id [${iteamId}] doesn't exist.`);
        }
    }
}
