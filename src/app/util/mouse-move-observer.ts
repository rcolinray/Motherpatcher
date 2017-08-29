import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/map';

export function mouseMoveObserver(): Observable<MouseEvent> {
  const mouseMove$: Observable<MouseEvent> = Observable.fromEvent(document, 'mousemove');
  const mouseUp$ = Observable.fromEvent(document, 'mouseup');
  return mouseMove$.takeUntil(mouseUp$);
}
