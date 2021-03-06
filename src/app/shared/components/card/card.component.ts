import { Component, Input, OnInit } from '@angular/core';
import { CardModel } from 'src/app/models/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() card: CardModel;

  constructor() { }

  ngOnInit(): void {
  }

}
