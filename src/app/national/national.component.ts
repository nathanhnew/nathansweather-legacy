import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClockService } from '../services/clock.service';
import { Observable, Subscription } from 'rxjs';
import { MdDialog } from '@angular/material';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import * as moment from 'moment';

@Component({
  selector: 'app-national',
  templateUrl: './national.component.html',
  styleUrls: ['./national.component.css']
})
export class NationalComponent implements OnInit, OnDestroy {

  theTime: Date;
  timeSub: Subscription;
  eachCard = [
    {
      'title':'National Radar',
      'url': 'https://radar.weather.gov/Conus/Loop/NatLoop.gif',
      'alt': 'National Radar Mosaic'
    },
    {
      'title': 'Current Temps',
      'url': 'https://www.mesonet.org/data/public/noaa/metar/maps/realtime/latest.tair.png',
      'alt': 'National Current Temperatures'
    },
    {
      'title': 'National Satellite',
      'url': 'https://www.ssec.wisc.edu/data/us_comp/image7.jpg',
      'alt': 'National Vis/IR Satellite'
    }
  ]

  constructor(private clockService: ClockService, public dialog: MdDialog) { }

  ngOnInit() {
    this.timeSub = this.clockService.getTime().subscribe(time => this.theTime = time)
  }

  openDialog(index: number) {
    this.dialog.open(ImageModalComponent, {
      data: this.eachCard[index]
    })
  }

  ngOnDestroy() {
    this.timeSub.unsubscribe()
  }

}
