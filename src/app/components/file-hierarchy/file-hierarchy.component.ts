import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-file-hierarchy',
  templateUrl: './file-hierarchy.component.html',
  styleUrls: ['./file-hierarchy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileHierarchyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
