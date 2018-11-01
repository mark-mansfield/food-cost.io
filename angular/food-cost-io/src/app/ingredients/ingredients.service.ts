import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ingredient } from './ingredient.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Globals } from '../globals';

const BACKEND_URL = environment.apiUrl + 'ingredients';

@Injectable({ providedIn: 'root' })
export class IngredientsService {
  public ingredient: Ingredient;
  public ingredientsList: any = [];
  public ingredientsUpdated = new Subject<Ingredient[]>();
  public ingredientsDoc;
  public mode = 'edit';
  constructor(
    private http: HttpClient,
    private router: Router,
    public globals: Globals
  ) {}

  geIngredientsUpdateListener() {
    return this.ingredientsUpdated.asObservable();
  }

  // ingredients list - ALL
  getIngredients() {
    const customer = this.globals.getCustomer();
    this.http
      .get<{ ingredients: any[] }>(BACKEND_URL + '/' + customer.id)
      .subscribe(transformedPosts => {
        // prevent too many round trips to the server
        this.saveLocalIngredientsData(transformedPosts);
        this.ingredientsDoc = transformedPosts;
        this.ingredientsUpdated.next([...this.ingredientsDoc.ingredients]);
      });
  }

  createIngredient(name: string) {
    const customer = this.globals.getCustomer();
    this.ingredientsDoc = this.loadLocalIngredientsData();
    const obj: Ingredient = {
      name: name,
      price: '',
      unit_amount: '',
      purchase_amount: '',
      unit_type: '',
      supplier: '',
      category: '',
      sub_category: ''
    };
    this.ingredientsDoc.ingredients.push(obj);
    console.log(obj);
    console.log(this.ingredientsDoc);
    this.updateIngredient(obj, this.ingredientsDoc);
  }

  // update ingredients doc [ add ,edit, delete ]
  // this document is never deleted only the contents of it get changed
  updateIngredient(ingredient, ingredientsDoc) {
    const customer = this.globals.getCustomer();
    this.http
      .put<{ message: string }>(BACKEND_URL + '/' + customer.id, ingredientsDoc)
      .subscribe(returnedData => {
        console.log('update status: ' + returnedData.message);
        if (this.mode === 'edit') {
          this.saveLocalIngredientData(ingredient);
        }
        this.saveLocalIngredientsData(ingredientsDoc);
        this.ingredientsUpdated.next([this.ingredientsList]); // inform UI
        this.router.navigate(['/ingredients/list/']);
      });
  }

  saveLocalIngredientsData(ingredients: any) {
    localStorage.setItem('ingredients', JSON.stringify(ingredients));
  }

  // so we can access a selected ingredient without going to the server again
  saveLocalIngredientData(ingredient: Ingredient) {
    localStorage.setItem('ingredient', JSON.stringify(ingredient));
  }

  loadLocalIngredientData() {
    return JSON.parse(localStorage.getItem('ingredient'));
  }

  loadLocalIngredientsData() {
    return JSON.parse(localStorage.getItem('ingredients'));
  }

  refreshingredientsList() {
    const localIngredients = this.loadLocalIngredientsData();
    this.ingredientsUpdated.next([...localIngredients.ingredients]);
  }
  // lets do search
  // search for an ingredient by name
  searchIngredientByName(searchTerm) {
    this.ingredientsList = this.loadLocalIngredientsData();
    const searchResults = this.ingredientsList.ingredients.filter(p =>
      p.name.includes(searchTerm)
    );
    this.ingredientsUpdated.next([...searchResults]);
  }

  searchIngredientByCategory(searchTerm) {
    this.ingredientsList = this.loadLocalIngredientsData();
    const searchResults = this.ingredientsList.ingredients.filter(item =>
      item.category.includes(searchTerm)
    );
    console.log(searchTerm);
    console.log(searchResults);
    this.ingredientsUpdated.next([...searchResults]);
  }
}
