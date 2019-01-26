import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { DummyTitleComponent } from './components/dummy-title/dummy-title.component';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found.component';
import { RenderComponent } from './component-render.component';

const routes: Routes = [
  { path: 'dummy-title', component: RenderComponent, data: {comp: DummyTitleComponent, name: 'dummy-title' } },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    DummyTitleComponent,
    RenderComponent
  ],
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: true,
    }),
    HttpClientModule
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
