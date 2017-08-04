import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TropicsService {
  atlantic = [
    {
      'title': 'NHC Tropical Cyclone Outlook',
      'content': [
        {
          'header': '2 Day Outlook',
          'url': '/assets/img/tropics/atlantic/atl_2.png',
          'alt': 'NHC 2 Day Tropical Outlook'
        },
        {
          'header': '5 Day Outlook',
          'url': '/assets/img/tropics/atlantic/atl_5.png',
          'alt': 'NHC 5 Day Tropical Outlook'
        }
      ]
    },
    {
      'title': 'Tropical Surface Map',
      'content': [
        {
          'header': null,
          'url': '/assets/img/tropics/atlantic/atl_sfc.gif',
          'alt': 'Tropical Surface Map'
        }
      ]
    },
    {
      'title': 'Tropical Snapshot',
      'content': [
        {
          'header': 'Visible Satellite Loop',
          'url': '/assets/img/tropics/atlantic/atl_vis.gif',
          'alt': 'Tropical Atlantic Visible Satellite Loop'
        },
        {
          'header': 'Water Vapor Loop',
          'url': '/assets/img/tropics/atlantic/atl_wv.gif',
          'alt': 'Tropical Atlantic Water Vapor Loop'
        },
        {
          'header': 'IR Loop',
          'url': '/assets/img/tropics/atlantic/atl_ir.gif',
          'alt': 'Tropical Atlantic Infrared Loop'
        }
      ],
      'extraContent': [
        {
          'header': 'Sea Surface Temperature (SST) Anomaly',
          'url': '/assets/img/tropics/atlantic/atl_sst.gif',
          'alt': 'Tropical Atlantic SST Anomaly'
        },
        {
          'header': 'Tropical Cyclone Heat Potential',
          'url': '/assets/img/tropics/atlantic/atl_heat_potential.gif',
          'alt': 'Tropical Atlantic Cyclone Heat Potential Map'
        },
        {
          'header': 'Precipitatable Water Loop',
          'url': '/assets/img/tropics/atlantic/atl_pwats.gif',
          'alt': 'Tropical Atlantic PWATS'
        }
      ]
    },
    {
      'title': 'Wind Profile',
      'content': [
        {
          'header': 'Wind Shear and Shear Tendency',
          'url': '/assets/img/tropics/atlantic/atl_tendency.GIF',
          'alt': 'Atlantic Wind Shear Map'
        },
        {
          'header': 'Atlantic Steering Flow',
          'url': '/assets/img/tropics/atlantic/atl_steering',
          'alt': 'Atlantic Steering Flow'
        },
      ]
    }
  ]
  pacific = [
    {
      'title': 'NHC Tropical Cyclone Outlook',
      'content': [
        {
          'header': '2 Day Outlook',
          'url': '/assets/img/tropics/pacific/pac_2.png',
          'alt': 'NHC Pacific 2 Day Tropical Outlook'
        },
        {
          'header': '5 Day Outlook',
          'url': '/assets/img/tropics/pacific/pac_5.png',
          'alt': 'NHC Pacific 5 Day Tropical Outlook'
        }
      ]
    },
    {
      'title': 'Tropical Surface Map',
      'content': [
        {
          'header': null,
          'url': '/assets/img/tropics/pacific/pac_sfc.gif',
          'alt': 'Tropical Surface Map'
        }
      ]
    },
    {
      'title': 'Tropical Snapshot',
      'content': [
        {
          'header': 'Visible Satellite Loop',
          'url': '/assets/img/tropics/pacific/pac_vis.gif',
          'alt': 'Tropical Pacific Visible Satellite Loop'
        },
        {
          'header': 'Water Vapor Loop',
          'url': '/assets/img/tropics/pacific/pac_wv.gif',
          'alt': 'Tropical Pacific Water Vapor Loop'
        },
        {
          'header': 'IR Loop',
          'url': '/assets/img/tropics/pacific/pac_ir.gif',
          'alt': 'Tropical Pacific Infrared Loop'
        }
      ],
      'extraContent': [
        {
          'header': 'Sea Surface Temperature (SST) Anomaly',
          'url': '/assets/img/tropics/pacific/pac_sst.gif',
          'alt': 'Tropical Pacific SST Anomaly'
        },
        {
          'header': 'Tropical Cyclone Heat Potential',
          'url': '/assets/img/tropics/pacific/pac_heat_potential.gif',
          'alt': 'Tropical Pacific Cyclone Heat Potential Map'
        },
        {
          'header': 'Precipitatable Water Loop',
          'url': '/assets/img/tropics/pacific/pac_pwats.gif',
          'alt': 'Tropical Atlantic PWATS'
        }
      ]
    },
    {
      'title': 'Wind Profile',
      'content': [
        {
          'header': 'Wind Shear and Shear Tendency',
          'url': '/assets/img/tropics/pacific/pac_tendency.GIF',
          'alt': 'East Pacific Wind Shear Map'
        },
        {
          'header': 'Pacific Steering Flow',
          'url': '/assets/img/tropics/pacific/pac_steering.GIF',
          'alt': 'Pacific Steering Flow'
        },
      ]
    }
  ]
  randomCards(basin: string) {
    var random = Math.floor(Math.random() * 10000)
    switch (basin) {
      case 'atlantic': {
        var _atlantic = this.atlantic.slice()
        for (let card of _atlantic) {
          for (let sub of card.content) {
            sub['url'] += '?rand=' + random.toString()
          }
        }
        return _atlantic
      }
      case 'pacific': {
        var _pacific = this.pacific.slice()
        for (let card of _pacific) {
          card.content['url'] += '?rand=' + random.toString()
        }
        return _pacific
      }
    }
  }

  getCards(basin: string) {
    switch (basin) {
      case 'atlantic': {
        return Observable.timer(0,600000).map(() => this.randomCards('atlantic'))
      }
      case 'pacific': {
        return Observable.timer(0,600000).map(() => this.randomCards('pacific'))
      }
  }
  }
}
