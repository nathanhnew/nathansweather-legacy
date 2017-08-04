import { Component, OnInit } from '@angular/core';
import { CityService } from '../services/city.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  hidden = {'currents': true};
  locations: any;
  navHidden: boolean = true;
  constructor(private cityService: CityService) { }

  ngOnInit() {
    this.locations = this.cityService.getLocations()
    for (let loc of this.locations) {
      this.hidden[loc.url] = true
    }
  }

  closeAll() {
    this.navHidden = true;
    for (var key in this.hidden) {
      this.hidden[key] = true
    }
  }

  expandNav() {
    this.navHidden = !this.navHidden
    for(var key in this.hidden) {
      this.hidden[key] = true;
    }
    console.log(this.hidden)
  }

  expandOne(loc: string) {
    const valShowing = this.hidden[loc];
    for (var key in this.hidden) {
      this.hidden[key] = true;
    }
    this.hidden[loc] = !valShowing
  }
}
