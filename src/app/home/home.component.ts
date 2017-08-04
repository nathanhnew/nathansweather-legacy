import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { MdDialog } from '@angular/material';
import { ImageModalComponent } from '../image-modal/image-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewChecked {
  images = [
    {
      'title': 'Snow Showers Behind Delicate Arch',
      'thumb': 'assets/img/collection/arches_thumb.jpg',
      'alt': 'Arches NP'
    },
    {
      'title': 'Clearing Storms Above El Morro, San Juan, PR',
      'thumb': 'assets/img/collection/el_morro_thumb.jpg',
      'alt': 'El Morro'
    },
    {
      'title': 'Autumn Falls on Central Park',
      'thumb': 'assets/img/collection/nyc_fall_thumb.jpg',
      'alt': 'Fall in NYC'
    },
    {
      'title': 'Sunset in the Streets of Old San Juan',
      'thumb': 'assets/img/collection/sunset_thumb.jpg',
      'alt': 'San Juan, PR'
    },
    {
      'title': 'Darkness Shrouds Monument Valley',
      'thumb': 'assets/img/collection/night_thumb.jpg',
      'alt': 'Monument Valley'
    },
    {
      'title': 'Clouds Move Into El Yunque',
      'thumb': 'assets/img/collection/tropics_thumb.jpg',
      'alt': 'El Yunque National Forest'
    },
  ];
  constructor(public dialog: MdDialog) { }

  ngOnInit() {
  }

  ngAfterViewChecked() {
            !function(d,s,id){
                var js: any,
                    fjs=d.getElementsByTagName(s)[0],
                    p='https';
                if(!d.getElementById(id)){
                    js=d.createElement(s);
                    js.id=id;
                    js.src=p+"://platform.twitter.com/widgets.js";
                    fjs.parentNode.insertBefore(js,fjs);
                }
            }
            (document,"script","twitter-wjs");
  }

  openDialog(index: number) {
    let img = this.images.slice()[index]
    img['url'] = img.thumb.replace('_thumb','')
    this.dialog.open(ImageModalComponent, {
      data: img
    })
  }
}
