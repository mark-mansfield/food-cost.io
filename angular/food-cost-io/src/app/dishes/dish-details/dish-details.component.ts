import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NumpadDialogComponent } from '../../dialogs/numpad-dialog/numpad-dialog.component';
import { DishService } from '../dish.service';
import { GlobalService } from '../../global.service';
import { Dish } from '../dish.model';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.css']
})
export class DishDetailsComponent implements OnInit, OnDestroy {
  isLoading = false;
  showEditForm = false;
  showDetails = false;
  showEditTools = false;
  showConfirmControls = false;

  public dish: Dish;
  public dishSub: Subscription;
  public selectedId: string;
  ingredients = [];
  name: string;
  description: string;
  ingredientTotal: number;
  method: string;
  plating: string;
  cost: string;
  retail_price: string;
  margin: string;

  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 2
  });

  myForm: FormGroup;
  dish_name = '';
  iconBadgeText = '';
  editModeButtonText = 'edit';
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private service: DishService,
    private globalService: GlobalService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('_id')) {
        this.selectedId = paramMap.get('_id');
        this.dish = this.service.getDish();
        this.setDishObjectData(this.dish);
        this.iconBadgeText = this.globalService.getIconBadgeText(this.dish.name);
        this.myForm = this.fb.group({
          dishName: [this.dish.name, [Validators.required]],
          agree: [false, [Validators.requiredTrue]]
        });

        this.isLoading = false;
      } else {
        console.log('no id sent');
      }
    });
  }

  get dishName() {
    return this.myForm.get('dishName');
  }

  toggleDetails() {
    this.showDetails ? (this.showDetails = false) : (this.showDetails = true);
  }

  toggleEditMode() {
    if (this.showEditTools) {
      this.showEditTools = false;
      this.showConfirmControls = false;
      this.editModeButtonText = 'edit';
    } else {
      this.showEditTools = true;
      this.editModeButtonText = 'cancel';
    }
    this.toggleEditForm();
  }

  toggleEditForm() {
    this.showEditForm ? (this.showEditForm = false) : (this.showEditForm = true);
  }

  launchNumberPad() {
    const dialogRef = this.dialog.open(NumpadDialogComponent, {
      width: '548px',
      height: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.dish.retail_price = result;
        this.service.updateDish(this.dish, null);
      }
    });
  }

  onLaunchNumberPad() {
    this.launchNumberPad();
  }

  // {customerId: "5bbac8e83913a6394d42d8b2", _id: "5bd38dcbaa4adf145e2f86b1", name: "Burrito",…}
  // convenience object
  setDishObjectData(dish) {
    this.name = dish.name;
    this.dish.ingredients ? (this.ingredients = this.dish.ingredients) : (this.ingredientTotal = 0);
    this.ingredientTotal = this.dish.ingredients.length;
    this.description = this.dish.description;
    this.method = this.dish.recipe_method;
    this.plating = this.dish.plating_guide;
    this.retail_price = this.dish.retail_price;
    this.cost = this.getIngredientsTotal().toFixed(2);
    this.margin = this.getMargin(this.cost, this.retail_price);
    // // console.log(this.dish);
  }

  onUpdateDishName(dishId) {
    console.log(dishId);
  }

  onCloneDish(dish) {
    this.service.cloneDish(dish);
  }

  getMargin(cost, retail) {
    const tax = 10;
    const markup = 100;
    const margin = (cost / retail) * (tax + markup);
    console.log(margin);
    return margin.toFixed(2);
  }

  // searches an array of objects
  // {  name: "green kale", retail_price: "2.50", unit_amount: "3", unit_type: "bunch", supplier: "xyz", …}
  getIngredientsTotal() {
    const customerIngredients = this.service.loadLocalIngredientsData();
    const ingredientList = customerIngredients.ingredients;
    // console.log(ingredientList);
    let total = 0.0;
    this.ingredients.forEach((dishIngredient, index) => {
      const searchVar = 'sunflower kernels kg';
      const item = ingredientList.find(function(obj) {
        return dishIngredient.name === obj.ingredient_name;
      });
      total += parseFloat(this.getActualCost(dishIngredient, item));
    });
    return total;
  }

  // get actual cost after wastage of an ingredient
  // ingredient object looks like this
  // {name: "sea salt", qty: "0", AP_weight: "0", EP_weight: "0"}
  getActualCost(dishIngredient, item) {
    const itemYield = (parseFloat(dishIngredient.EP_weight) / parseFloat(dishIngredient.AP_weight)) * 100;
    const factor = 100 / itemYield;
    const unitCost = item.ingredient_price / item.purchase_amount;
    const itemCost = unitCost * dishIngredient.qty;
    const realCost = factor * itemCost;
    return realCost.toFixed(2);
  }

  onDelete(id, index, pageCount) {
    this.isLoading = true;
    this.service.deleteDish(id);
    // this.service.paginate(index, pageCount);
  }

  ngOnDestroy() {
    // this.dishSub.unsubscribe();
  }
}
