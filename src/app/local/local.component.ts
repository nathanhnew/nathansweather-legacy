import { Component, OnInit, ViewChildren, ElementRef, QueryList, Input, AfterViewChecked } from '@angular/core';
import { OSMService, NWSService, DarkSkyService, IpGeoService } from '../services/web.service';
import { MdDialog } from '@angular/material';
import { ForecastModalComponent } from '../forecast-modal/forecast-modal.component';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
declare var Skycons: any;

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css']
})
export class LocalComponent implements OnInit, AfterViewChecked {

  position = {};
  loc: boolean;
  errorDisp: string;
  geoSub: Subscription;
  ipSub: Subscription;
  nwsSub: Subscription;
  darkSkySub: Subscription;
  currentSub: Subscription;
  currents: any;
  rawForecast: any;
  forecast = [];
  noData: boolean;
  @ViewChildren('skyconForecast') skyconForecastCanvas: QueryList<any>;


  constructor(private osmService: OSMService, private nwsService: NWSService, private dsService: DarkSkyService, private ipGeoService: IpGeoService, public dialog: MdDialog) { }

  ngOnInit() {
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.position['lat'] = position.coords.latitude;
        this.position['lon'] = position.coords.longitude;
        this.geoSub = this.populateData(this.position['lat'], this.position['lon']);

        // this.darkSkySub = this.getPointForecast();
      },
        error => {
          this.ipSub = this.ipGeoService.getLocation().subscribe(
            (data) => {
              this.position['lat'] = data.loc.split(',')[0];
              this.position['lon'] = data.loc.split(',')[1];
              if (data.city !== '') {
                this.position['city'] = data.city
              }
              this.geoSub = this.populateData(this.position['lat'], this.position['lon'])
            },
          (error) => this.noData = true);
          if (this.noData) {
            switch (error.code) {
              case 1:
                console.log('permission denied');
                this.errorDisp = "Please share your location!"
                break;
              case 2:
                console.log('Position Unavailable');
                this.errorDisp = "Unable to find position, please try again."
                break;
              case 3:
                console.log('Timeout');
                this.errorDisp = "An Unknown error occurred."
                break;
            }
          }
        });
    }
  }

  ngAfterViewChecked() {
    if (this.loc) {
      this.errorDisp = null;
    }
  }

  populateData(lat: number, lon: number) {
    return this.osmService
      .reverseGeocode(lat,
      lon)
      .subscribe(data => {
        if ('city' in data['address']) {
          this.position['city'] = data['address']['city'];
        } else if (!this.position['city']) {
          this.position['city'] = data['address']['postcode']
        }
        this.position['state'] = data['address']['state'];
        this.position['name'] = this.position['city'] + ', ' + this.position['state']

        this.nwsSub = this.nwsService.getPointData(this.position['lat'], this.position['lon']).subscribe(
          data => {
            this.position['radar'] = [
              {
                'title': this.position['city'] + ' Radar',
                'url': 'https://radar.weather.gov/lite/N0R/' + data.properties['radarStation'].slice(1) + '_loop.gif'
              }]
          });
        this.currentSub = this.dsService.getCurrents(this.position['lat'], this.position['lon']).subscribe(
          data => {
            this.currents = data;
            this.rawForecast = this.dsService.getForecast(this.position['lat'], this.position['lon'])['data'];
            this.buildForecast()
            this.setSkycons()
            this.loc = true
          }
        );
      });
  }

  buildForecast() {
    this.rawForecast.slice(0, -3).forEach((day, index) => {
      var obj = {}
      obj['time'] = day['time']
      obj['high'] = day['temperatureMax']
      obj['low'] = this.rawForecast[index + 1]['temperatureMin']
      if (index > 0 && day['icon'].split('-').slice(-1)[0] == 'night') {
        var icon = day['icon'].split('-');
        icon[icon.length - 1] = 'day'
        obj['icon'] = icon.join('-')
      } else {
        obj['icon'] = day['icon']
      }
      obj['pops'] = day['precipProbability']
      obj['sunrise'] = day['sunriseTime']
      obj['sunset'] = day['sunsetTime']
      obj['summary'] = day['summary']
      obj['dewpoint'] = day['dewPoint']
      obj['humidity'] = day['humidity']
      this.forecast.push(obj)
    });
  }

  setSkycons() {
    var skycons = new Skycons({ 'color': '#0f3b65' });
    this.skyconForecastCanvas.changes.subscribe((change) => {
      this.skyconForecastCanvas.forEach((val: ElementRef, i) => {
        skycons.add(val.nativeElement, this.dsService.getSkycon(this.forecast[i]['icon'].toUpperCase()));
        skycons.play();
      })
    });
  }

  openDialog(index: number) {
    this.dialog.open(ForecastModalComponent, {
      data: this.forecast[index]
    })
  }

  ngOnDestroy() {
    if (this.geoSub) {
      this.geoSub.unsubscribe();
      this.nwsSub.unsubscribe();
      this.currentSub.unsubscribe();
    }
    if (this.ipSub) {
      this.ipSub.unsubscribe();
    }
  }

}
