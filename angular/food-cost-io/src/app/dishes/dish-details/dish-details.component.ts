import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DishService } from '../dish.service';
import { Dish } from '../dish.model';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.css']
})
export class DishDetailsComponent implements OnInit {
  public hasData = false;
  public isLoading = false;
  public dish: Dish;
  private dishSub: Subscription;

  public selectedId: string;
  ingredients = [];

  description: string;
  ingredientTotal: number;
  method: string;
  plating: string;
  cost: string;
  retail_price: string;
  margin: string;

  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 2
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DishService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('_id')) {
        this.selectedId = paramMap.get('_id');
        this.dish = this.service.getDish();
        this.dishSub = this.service
          .getDishUpdateListener()
          .subscribe((dish: Dish) => {
            this.dish = dish;
            this.setDishObjectData(dish);
            this.getMargin(
              parseInt(this.cost, 0),
              parseInt(this.retail_price, 0)
            );
          });
        this.hasData = true;
        this.setDishObjectData(this.dish);
        this.getMargin(parseInt(this.cost, 0), parseInt(this.retail_price, 0));
        // TODO FIX the margin function to work correctly// these values are truthy / falsey so i reverse the comaprison for each
        // if (0 <= parseInt(this.cost, 0) &&  0 <= parseInt(this.retail_price, 0) ) {

        //   this.margin = this.getMargin(parseInt(this.cost, 0), parseInt(this.retail_price, 0));
        // }
        this.isLoading = false;
      } else {
        console.log('no id sent');
      }
    });
  }

  setDishObjectData(dish) {
    this.ingredients = this.dish.ingredients;
    this.ingredientTotal = this.ingredients.length;
    this.description = this.dish.description;
    this.method = this.dish.recipe_method;
    this.plating = this.dish.plating_guide;
    this.cost = this.dish.cost;
    this.retail_price = '0.10';
  }

  getMargin(cost, retail) {
    console.log(cost);
    console.log(retail);
    // const num = (0.05 / 0.1 ) * 110 ;
    // console.log(num);
    // return num.toFixed(2);
  }

  getIngredientsTotal() {
    return '1000.00';
  }
}
