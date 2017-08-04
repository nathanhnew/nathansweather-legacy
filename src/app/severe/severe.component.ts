import { Component, OnInit, OnDestroy } from '@angular/core';
import { SevereService } from '../services/severe.service';
import { Subscription } from 'rxjs/Subscription';
import { MdDialog } from '@angular/material';
import { ImageModalComponent } from '../image-modal/image-modal.component';

@Component({
  selector: 'app-severe',
  templateUrl: './severe.component.html',
  styleUrls: ['./severe.component.css']
})
export class SevereComponent implements OnInit, OnDestroy {

  cards: any[];
  cardSub: Subscription;

  constructor(private severeService: SevereService, public dialog: MdDialog) { }

  ngOnInit() {
    this.cardSub = this.severeService.getCards().subscribe(
      (data) => this.cards = data,
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
