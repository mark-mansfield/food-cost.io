import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dish } from '../dish.model';
import { DishIngredient } from '../dish-ingredient.model.ts';
import { DishService } from '../dish.service';
import { DishIngredient } from '../dish-ingredient.model';

@Component({
  selector: 'app-dish-ingredients-edit',
  templateUrl: './dish-ingredients-edit.component.html',
  styleUrls: ['./dish-ingredients-edit.component.css']
})

export class DishIngredientsEditComponent implements OnInit {
  //
  public dish: Dish;
  public ingredients;
  public ingredientsList = [];
  // public dishIngredient: DishIngredient;
  private field: string;
  private id: string;
  constructor(private service: DishService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('_id');

    if (this.id) {
      this.dish = JSON.parse(localStorage.getItem('dish'));
      this.ingredients = this.dish.ingredients[0];
      // make new object

      this.ingredients.forEach((item) => {
        const dishIngredient: DishIngredient = {
          name:  item.name,
          qty: item.qty,
          AP_weight: item.AP_weight,
          EP_weight: item.EP_weight
        };
        this.ingredientsList.push(dishIngredient);

      });
      console.log(this.ingredientsList);
      } else {
      console.log('no id sent');
    }

  }

}
