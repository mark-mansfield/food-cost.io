import { Component, OnInit } from '@angular/core';
import { IngredientsService } from '../ingredients.service';
@Component({
  selector: 'app-ingredients-create',
  templateUrl: './ingredients-create.component.html',
  styleUrls: ['./ingredients-create.component.css']
})
export class IngredientsCreateComponent implements OnInit {
  name = '';
  constructor(private service: IngredientsService) {}

  ngOnInit() {}

  onCreate() {
    this.service.createIngredient(this.name);
  }
}
