import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(public dishesService: DishService, private router: Router) {}

  ngOnInit() {
    this.isLoading = true;
    this.dishesService.getDishes();
    this.dishesSub = this.dishesService.getDishUpdateListener()
      .subscribe((dishes: Dish[]) => {
        this.dishes = dishes;
        this.isLoading = false;
      });
  }

  // in case user returns to the browser or does a manul page reload
  saveDishToLocal (id) {
    this.dishesService.saveDishData(this.dishesService.getDish(id));
    this.router.navigate(['dish/' + id]);
  }

  ngOnDestroy() {
    this.dishesSub.unsubscribe();
  }
}
