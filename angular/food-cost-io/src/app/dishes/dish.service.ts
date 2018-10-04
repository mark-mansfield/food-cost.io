import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { DishModel } from './dish.model';
import { DISHES } from './mock-dishes';

@Injectable({
  providedIn: 'root',
})
export class DishService {

  constructor() { }

  getDishes(): Observable<DishModel[]> {
      return of(DISHES);
  }

  getDish(id: number | string) {
    return this.getDishes().pipe(
      // (+) before `id` turns the string into a number
      map((dishes: DishModel[]) => dishes.find(dish => dish.id === +id))
    );
  }
}
