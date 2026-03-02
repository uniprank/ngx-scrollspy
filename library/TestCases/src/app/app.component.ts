import { Component, ElementRef, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import * as Stickyfill from 'stickyfilljs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private _host = inject(ElementRef);
  private _router = inject(Router);

  constructor() {
    const path = localStorage.getItem('path');
    if (path) {
      localStorage.removeItem('path');
      this._router.navigate([path]);
    }
  }

  ngOnInit() {
    Stickyfill.add(this._host.nativeElement.querySelector('header'));
  }
}
