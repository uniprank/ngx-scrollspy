import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestCase3RoutingModule } from './test-case3-routing.module';
import { TestCase3Component } from './test-case3.component';

@NgModule({
    declarations: [TestCase3Component],
    imports: [CommonModule, TestCase3RoutingModule]
})
export class TestCase3Module {}
