import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
    { path: 'test-case-1', loadChildren: './modules/test-case1/test-case1.module#TestCase1Module' },
    { path: 'test-case-2', loadChildren: './modules/test-case2/test-case2.module#TestCase2Module' },
    { path: 'test-case-3', loadChildren: './modules/test-case3/test-case3.module#TestCase3Module' },
    { path: 'test-case-4', loadChildren: './modules/test-case4/test-case4.module#TestCase4Module' },
    { path: 'test-case-5', loadChildren: './modules/test-case5/test-case5.module#TestCase5Module' },
    { path: '', redirectTo: '/test-case-1', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
