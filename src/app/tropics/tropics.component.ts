import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TropicsService } from '../services/tropics.service';
import { Subscription } from 'rxjs/Subscription';
import { MdDialog } from '@angular/material';
import { ImageModalComponent } from '../image-modal/image-modal.component';

@Component({
  selector: 'app-tropics',
  templateUrl: './tropics.component.html',
  styleUrls: ['./tropics.component.css']
})
export class TropicsComponent implements OnInit, OnDestroy {
  page: string;
  constructor(private route: ActivatedRoute, private router: Router, private tropicsService: TropicsService, public dialog: MdDialog) { }
  cardSub: Subscription;
  cards: any;
  ngOnInit() {
    this.cardSub = this.tropicsService.getCards('atlantic').subscribe(
      (data) => {
        this.cards = data
      },
      (error) => console.log(error)
    );
  }

  onNavigate(event: any) {
    this.cardSub.unsubscribe();
    const sector = { 0: 'atlantic', 1: 'pacific'}
    this.cardSub = this.tropicsService.getCards(sector[event.index]).subscribe(
      (data) => {
        this.cards = data;
      },
      (error) => console.log(error)
    );
  }

  openDialog(cardIndex: number, imgIndex: number, extra?: boolean) {
    if (!extra) {
      this.dialog.open(ImageModalComponent, {
        data: this.cards[cardIndex].content[imgIndex]
      });
    } else {
      this.dialog.open(ImageModalComponent, {
        data: this.cards[cardIndex].extraContent[imgIndex]
      });
    }
  }

  ngOnDestroy() {
    this.cardSub.unsubscribe();
  }

}
