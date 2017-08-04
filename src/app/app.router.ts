import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NationalComponent } from './national/national.component';
import { LocalComponent } from './local/local.component';
import { CurrentsComponent } from './city/currents/currents.component';
import { ForecastComponent } from './city/forecast/forecast.component';
import { DiscussionComponent } from './city/discussion/discussion.component';
import { TropicsComponent } from './tropics/tropics.component';
import { SevereComponent } from './severe/severe.component';
import { AboutComponent } from './about/about.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'national', component: NationalComponent },
  { path: 'local', component: LocalComponent },
  { path: 'city/:city', component: CurrentsComponent },
  { path: 'city/:city/discussion', component: DiscussionComponent },
  { path: 'city/:city/forecast', component: ForecastComponent },
  { path: 'tropics', component: TropicsComponent },
  { path: 'severe', component: SevereComponent },
  { path: 'about', component: AboutComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRouter {

}
