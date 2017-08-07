import { City } from '../models/city.model';

export class CityService {
  cities = [
      new City('Jackson', 'jackson', ['Madison'], 'TN', 35.674500, -88.833261, 'KNQA', 'KMKL', 'MEG', 'southeast'),
      new City('Dallas', 'dallas', ['Dallas', 'Collin', 'Rockwall', 'Denton', 'Tarrant', 'Ellis'], 'TX', 32.785588, -96.798477, 'KFWS', 'KDAL', 'FWD' , 'southcentral'),
      new City('New York', 'nyc', ['New York', 'Kings', 'Queens', 'Richmond', 'Bronx'], 'NY', 40.783551, -73.965454, 'KOKX', 'KNYC', 'OKX', 'northeast'),
  ]

  getLocations() {
    return this.cities.slice();
  }

  getLocation(url: string) {
    var index = this.cities.findIndex(i => i.url === url)
    return this.cities[index]
  }
}
