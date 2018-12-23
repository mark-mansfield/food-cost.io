import { Component, OnInit } from '@angular/core';
import { DishService } from '../dishes/dish.service';
import { IngredientsService } from '../ingredients/ingredients.service';
import { MenusService } from '../menus/menus.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  constructor(
    private dishService: DishService,
    private ingredientService: IngredientsService,
    private menuService: MenusService
  ) {}

  ngOnInit() {
    this.dishService.getDishData();
    this.menuService.getMenus();
    this.ingredientService.getIngredients();
  }
}
