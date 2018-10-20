import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ingredient } from './ingredient.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


const BACKEND_URL = environment.apiUrl + 'ingredients';
const CUST_ID = environment.custId ;
@Injectable({providedIn: 'root'})

export class IngredientsService {

  ingredient: Ingredient;
  public ingredientsList: any = [];
  public ingredientsUpdated = new Subject<Ingredient[]>();
  public ingredientsDoc;
  constructor(private http: HttpClient,  private router: Router) { }

  geIngredientsUpdateListener() {
    return this.ingredientsUpdated.asObservable();
  }


  // ingredients list by category
  getIngredients(docId, category) {
    this.http.get<{ingredients: any[] }>(BACKEND_URL + '/' +  docId)
     .subscribe(transformedPosts => {
        this.ingredientsDoc = transformedPosts.ingredients;
        console.log(this.ingredientsDoc);
        this.ingredientsList = this.ingredientsDoc.filter((item => item.category === category));
        this.ingredientsUpdated.next([...this.ingredientsList]);
    });
  }

  // delete a dish
  deleteIngredient(id: String) {
    this.http.delete(BACKEND_URL + '/' + id)
      .subscribe(result => {
        // filter returns all entries where the  condition === true and removes entries where the condition === false
        // const updateDishes = this.dishes.filter(dish => dish._id !== id);
        // // update menus array with filtered result
        // this.dishes = updateDishes;
        // // inform UI
        // this.dishesUpdated.next([...this.dishes]);
        console.log(result);

    });
  }

  updateIngredient(custId: string) {
    console.log('update ingredient call received in the service');
    // this.http
    //   .put<{message: string; dish: Ingredient }>(BACKEND_URL + '/' +  custId, this.ingredientsDoc )
    //   .subscribe(returnedData => {
    //     console.log('update status: ' + returnedData.message);
    //     console.log('new ingredient: ' + returnedData.ingredient);
    //     const storedIndex = this.ingredient.findIndex(p => p.name === ingredient.name);
    //     this.ingredientsList[storedIndex] = returnedData.dish;
    //     this.saveIngredientData(this.ingredientsList[storedIndex]);
    //     this.ingredientsUpdated.next([...this.ingredientsList]); // inform UI
    //     this.router.navigate(['/ingredient/' + ingredient.name]);
    // });
  }


  // edit local data to save on server round trips
  saveIngredientData(ingredient: Ingredient) {
    localStorage.setItem('ingredient' , JSON.stringify(ingredient));
  }
}
