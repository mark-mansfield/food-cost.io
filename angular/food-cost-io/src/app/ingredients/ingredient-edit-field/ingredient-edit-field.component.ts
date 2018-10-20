import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IngredientsService } from '../ingredients.service';
import { Ingredient } from '../ingredient.model';

@Component({
  selector: 'app-ingredient-edit-field',
  templateUrl: './ingredient-edit-field.component.html',
  styleUrls: ['./ingredient-edit-field.component.css']
})
export class IngredientEditFieldComponent implements OnInit {

  public ingredient: Ingredient;
  public field_value: string;
  private field: string;
  private id: string;
  public field_type: string;

  constructor(
    private route: ActivatedRoute,
    private service: IngredientsService) { }

  ngOnInit() {
    this.field = this.route.snapshot.paramMap.get('field_name');
    this. field_type = this.route.snapshot.paramMap.get('field_type');
    if (this.id) {
      this.ingredient = JSON.parse(localStorage.getItem('ingredient'));
      this.field_value = this.ingredient[this.field];
      console.log(this.field_value);
      } else {
      console.log('no id sent');
    }
  }

  onUpdateItem() {
    this.ingredient[this.field] = this.field_value;
    console.log(this.ingredient);
    // this.service.updateIngredient(this.ingredient);
  }

}
