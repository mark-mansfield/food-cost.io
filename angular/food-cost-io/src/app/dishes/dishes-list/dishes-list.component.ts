import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DishService } from '../dish.service';
import { Dish } from '../dish.model';


@Component({
  selector: 'app-dishes-list',
  templateUrl: './dishes-list.component.html',
  styleUrls: ['./dishes-list.component.css']
})

export class DishesListComponent  implements OnInit, OnDestroy  {

  dishes: Dish[] = [];
  isLoading = false;
  private dishesSub: Subscription;

  constructor(public dishesService: DishService) {}

  ngOnInit() {
    this.isLoading = true;
    this.dishesService.getDishes();
    this.dishesSub = this.dishesService.getDishUpdateListener()
      .subscribe((dishes: Dish[]) => {
        this.dishes = dishes;
        this.isLoading = false;
      });
  }

  ngOnDestroy() {
    this.dishesSub.unsubscribe();
  }
}
