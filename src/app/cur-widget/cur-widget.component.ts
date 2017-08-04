import { Component, OnInit, AfterViewInit, OnDestroy, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DarkSkyService } from '../services/web.service';
import { CityService } from '../services/city.service';
import { City } from '../models/city.model';
import { Subscription } from 'rxjs/Subscription';

declare var Skycons: any;

@Component({
  selector: 'app-cur-widget',
  templateUrl: './cur-widget.component.html',
  styleUrls: ['./cur-widget.component.css']
})
export class CurWidgetComponent implements OnInit, AfterViewInit, OnDestroy {

  location: City;
  currentSub: Subscription;
  routerSub: Subscription;
  @ViewChild('skycon') skyconCanvas: ElementRef;
  current: any;
  @Input() data;
  @Input() cityInput

  constructor(private route: ActivatedRoute, private cityService: CityService, private dsService: DarkSkyService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params['city']) {
          this.location = this.cityService.getLocation(params['city']);
          this.currentSub = this.dsService.getCurrents(this.location.lat, this.location.lon).subscribe(
            (res) => {
              this.current = res;
              var skycons = new Skycons({ 'color': '#0f3b65' });
              skycons.add(this.skyconCanvas.nativeElement, this.dsService.getSkycon(res.icon.toUpperCase()));
              skycons.play();
            }
          );
        }
        else if (this.data){
              this.current = this.data;
              var skycons = new Skycons({ 'color': '#0f3b65' });
              skycons.add(this.skyconCanvas.nativeElement, this.dsService.getSkycon(this.data.icon.toUpperCase()));
              skycons.play();
            }
      });


  }

  ngAfterViewInit() {

  }

  castDeg(deg: string) {
    let dir = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"]
    return dir[Math.floor((parseFloat(deg) / 45) + .5) % 8].toString()
  }

  ngOnDestroy() {
    if (this.currentSub) {
      this.currentSub.unsubscribe();
    }
  }

}
