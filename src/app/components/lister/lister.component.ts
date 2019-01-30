import { Component, Input } from '@angular/core';

@Component({
  selector: 'lister',
  templateUrl: './lister.component.html',
  styleUrls: ['./lister.component.css'],
})
export class ListerComponent {
  @Input() items: any;

  flagged: Array<string> = [];

  toggleAsFlagged(item): void {
    const itemFlagged = this.flagged.indexOf(item);
    itemFlagged >= 0 ? this.flagged.splice(itemFlagged, 1) : this.flagged.push(item);
  }

}
