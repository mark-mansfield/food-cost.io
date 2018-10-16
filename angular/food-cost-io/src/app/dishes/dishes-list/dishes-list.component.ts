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
  linksList = [];
  isLoading = false;
  searchTerm: String;
  private dishesSub: Subscription;

  constructor(public dishesService: DishService, private router: Router) {}

  ngOnInit() {
    this.isLoading = true;
    this.dishesService.getDishes();
    this.dishesSub = this.dishesService.getDishUpdateListener()
      .subscribe((dishes: Dish[]) => {
        this.dishes = dishes;
        this.buildLinksList();
        this.isLoading = false;
      });
  }

  // links list
  buildLinksList() {
    this.dishes.forEach((item) => {
      this.linksList.push((item.name.substring(0, 1)).toLocaleLowerCase());
      this.linksList.sort();
    });
  }

  // in case user returns to the browser
  saveDishToLocal (id) {
    this.dishesService.saveDishData(this.dishesService.getDish(id));
    this.router.navigate(['dish/' + id]);
  }

  search(searchValue) {
    console.log(searchValue.value);
    console.log(this.dishes);
    console.log(this.dishes.find(dish => dish.name === searchValue.value ));
  }

  onDelete(id) {
    this.dishesService.deleteDish(id);

  }

  ngOnDestroy() {
    this.dishesSub.unsubscribe();
  }
}
