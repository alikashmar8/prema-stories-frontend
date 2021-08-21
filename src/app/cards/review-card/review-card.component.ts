import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css'],
})
export class ReviewCardComponent implements OnInit {
  @Input('message') message: string;
  @Input('name') name: string;
  @Input('description') description: string;

  constructor() {}

  ngOnInit(): void {}
}
