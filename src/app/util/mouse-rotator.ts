import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';

import { mouseMoveObserver } from './mouse-move-observer';
import { clamp } from './math';

export class MouseRotator {

  angle$: Observable<number>;

  private xAmount: number = 0;
  private yAmount: number = 0;

  constructor(private angle: number, private minAngle: number, private maxAngle: number) {
    this.xAmount = 0;
    this.yAmount = 0;

    this.angle$ = mouseMoveObserver().flatMap((event: MouseEvent) => {
      event.preventDefault();
      if (this.xAmount === 0 && this.yAmount === 0) {
        const xMag = Math.abs(event.movementX);
        const yMag = Math.abs(event.movementY);
        if (xMag === yMag) {
          return Observable.empty();
        }
        else if (xMag > yMag) {
          this.xAmount = 1;
        }
        else {
          this.yAmount = -1;
        }
      }

      const amount = this.xAmount * event.movementX + this.yAmount * event.movementY;
      this.angle = clamp(this.angle + amount, this.minAngle, this.maxAngle);
      return Observable.of(this.angle);
    });
  }
}
