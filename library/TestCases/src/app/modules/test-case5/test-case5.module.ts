import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarkdownModule } from 'ngx-markdown';

import { NgxScrollspyModule } from '@uniprank/ngx-scrollspy';

import { TestCase5RoutingModule } from './test-case5-routing.module';
import { TestCase5Component } from './test-case5.component';
import { InnerTestModule } from './modules/inner-test/inner-test.module';

@NgModule({
    declarations: [TestCase5Component],
    imports: [CommonModule, MarkdownModule, TestCase5RoutingModule, NgxScrollspyModule.forRoot(), InnerTestModule]
})
export class TestCase5Module {}
