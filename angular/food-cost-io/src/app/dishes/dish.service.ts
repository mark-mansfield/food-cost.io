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

  private dish: Dish[] = [];
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
            _id: dish._id,
            name: dish.name,
            ingredients: dish.ingredients,
            retail_price: dish.retail_price,
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
    return  {...this.dishes.find(p => p._id === dishId)};
  }


  getDishUpdateListener() {
    return this.dishesUpdated.asObservable();
  }


  addDish( id: null, name: string /*, description: string, image: File*/) {
    const dishData = {

      name: name,
      ingredients: [],
      retail_price: '0.00',
      cost: '0.00',
      margin: '0',
      description: 'string',
      recipe_method: 'string',
      plating_guide: 'string',
    };
    console.log('dishData being sent to backend' + dishData);
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

  updateDish(dish: Dish) {
    this.http
      .put<{message: string; dish: Dish }>(
        'http://localhost:3000/api/dishes/' + dish._id,
        dish
      )
      .subscribe(returnedData => {
        console.log('update status: ' + returnedData.message);
        console.log('new dish: ' + returnedData.dish);
        const storedDishIndex = this.dishes.findIndex(p => p._id === dish._id);
        this.dishes[storedDishIndex] = returnedData.dish;
        this.saveDishData(this.dishes[storedDishIndex]);
        this.dishesUpdated.next([...this.dishes]); // inform UI
        this.router.navigate(['/dish/' + dish._id]);
    });
  }

  getSavedDishData() {
    return  JSON.parse(localStorage.getItem('dish'));
  }

  saveDishData(dish: Dish) {
    localStorage.setItem('dish' , JSON.stringify(dish));
  }


  getIngredientsList(dishId) {
    const selectedDish = this.getDish(dishId);
    console.log(selectedDish.ingredients);
    return selectedDish.ingredients;
  }
}
