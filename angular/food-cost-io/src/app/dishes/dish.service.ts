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
        this.saveDishesData(this.dishes);
        this.dishesUpdated.next([...this.dishes]);
      });
  }

  getDish(dishId) {
    return  {...this.dishes.find(p => p._id === dishId)};
  }


  getDishUpdateListener() {
    return this.dishesUpdated.asObservable();
  }

  // search for a dish by name
  searchDishByName(searchTerm) {
    const searchResults = this.dishes.filter(p => p.name.includes(searchTerm));
    this.dishesUpdated.next([...searchResults]);

  }
  searchDishByFirstletter (letter) {
    const searchResults = this.dishes.filter(p => p.name[0] === letter);
    console.log(searchResults);
    this.dishesUpdated.next([...searchResults]);
  }

  // delete a dish
  deleteDish(id: String) {
    this.http.delete(BACKEND_URL + '/' + id)
      .subscribe(result => {
        // filter returns all entries where the  condition === true and removes entries where the condition === false
        const updateDishes = this.dishes.filter(dish => dish._id !== id);
        // update menus array with filtered result
        this.dishes = updateDishes;
        // inform UI
        this.dishesUpdated.next([...this.dishes]);
        console.log(result);

    });
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


  showAllDishes() {
    console.log(this.getDishesData());
    const dishesData: any = this.getDishesData();
    this.dishesUpdated.next([...dishesData]);
  }

  getSavedDishData() {
    return  JSON.parse(localStorage.getItem('dish'));
  }

  saveDishData(dish: Dish) {
    localStorage.setItem('dish' , JSON.stringify(dish));
  }

  saveDishesData(dishes) {
    localStorage.setItem('dishes' , JSON.stringify(dishes));
  }

  getDishesData() {
    return JSON.parse(localStorage.getItem('dishes'));
  }

  getIngredientsList(dishId) {
    const selectedDish = this.getDish(dishId);
    console.log(selectedDish.ingredients);
    return selectedDish.ingredients;
  }
}
