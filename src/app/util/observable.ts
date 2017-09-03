import { Observable } from 'rxjs/Observable';

export function getValue<T>(observable: Observable<T>): T {
  let result: T;
  observable.take(1).subscribe(value => result = value);
  return result;
}
