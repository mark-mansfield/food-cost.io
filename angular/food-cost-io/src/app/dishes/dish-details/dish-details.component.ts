import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DishService } from '../dish.service';
import { Dish } from '../dish.model';
@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.css']
})
export class DishDetailsComponent implements OnInit {
  dish$: Observable<Dish>;
  private selectedId: String;
  public dish: Dish;
  ingredients = [];
  ingredientTotal = this.ingredients.length;

  constructor(private route: ActivatedRoute, private router: Router, private service: DishService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.selectedId = paramMap.get('id');
        this.dish = this.service.getDish(this.selectedId);
        this.ingredients = this.dish.ingredients;
      } else {
        console.log('no id sent');
      }
    });
  }

}
