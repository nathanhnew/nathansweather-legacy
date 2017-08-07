import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CityService } from '../services/city.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.css']
})
export class LeafletMapComponent implements OnInit, AfterViewInit {
  @Input() coords: Array<number>;
  initialized: boolean;
  map: L.Map;
  constructor(private route: ActivatedRoute, private cityService: CityService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params['city']) {
          let loc = this.cityService.getLocation(params['city']);
          this.coords = [loc.lat, loc.lon]
          console.log(this.coords)
          if(!this.initialized){
          this.initMap();
        }
          else  {
            this.map.setView(new L.LatLng(this.coords[0],this.coords[1]),8)
          }
        } else {
          this.initMap();
        }

      }
    );
  }
  ngAfterViewInit() {

  }

  initMap() {
    this.map = L.map('map', {
      center: [this.coords[0], this.coords[1]],
      zoom: 8,
    });
    let basemap = L.tileLayer('https://api.mapbox.com/styles/v1/nathanhnew/cj62p1p9l3nyx2qp07zm12yh5/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibmF0aGFuaG5ldyIsImEiOiJjajYxZXJ2NHowdHk1MnFvZnFvcjE2aTZ3In0.uyW_Te8pYugmfTiKuVHvOA', {
      attribution: 'Imagery &copy; Mapbox, Map Data &copy; OpenStreetMap |'
    });
    var radarWMS = L.tileLayer.wms("https://nowcoast.noaa.gov/arcgis/services/nowcoast/radar_meteo_imagery_nexrad_time/MapServer/WMSServer", {
      layers: '1',
      format: 'image/png',
      transparent: true,
      opacity: 0.8,
      attribution: 'Radar data provided by National Weather Service via nowCOAST'
    });
    var warningsWMS = L.tileLayer.wms("https://nowcoast.noaa.gov/arcgis/services/nowcoast/wwa_meteoceanhydro_shortduration_hazards_warnings_time/MapServer/WMSServer", {
      layers: '1',
      format: 'image/png',
      transparent: true,
      opacity: 0.8,
      attribution: 'nowCOAST'
    });
    let overlay = L.tileLayer('https://api.mapbox.com/styles/v1/nathanhnew/cj62phsw73npj2rphndjzt3i2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibmF0aGFuaG5ldyIsImEiOiJjajYxZXJ2NHowdHk1MnFvZnFvcjE2aTZ3In0.uyW_Te8pYugmfTiKuVHvOA');
    let layers = L.layerGroup([basemap,radarWMS,warningsWMS,overlay]).addTo(this.map)
    this.initialized = true;
  }

}
