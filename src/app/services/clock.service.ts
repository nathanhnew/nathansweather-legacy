import { Observable } from 'rxjs';

export class ClockService {
  getTime() {
    return Observable.interval(1000).map(tick => new Date()).share()
  }
}
