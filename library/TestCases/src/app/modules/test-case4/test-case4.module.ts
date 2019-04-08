import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarkdownModule } from 'ngx-markdown';

import { NgxScrollspyModule } from '@uniprank/ngx-scrollspy';

import { InnerTestModule } from './modules/inner-test/inner-test.module';

import { TestCase4RoutingModule } from './test-case4-routing.module';
import { TestCase4Component } from './test-case4.component';

@NgModule({
    declarations: [TestCase4Component],
    imports: [CommonModule, MarkdownModule, TestCase4RoutingModule, NgxScrollspyModule.forRoot(), InnerTestModule]
})
export class TestCase4Module {}
