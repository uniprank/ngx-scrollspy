import { Injectable, ElementRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ScrollObjectInterface } from './scroll-object.interface';
import { ScrollStreamInterface } from './scroll-stream.interface';
import { ScrollDirectionEnum } from './scroll-direction.enum';

const defaultStream = 'window';

@Injectable()
export class ScrollSpyService {
    private _items: { [itemId: string]: ScrollObjectInterface } = {};
    private _streams: { [streamId: string]: ScrollStreamInterface } = {};
    private _$streamListener: { [streamId: string]: BehaviorSubject<ScrollObjectInterface> } = {};

    constructor() {
        this._streams[defaultStream] = this._generateStream(
            defaultStream,
            new ElementRef(document.documentElement || document.body),
            ScrollDirectionEnum.vertical
        );
        this._$streamListener[defaultStream] = new BehaviorSubject(null);
        window.addEventListener('scroll', event => {
            this._windowScroll(event);
        });
    }

    private _windowScroll($event) {
        this.updateStream(defaultStream);
    }

    private _generateStream(
        streamId: string,
        elementRef: ElementRef,
        direction: ScrollDirectionEnum,
        offset: number = 0
    ): ScrollStreamInterface {
        return {
            id: streamId,
            elementRef,
            direction,
            offset
        };
    }

    public setOffset(streamId: string, offset: number): void {
        this._checkStreamExists(streamId);
        this._streams[streamId].offset = offset;
    }

    public setStream(streamId: string, elementRef: ElementRef, direction: ScrollDirectionEnum, offset: number = 0): void {
        this._checkStreamNotExists(streamId);

        this._streams[streamId] = this._generateStream(streamId, elementRef, direction, offset);
        this._$streamListener[streamId] = new BehaviorSubject(null);
    }

    private _checkStreamNotExists(streamId: string): void {
        if (this._streams[streamId] != null) {
            throw new Error(`ScrollSpyService: The stream with the id [${streamId}] exists.`);
        }
    }

    public setItem(iteamId: string, elementRef: ElementRef, stream = defaultStream): void {
        this._checkItemNotExists(iteamId);
        this._items[iteamId] = this._generateScrollObject(iteamId, elementRef, stream);
    }

    private _checkItemNotExists(iteamId: string): void {
        if (this._items[iteamId] != null) {
            throw new Error(`ScrollSpyService: The element with the id [${iteamId}] exists.`);
        }
    }

    private _generateScrollObject(id: string, elementRef: ElementRef, stream: string): ScrollObjectInterface {
        return {
            id,
            stream,
            elementRef,
            nativeElement: elementRef.nativeElement
        };
    }

    public observe(streamId: string = defaultStream): Observable<ScrollObjectInterface> {
        this._checkStreamExists(streamId);
        return this._$streamListener[streamId].asObservable();
    }

    private _checkStreamExists(streamId: string): void {
        if (this._streams[streamId] == null) {
            throw new Error(`ScrollSpyService: The stream with the id [${streamId}] doesn't exist.`);
        }
    }

    public updateStream(streamId: string): void {
        this._checkStreamExists(streamId);

        const _stream = this._streams[streamId];
        const _streamItems = this._getStreamItems(streamId);

        const _nextActiveItem = this._getActiveItem(_stream, _streamItems);
        const _currentActiveItem = this._$streamListener[streamId].getValue();

        if (_currentActiveItem == null) {
            if (_nextActiveItem != null) {
                setTimeout(() => this._$streamListener[streamId].next(_nextActiveItem));
            }
        } else if (_nextActiveItem != null) {
            if (_currentActiveItem.id !== _nextActiveItem.id) {
                setTimeout(() => this._$streamListener[streamId].next(_nextActiveItem));
            }
        }
    }

    private _getStreamItems(stream: string): Array<ScrollObjectInterface> {
        const _items = [];
        for (let key in this._items) {
            const value = this._items[key];
            if (value.stream === stream) {
                _items.push(value);
            }
        }
        return _items;
    }

    private _getActiveItem(streamObject: ScrollStreamInterface, listOfElements: Array<ScrollObjectInterface>): ScrollObjectInterface {
        const _direction = streamObject.direction;
        let _scrollObject = null;

        const nativeStreamElement = streamObject.elementRef.nativeElement;
        listOfElements.forEach(element => {
            let _active: boolean = false;
            switch (_direction) {
                case ScrollDirectionEnum.horizontal:
                    _active = element.nativeElement.offsetLeft <= nativeStreamElement.scrollLeft + streamObject.offset;
                    break;

                default: {
                    _active = element.nativeElement.offsetTop <= nativeStreamElement.scrollTop + streamObject.offset;
                }
            }
            if (_active) {
                _scrollObject = element;
            }
        });
        return _scrollObject;
    }

    public deleteStream(streamId: string): void {
        if (streamId === 'window') {
            this._$streamListener[streamId].next(null);
        } else {
            this._checkStreamExists(streamId);
            delete this._streams[streamId];
            delete this._$streamListener[streamId];
        }
    }

    public deleteItem(itemId: string): void {
        this._checkItemExists(itemId);
        delete this._items[itemId];
    }

    private _checkItemExists(iteamId: string): void {
        if (this._items[iteamId] == null) {
            throw new Error(`ScrollSpyService: The element with the id [${iteamId}] doesn't exist.`);
        }
    }
}
