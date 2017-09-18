import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/map';

export function mouseMoveObserver(untilEvent: 'mouseup' | Observable<{}> = 'mouseup'): Observable<MouseEvent> {
  const mouseMove$: Observable<MouseEvent> = Observable.fromEvent(document, 'mousemove');
  if (untilEvent === 'mouseup') {
    untilEvent = Observable.fromEvent(document, untilEvent);
  }
  return mouseMove$.takeUntil(untilEvent);
}
