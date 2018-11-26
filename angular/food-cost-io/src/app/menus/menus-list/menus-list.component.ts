import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenusService } from '../menus.service';
import { DishService } from 'src/app/dishes/dish.service';
import { Dish } from '../../dishes/dish.model';
import { Menu } from '../menu.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-menus-list',
  templateUrl: './menus-list.component.html',
  styleUrls: ['./menus-list.component.css']
})
export class MenusListComponent implements OnInit, OnDestroy {
  private dishesSub: Subscription;
  private menusSub: Subscription;
  dishes: Dish[] = [];
  menus: Menu[] = [];

  isLoading = false;
  constructor(private menuService: MenusService, private dishService: DishService) {}

  ngOnInit() {
    this.menuService.getMenus();
    this.dishService.getDishData();

    this.dishesSub = this.dishService.getDishesUpdateListener().subscribe((dishes: Dish[]) => {
      this.dishes = dishes;
      this.isLoading = false;
    });
    this.menusSub = this.menuService.getMenusUpdateListener().subscribe((menus: any[]) => {
      this.menus = menus;
      this.isLoading = false;
      console.log(this.menus);
    });
  }

  ngOnDestroy() {
    this.dishesSub.unsubscribe();
  }
}
