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
  public ingredientImportDataUpdated = new Subject<Ingredient[]>();
  public ingredientsDoc;
  public cleanArr = [];
  public arrOfArr = [];
  public mode = 'edit';
  constructor(private http: HttpClient, private router: Router, public globals: Globals) {}

  getIngredientsUpdateListener() {
    return this.ingredientsUpdated.asObservable();
  }

  getIngredientsImportDataUpdateListener() {
    return this.ingredientImportDataUpdated.asObservable();
  }
  // ingredients list - ALL
  getIngredients() {
    const customer = this.globals.getCustomer();
    this.http.get<{ ingredients: any[] }>(BACKEND_URL + '/' + customer.id).subscribe(transformedPosts => {
      // prevent too many round trips to the server
      this.saveLocalIngredientsData(transformedPosts);
      this.ingredientsDoc = transformedPosts;
      console.log(this.ingredientsDoc);
      this.ingredientsUpdated.next([...this.ingredientsDoc.ingredients]);
    });
  }

  createIngredient(ingredient_name: string) {
    const customer = this.globals.getCustomer();
    this.ingredientsDoc = this.loadLocalIngredientsData();
    const obj: Ingredient = {
      ingredient_name: ingredient_name,
      ingredient_price: '',
      unit_amount: '',
      purchase_amount: '',
      unit_type: '',
      supplier: '',
      category: '',
      sub_category: ''
    };
    this.ingredientsDoc.ingredients.push(obj);
    this.updateIngredient(obj, this.ingredientsDoc);
  }

  importIngredients(ingredientsDoc) {
    const customer = this.globals.getCustomer();
    this.http.put<{ message: string }>(BACKEND_URL + '/' + customer.id, ingredientsDoc).subscribe(returnedData => {
      console.log('update status: ' + returnedData.message);
      this.saveLocalIngredientsData(ingredientsDoc);
      this.ingredientsUpdated.next([this.ingredientsList]); // inform UI
      this.router.navigate(['/ingredients/list/']);
    });
  }

  // update ingredients doc [ add ,edit, delete ]
  // this document is never deleted only the contents of it get changed
  updateIngredient(ingredient, ingredientsDoc) {
    const customer = this.globals.getCustomer();
    this.http.put<{ message: string }>(BACKEND_URL + '/' + customer.id, ingredientsDoc).subscribe(returnedData => {
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

  // search for an ingredient by name
  searchIngredientByName(searchTerm) {
    const ingredientsList = this.loadLocalIngredientsData();
    const searchResults = ingredientsList.ingredients.filter(item =>
      item.ingredient_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(searchResults);
    this.ingredientsUpdated.next(searchResults);
  }

  // search by category
  searchIngredientByCategory(searchTerm) {
    this.ingredientsList = this.loadLocalIngredientsData();
    const searchResults = this.ingredientsList.ingredients.filter(item => item.category.includes(searchTerm));

    this.ingredientsUpdated.next([...searchResults]);
  }

  // search by supplier
  searchIngredientBySupplier(searchTerm) {
    this.ingredientsList = this.loadLocalIngredientsData();
    const searchResults = this.ingredientsList.ingredients.filter(item => item.supplier.includes(searchTerm));

    this.ingredientsUpdated.next([...searchResults]);
  }

  uploadFile(file: File) {
    const customer = this.globals.getCustomer();
    const formData = new FormData();
    // params (label that maps to the backend storage label, the file of type file, and the filename)
    formData.append('file', file, file.name);

    this.http
      .post<{ message: string; data: any }>(BACKEND_URL + '/' + customer.id + '/import', formData)
      .subscribe(returnedData => {
        // console.log('upload status: ' + returnedData.message);
        const data = returnedData.data;
        // number of columns
        let colCount = Object.entries(data[0]).length;

        // build columns
        for (let i = 0; i < colCount; i++) {
          this.arrOfArr.push([]);
        }

        data.forEach(item => {
          const row = Object.entries(item);
          for (let i = 0; i < colCount; i++) {
            this.arrOfArr[i].push(row[i][1]);
          }
        });
        // turn each array [csv column] into a string
        // edge case empty array  = empty column data
        // console.log(this.arrOfArr);
        this.arrOfArr.forEach((item, index) => {
          if (this.arrOfArr[index].join('').length === 0) {
            this.arrOfArr.splice(index, 1);
          }
        });

        colCount = this.arrOfArr.length;
        // console.log('column count after deleting empty colums: ' + colCount);
        // console.log(this.arrOfArr);

        // now look for blank rows
        const rowCount = this.arrOfArr[0].length;
        const tmpArr = [];
        // loop over rows and cols
        for (let col = 0; col < colCount; col++) {
          // tmpArr.push([]);
          for (let row = 0; row < rowCount; row++) {
            // look at cell
            if (this.arrOfArr[col][row] === '') {
              tmpArr.push(row);
            }
          }
          // array contains list of indexes
          // console.log(tmpArr);
        }

        //  map out all blank cells to an object
        //  push each blank cell's index into storage object

        const countedItems = this.countItemFrequnecy(tmpArr);

        // { rowIndex: occurences }
        // console.log(countedItems);

        // copy orignal array of arrays
        this.cleanArr = [...this.arrOfArr];
        console.log('cleanArr: ' + this.cleanArr.length);
        // check if we need to remove blank row
        const itemEntries = Object.entries(countedItems);
        itemEntries.forEach(item => {
          if (item[1] === colCount) {
            for (let i = 0; i < this.arrOfArr.length; i++) {
              this.cleanArr[i] = this.cleanArr[i].filter(Boolean);
            }
          }
        });
        this.ingredientImportDataUpdated.next([...this.cleanArr]);
        this.arrOfArr = [];
        this.cleanArr = [];
      });
  }

  countItemFrequnecy(arr) {
    const countedItems = arr.reduce(function(allItems, name) {
      if (name in allItems) {
        allItems[name]++;
      } else {
        allItems[name] = 1;
      }
      return allItems;
    }, {});
    return countedItems;
  }
}
