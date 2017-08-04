import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class SevereService {
  cards = [
    {
      'title': 'Current Watches and Warnings',
      'content': [
        {
          'header': 'Current Severe Watches',
          'url': '/assets/img/severe/spc_wwa.png',
          'alt': 'Current Storm Prediction Center Watches'
        },
        {
          'header': 'Current NWS Advisories',
          'url': '/assets/img/severe/nws_all.png',
          'alt': 'Active National Weather Service Watches and Warnings'
        }
      ]
    },
    {
      'title': 'Current Storm Prediction Center Outlooks',
      'content': [
        {
          'header': 'Day 1',
          'url': '/assets/img/severe/spc_1.gif',
          'alt': 'Day 1 Severe Outlook'
        },
        {
          'header': 'Day 2',
          'url': '/assets/img/severe/spc_2.gif',
          'alt': 'Day 2 Severe Outlook'
        },
      ],
      'extraContent': [
        {
          'header': 'Day 3',
          'url': '/assets/img/severe/spc_3.gif',
          'alt': 'Day 3 Severe Outlook'
        },
        {
          'header': 'Days 4-8',
          'url': '/assets/img/severe/spc_4-8.gif',
          'alt': 'Days 4-8 Severe Outlooks'
        },
      ]
    },
    {
      'title': 'Storm Reports',
      'content':[
        {
          'header': "Yesterday's Storm Reports",
          'url': '/assets/img/severe/yesterday_reports.gif',
          'alt': 'Yesterday Storm Reports'
        },
        {
          'header': "Today's Storm Reports",
          'url': '/assets/img/severe/today_reports.gif',
          'alt': 'Today Storm Reports'
        },
      ]
    }
  ]

  randomCards() {
    var rand = Math.floor(Math.random() * 100000)
    var sev = this.cards.slice();
    for (let card of sev) {
      for (let item of card.content) {
        item.url += '?rand=' + rand.toString()
      }
    }
    return sev
  }
  getCards() {
    return Observable.timer(0,600000).map(() => this.randomCards())
  }
}
