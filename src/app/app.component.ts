import { Observable } from 'rxjs/Observable';

import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Mother32StateService } from './services/mother32-state.service';

import { Mother32, initMother32 } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  mother32s$: Observable<Mother32[]>;

  constructor(private mother32State: Mother32StateService) {
    this.mother32s$ = mother32State.mother32s$;
  }

  ngOnInit() {
    const unit1 = initMother32('test1');
    const unit2 = initMother32('test2');
    this.mother32State.add(unit1);
    this.mother32State.add(unit2);
  }

}
