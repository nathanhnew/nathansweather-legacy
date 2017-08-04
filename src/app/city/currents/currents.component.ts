import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CityService } from '../../services/city.service';
import { City } from '../../models/city.model';


@Component({
  selector: 'app-currents',
  templateUrl: './currents.component.html',
  styleUrls: ['./currents.component.css']
})
export class CurrentsComponent implements OnInit {
  city: City;
  siteInfo: any;
  constructor(private route: ActivatedRoute, private cityService: CityService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.city = this.cityService.getLocation(params['city']);
        this.siteInfo = this.cityService.serializeInfo(params['city']);
      }
    )

  }



}
