import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DishService } from '../dish.service';
import { Dish } from '../dish.model';
@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.css']
})
export class DishDetailsComponent implements OnInit {

  public dish: Dish;
  public selectedId: string;
  ingredients = [];
  description: string;
  ingredientTotal: number;
  method: string;
  plating: string;
  cost: number;
  retail: number;

  constructor(private route: ActivatedRoute, private router: Router, private service: DishService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {

        this.selectedId = paramMap.get('id');
        this.dish = this.service.getDish(this.selectedId);
        this.ingredients = this.dish.ingredients;
        this.ingredientTotal = this.ingredients.length;
        this.description = this.dish.description.substring(0, 15) + ' ...';
        this.method = this.dish.recipe_method.substring(0, 15) + ' ...';
        this.plating = this.dish.plating_guide.substring(0, 15) + ' ...';
        this.cost = this.dish.cost;
        this.retail = this.dish.retail;
      } else {
        console.log('no id sent');
      }
    });
  }

  getMargin(cost, retail){
    const markup = 100;
    const tax = 10;
    const num = cost / retail * 110 * 100;
    return num.toFixed(2);
  }
}
