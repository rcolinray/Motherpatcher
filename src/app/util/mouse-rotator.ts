import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';

import { mouseMoveObserver } from './mouse-move-observer';
import { clamp } from './math';

export class MouseRotator {

  angle$: Observable<number>;

  private x: number;
  private y: number;
  private xAmount: number = 0;
  private yAmount: number = 0;

  constructor(event: MouseEvent, private angle: number, private minAngle: number, private maxAngle: number) {
    this.x = event.clientX;
    this.y = event.clientY;
    this.xAmount = 0;
    this.yAmount = 0;

    this.angle$ = mouseMoveObserver().flatMap((event: MouseEvent) => {
      const dx = event.clientX - this.x;
      const dy = event.clientY - this.y;
      this.x = event.clientX;
      this.y = event.clientY;

      event.preventDefault();
      if (this.xAmount === 0 && this.yAmount === 0) {
        const xMag = Math.abs(dx);
        const yMag = Math.abs(dy);
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

      const amount = this.xAmount * dx + this.yAmount * dy;
      this.angle = clamp(this.angle + amount, this.minAngle, this.maxAngle);
      return Observable.of(this.angle);
    });
  }
}
