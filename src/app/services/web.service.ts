import { Injectable } from '@angular/core';
import { Http, Jsonp, URLSearchParams, RequestOptions, Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';
declare var Skycons: any;

@Injectable()
export class DarkSkyService {
  token = 'd064e87ad89527652940e04e8c65288a'
  url = 'https://api.darksky.net/forecast/' + this.token + '/'
  lat: string;
  lon: string
  params: string;
  DsData: any;

  skycons = {
    'CLEAR-DAY': Skycons.CLEAR_DAY,
    'CLEAR-NIGHT': Skycons.CLEAR_NIGHT,
    'PARTLY-CLOUDY-DAY': Skycons.PARTLY_CLOUDY_DAY,
    'PARTLY-CLOUDY-NIGHT': Skycons.PARTLY_CLOUDY_NIGHT,
    'CLOUDY': Skycons.CLOUDY,
    'RAIN': Skycons.RAIN,
    'SLEET': Skycons.SLEET,
    'SNOW': Skycons.SNOW,
    'WIND': Skycons.WIND,
    'FOG': Skycons.FOG,
  }

  constructor(private jsonp: Jsonp) { }

  getCurrents(lat: number, lon: number) {
    this.lat = lat.toString()
    this.lon = lon.toString()
    this.params = this.lat.toString() + ',' + this.lon.toString()
    this.params += '?callback=JSONP_CALLBACK'
    const queryUrl = this.url + this.params
    return this.jsonp.get(queryUrl).map(
      (response) => {
        this.DsData = response.json();
        for (let element in this.DsData['currently']) {
          if (typeof this.DsData['currently'][element] == "number") {
            if (element == 'humidity') {
              this.DsData['currently'][element] = this.DsData['currently'][element] * 100
            }
            this.DsData['currently'][element] = Math.round(this.DsData['currently'][element]);
          }
        }
        return this.DsData['currently']
      },
      (error) => console.log(error)
    )
  }

  getForecast(lat: number, lon: number) {
    const pct = ['moonPhase', 'precipProbability', 'humidity', 'cloudCover']
    if (this.DsData['latitude'] == lat.toString() && this.DsData['longitude'] == lon.toString()) {
      for (let day of this.DsData['daily']['data']) {
        for (let val in day) {
          if (!val.includes('ime') && typeof day[val] == "number") {
            if (pct.includes(val)) {
              day[val] = day[val] * 100
            }
            day[val] = Math.round(day[val])
          }
        }
        day['windDir'] = this.castDeg(day['windBearing'])
      }
    }
    return this.DsData['daily']
  }

  castDeg(deg: string) {
    let dir = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"]
    return dir[Math.floor((parseFloat(deg) / 45) + .5) % 8].toString()
  }

  getSkycon(cond: string) {
    return this.skycons[cond]
  }
}

@Injectable()
export class OSMService {
  geocodeBase = 'https://nominatim.openstreetmap.org/reverse?'

  constructor(private http: Http) { }

  reverseGeocode(lat: number, lon: number) {
    let url = this.geocodeBase;
    let params = new URLSearchParams();
    params.set('format', 'json')
    params.set('lat', lat.toString())
    params.set('lon', lon.toString())
    params.set('addressdetail', '1')

    let options = new RequestOptions();
    options.params = params

    return this.http.get(url, options).map((res: Response) => res.json(), (error) => console.log(error));
  }

}

@Injectable()
export class NWSService {
  point_base = 'https://api.weather.gov/points/'

  constructor(private http: Http) { }

  getPointData(lat: number, lon: number) {
    let url = this.point_base + lat.toString() + ',' + lon.toString()
    return this.http.get(url).map(data => data.json(), error => console.log(error))
  }
}

@Injectable()
export class IpGeoService {
  url = "https://ipinfo.io/geo?callback=JSONP_CALLBACK"

  constructor(private jsonp: Jsonp) {}

  getLocation() {
    return this.jsonp.get(this.url).map(
      (response) => response.json(),
      (error) => console.log(error)
    );
  }
}
