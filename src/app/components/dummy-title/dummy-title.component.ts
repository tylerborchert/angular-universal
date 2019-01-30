import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dummy-title',
  templateUrl: './dummy-title.component.html',
  styleUrls: ['./dummy-title.component.css'],
})
export class DummyTitleComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;

  currentTime = 0;

  ngOnInit() {
    setInterval(() => this.currentTime += 1, 1000);
  }

  resetTime() {
    this.currentTime = 0;
  }
}
