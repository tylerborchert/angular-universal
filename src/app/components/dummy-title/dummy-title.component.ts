import { Component, Input } from '@angular/core';

@Component({
  selector: 'dummy-title',
  templateUrl: './dummy-title.component.html',
  styleUrls: ['./dummy-title.component.css'],
})
export class DummyTitleComponent {
  @Input() title: string;
  @Input() message: string;
}
