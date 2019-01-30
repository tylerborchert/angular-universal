import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'search-lookup',
  templateUrl: './search-lookup.component.html',
  styleUrls: ['./search-lookup.component.css'],
})
export class SearchLookupComponent {
  @Input() directory: string;
  @Output() query: EventEmitter<string>;

  doSearch(search) {
    this.query.emit(search);
  }
}
