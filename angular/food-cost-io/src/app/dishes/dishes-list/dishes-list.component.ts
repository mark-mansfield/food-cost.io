import {
  Component,
  OnInit,
  OnDestroy } from '@angular/core';


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
  searchTerm: string;
  linkListValue: string;
  showRefresh = false;
  index = 0;
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
    if (this.linksList.length === 0) {
      const tmpArray = [];
      this.dishes.forEach((item) => {
        tmpArray.push((item.name.substring(0, 1))
        .toLocaleLowerCase());
      });
      this.linksList = Array.from(new Set(tmpArray));
    }
  }

  saveDishToLocal (id) {
    this.dishesService.saveDishData(this.dishesService.getDish(id));
    this.router.navigate(['dish/' + id]);
  }

  showAllDishes() {
    this.dishesService.showAllDishes();
    this.showRefresh = false;
  }

  search(searchValue) {
    if (searchValue) {
      this.dishesService.searchDishByName(searchValue);
      this.showRefresh = true;
    } else {
      alert('Please enter a serch term');
    }
  }

  searchByFirstletter(firstLetter) {
    this.dishesService.searchDishByFirstletter(firstLetter);
    this.showRefresh = true;
  }

  onDelete(id) {
    this.dishesService.deleteDish(id);

  }

  ngOnDestroy() {
    this.dishesSub.unsubscribe();
  }
}
