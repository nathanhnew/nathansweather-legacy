import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import { AppRouter } from './app.router';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { MomentModule } from 'angular2-moment';
// NGX Bootstrap Imports
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
// Material Imports
import {MdCardModule} from '@angular/material';
import {MdTabsModule} from '@angular/material';
import {MdDialogModule} from '@angular/material';
// Services & directives
import { ClockService } from './services/clock.service';
import { TropicsService } from './services/tropics.service';
import { SevereService } from './services/severe.service';
import { CityService } from './services/city.service';
import { DarkSkyService, OSMService, NWSService, IpGeoService } from './services/web.service';
import { ClickOutsideDirective } from './directives/nav.directive';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';
// import { Parallax, ParallaxConfig } from 'ngx-parallax';
// ESRI
// import { AngularEsriModule } from 'angular-esri-components';
// import { EsriLoaderModule } from 'angular-esri-loader'
// App Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NationalComponent } from './national/national.component';
import { LocalComponent } from './local/local.component';
import { CurrentsComponent } from './city/currents/currents.component';
import { ForecastComponent } from './city/forecast/forecast.component';
import { DiscussionComponent } from './city/discussion/discussion.component';
import { TropicsComponent } from './tropics/tropics.component';
import { SevereComponent } from './severe/severe.component';
import { AboutComponent } from './about/about.component';
import { CurWidgetComponent } from './cur-widget/cur-widget.component';
import { ForecastModalComponent } from './forecast-modal/forecast-modal.component';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';


@NgModule({
  declarations: [
    ClickOutsideDirective,
    // Parallax,
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    NationalComponent,
    LocalComponent,
    CurrentsComponent,
    ForecastComponent,
    DiscussionComponent,
    TropicsComponent,
    SevereComponent,
    AboutComponent,
    CurWidgetComponent,
    ForecastModalComponent,
    ImageModalComponent,
    LeafletMapComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    BrowserAnimationsModule,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    // AngularEsriModule,
    // EsriLoaderModule,
    AppRouter,
    MomentModule,
    AngularFontAwesomeModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    MdCardModule,
    MdTabsModule,
    MdDialogModule
  ],
  entryComponents: [
    ForecastModalComponent,
    ImageModalComponent
  ],
  providers: [ClockService, TropicsService, CityService, SevereService, DarkSkyService, OSMService, NWSService, IpGeoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
