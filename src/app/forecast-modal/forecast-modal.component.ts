import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { DarkSkyService } from '../services/web.service';
declare var Skycons;

@Component({
  selector: 'app-forecast-modal',
  templateUrl: './forecast-modal.component.html',
  styleUrls: ['./forecast-modal.component.css']
})
export class ForecastModalComponent implements OnInit, AfterViewInit {
  @ViewChild('skycon') skycon: ElementRef;
  @ViewChild('sunrise') sunrise: ElementRef;
  @ViewChild('sunset') sunset: ElementRef;
  constructor(public dialogRef: MdDialogRef<ForecastModalComponent>, @Inject(MD_DIALOG_DATA) public data: any, private dsService: DarkSkyService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // Set main forecast skycon
    var skycons = new Skycons({ 'color': '#0f3b65' });
    skycons.add(this.skycon.nativeElement, this.dsService.getSkycon(this.data['icon'].toUpperCase()));
    skycons.play();

    // Set sunrise skycon
    if( 'sunrise' in this.data) {
      skycons.add(this.sunrise.nativeElement, this.dsService.getSkycon('CLEAR-DAY'))
    }
    // Set sunset skycon
    if( 'sunset' in this.data) {
      skycons.add(this.sunset.nativeElement, this.dsService.getSkycon('CLEAR-DAY'))
    }
  }

}
