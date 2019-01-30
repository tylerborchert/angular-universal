import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DummyTitleComponent } from './components/dummy-title/dummy-title.component';
import { ListerComponent } from './components/lister/lister.component';
import { SearchLookupComponent } from './components/search-lookup/search-lookup.component';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found.component';
import { RenderComponent } from './component-render.component';

const routes: Routes = [
  { path: 'dummy-title', component: RenderComponent, data: {comp: DummyTitleComponent, name: 'dummy-title' } },
  { path: 'lister', component: RenderComponent, data: {comp: ListerComponent, name: 'lister' } },
  { path: 'search-lookup', component: RenderComponent, data: {comp: SearchLookupComponent, name: 'search' } },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    DummyTitleComponent,
    ListerComponent,
    SearchLookupComponent,
    RenderComponent
  ],
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: true,
    }),
    HttpClientModule,
    CommonModule
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
