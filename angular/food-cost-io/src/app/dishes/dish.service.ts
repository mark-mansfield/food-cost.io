import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dish } from './dish.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + 'dishes';

@Injectable({providedIn: 'root'})

export class DishService {


  private dishes: Dish[] = [];
  private dishesUpdated = new Subject<Dish[]>();
  constructor(private http: HttpClient,  private router: Router) { }


  //  use interceptor , function to run on any outgoing http request
  //  we manipulate the request to add our token.
  getDishes() {
    this.http
      .get<{dishes: any }>(BACKEND_URL)
      .pipe(map((postData) => {
          return postData.dishes.map(dish => {
          return {
            id: dish._id,
            name: dish.name,
            ingredients: dish.ingredients,
            retail: dish.retail,
            cost: dish.cost,
            margin: dish.margin,
            description: dish.description,
            recipe_method: dish.recipe_method,
            plating_guide: dish.plating_guide,
          };
        });
      }))
      .subscribe(transformedPosts => {
        this.dishes = transformedPosts;
        this.dishesUpdated.next([...this.dishes]);
      });
  }

  getDish(dishId) {
   return  {...this.dishes.find(p => p.id === dishId)};
  }


  getDishUpdateListener() {
    return this.dishesUpdated.asObservable();
  }


  addDish( id: null, name: string /*, description: string, image: File*/) {
    const dishData: Dish = {
      id: 'null',
      name: name,
      ingredients: [],
      retail: 0.00,
      cost: 0.00,
      margin: 0,
      description: 'string',
      recipe_method: 'string',
      plating_guide: 'string',
    };
    this.http
      .post<{message: string; dish: Dish }>(
        'http://localhost:3000/api/dishes',
        dishData
      )
      .subscribe(returnedData => {
        console.log(returnedData.message);
        this.dishes.push(returnedData.dish);
        this.dishesUpdated.next([...this.dishes]); // inform UI
        this.router.navigate(['/dishes']);
    });
  }


}
