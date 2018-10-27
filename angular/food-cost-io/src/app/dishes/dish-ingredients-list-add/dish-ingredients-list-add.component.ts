import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DishIngredient } from '../dish-ingredient.model';
import { Dish } from '../dish.model';
import { Ingredient } from 'src/app/ingredients/ingredient.model';
import { IngredientsService } from '../../ingredients/ingredients.service';
import { DishService } from '../dish.service';

@Component({
  selector: 'app-dish-ingredients-list-add',
  templateUrl: './dish-ingredients-list-add.component.html',
  styleUrls: ['./dish-ingredients-list-add.component.css']
})
export class DishIngredientsListAddComponent implements OnInit {
  public dish: Dish;
  public ingredientsList = [];
  public isLoading = false;
  private ingredientsSub: Subscription;
  private dishesSub: Subscription;
  id: string;

  constructor(
    public dishesService: DishService,
    private route: ActivatedRoute,
    public router: Router,
    public ingredientService: IngredientsService
  ) {}

  ngOnInit() {
    this.dish = this.dishesService.loadLocalDishData();
    const ingredientData = this.ingredientService.loadLocalIngredientsData();
    if (ingredientData) {
      this.ingredientsList = ingredientData.ingredients;
      this.isLoading = false;
      this.ingredientsSub = this.ingredientService
        .geIngredientsUpdateListener()
        .subscribe();
    } else {
      this.ingredientService.getIngredients();
      this.isLoading = true;
      this.ingredientsSub = this.ingredientService
        .geIngredientsUpdateListener()
        .subscribe((ingredientList: Ingredient[]) => {
          this.ingredientsList = ingredientList;
          this.isLoading = false;
        });
    }
  }

  onAddIngredient(name) {
    const ingredient: DishIngredient = {
      name: name.toLocaleLowerCase(),
      qty: '0',
      AP_weight: '0',
      EP_weight: '0'
    };
    this.dish.ingredients.unshift(ingredient);
    this.dishesService.updateDish(this.dish, 'ingredients');
    // this.router.navigate(['/dish/' + this.dish._id + '/ingredients']);
  }
}
